<template>
    <div class="transaction-confirmation">
        <tx-confirmation
            :tx="tx"
            confirmation-comp-name="transaction-confirmation"
            send-button-label="Send"
            password-label="Please enter your wallet password to send the transaction"
            :on-send-transaction-success="onSendTransactionSuccess"
            card-off
            :show-cancel-button="true"
            :window-mode="true"
            class="min-h-100"
            @cancel-button-click="$emit('cancel-button-click', $event)"
        >
            <h2 class="not-visible" data-focus>
                <span v-if="token.address"> Send {{ tokenSymbol }} </span>
                <span v-else>Send NCOGEarthChain NEC</span>
            </h2>

            <div class="transaction-info">
                <div class="row no-collapse">
                    <div class="col-3 f-row-label">Send To</div>
                    <div class="col break-word">
                        {{ sendToAddress }}
                        <span
                            v-show="sendToAddressBalance || sendToAccountName"
                            class="f-row-label"
                            style="display: inline-block;"
                        >
                            (
                            <template v-if="token.address">
                                <f-token-value :value="sendToAddressBalance" :token="token" />
                            </template>
                            <template v-else-if="sendToAddressBalance"> {{ sendToAddressBalance }} NEC </template>
                            <template v-if="sendToAccountName">, {{ sendToAccountName }} </template> )
                        </span>
                    </div>
                </div>

                <div class="row no-collapse">
                    <div class="col-3 f-row-label">Send From</div>
                    <div class="col break-word">
                        {{ currentAccount.address }}
                        <span class="f-row-label" style="display: inline-block;">
                            <template v-if="token.address">
                                ( <f-token-value :value="maxRemainingErc20TokenBalance" :token="token" />
                            </template>
                            <template v-else>
                                ( <n-e-c-token-value :value="currentAccount.balance" convert />
                            </template>
                            <template v-if="currentAccount.name">, {{ currentAccount.name }}</template> )
                        </span>
                    </div>
                </div>

                <div class="row no-collapse">
                    <div class="col-3 f-row-label">Amount</div>
                    <div class="col">{{ txData.amount }}</div>
                </div>

                <div class="row no-collapse">
                    <div class="col-3 f-row-label">Memo</div>
                    <div class="col">{{ txData.memo }}</div>
                </div>

                <template v-if="sendDirection !== 'NcogearthchainToNcogearthchain'">
                    <f-message type="warning" class="align-center">
                        All bridge transactions incur a fee of {{ minNECToTransfer }} NEC, deducted from the transfer
                        amount.
                    </f-message>
                    <f-message type="info" class="big">
                        You will receive <b>{{ txData.amount - minNECToTransfer }} NEC</b>
                    </f-message>
                    <br />
                </template>

                <!--
                <div class="row no-collapse">
                    <div class="col-3 f-row-label">Fee</div>
                    <div class="col">{{ txData.fee }}</div>
                </div>
                -->
            </div>

            <template #window-content>
                <ol class="f-data-layout">
                    <li>
                        <div class="row no-collapse">
                            <div class="col-3 f-row-label">Send To</div>
                            <div class="col break-word">
                                {{ txData.ncogearthchain_address }}
                                <span v-show="sendToAddressBalance" class="f-row-label">
                                    <template v-if="sendToAddressBalance">
                                        ( {{ toNEC(sendToAddressBalance.balance) }} NEC )
                                    </template>
                                </span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="row no-collapse">
                            <div class="col-3 f-row-label">Send From</div>
                            <div class="col break-word">
                                {{ currentAccount.address }}
                                <span class="f-row-label">
                                    <template v-if="currentAccount.name"><br /></template>
                                    ( {{ toNEC(currentAccount.balance) }} NEC
                                    <template v-if="currentAccount.name">, {{ currentAccount.name }}</template> )
                                </span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="row no-collapse">
                            <div class="col-3 f-row-label">Amount</div>
                            <div class="col">{{ txData.amount }}</div>
                        </div>
                    </li>
                    <li>
                        <div class="row no-collapse">
                            <div class="col-3 f-row-label">Max Fee</div>
                            <div class="col">{{ txFee }}</div>
                        </div>
                    </li>
                </ol>
                <f-message v-if="sendDirection === 'NcogearthchainToEthereum'" type="warning" class="align-center">
                    All bridge transactions incur a fee of {{ minNECToTransfer }} NEC, deducted from the transfer
                    amount.
                    <br />
                    You will receive {{ txData.amount - minNECToTransfer }} NEC
                    <br />
                </f-message>
            </template>
        </tx-confirmation>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { focusElem } from '../../utils/aria.js';
import { Web3 } from '../../plugins/ncogearthchain-web3-wallet.js';
import { toNEC } from '../../utils/transactions.js';
import { formatNumberByLocale } from '../../filters.js';
import TxConfirmation from '../TxConfirmation/TxConfirmation.vue';
import erc20Utils from 'ncogearthchain-ledgerjs/src/erc20-utils.js';
import FTokenValue from '@/components/core/FTokenValue/FTokenValue.vue';
import FMessage from '@/components/core/FMessage/FMessage.vue';
import appConfig from '../../../app.config.js';
import NECTokenValue from '@/components/core/NECTokenValue/NECTokenValue.vue';

export default {
    components: { NECTokenValue, FMessage, FTokenValue, TxConfirmation },

    props: {
        // transaction data from SendTransactionForm
        txData: {
            type: Object,
            default() {
                return {};
            },
        },
        /** @type {DefiToken} */
        token: {
            type: Object,
            default() {
                return {};
            },
        },
        sendDirection: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            sendToAddress: '',
            dTxData: this.txData,
            tx: {},
            minNECToTransfer: appConfig.bnbridgeApi.minNECToTransfer,
        };
    },

    computed: {
        ...mapGetters(['currentAccount', 'getAccountByAddress', 'txFee']),

        /**
         * @return {string}
         */
        tokenSymbol() {
            const { token } = this;

            return token.address ? this.$defi.getTokenSymbol(token) : 'NEC';
        },

        /**
         * @return {number}
         */
        maxRemainingErc20TokenBalance() {
            const { token } = this;

            return this.$defi.fromTokenValue(token.balanceOf || token.availableBalance, token) || 0;
        },

        sendToAccountName() {
            const account = this.sendToAddress ? this.getAccountByAddress(this.sendToAddress) : null;

            return account ? account.name : '';
        },
    },

    asyncComputed: {
        async sendToAddressBalance() {
            const { sendDirection } = this;
            let balance = 0;
            let data;

            if (this.token.address) {
                data = await this.$defi.fetchERC20TokenAvailableBalance(this.sendToAddress, this.token.address);

                if (data) {
                    balance = this.$defi.fromTokenValue(data, this.token);
                }
            } else if (sendDirection === 'NcogearthchainToNcogearthchain') {
                console.log('225 transactionConfirmation.vue');
                data = await this.$fWallet.getBalance(this.txData.ncogearthchain_address);
                balance = this.toNEC(data.balance);
            } else if (sendDirection === 'NcogearthchainToBinance') {
                data = await this.$bnb.getBNBBalances(this.txData.bnb_address);
                balance = `BNB address: ${this.txData.bnb_address}, ${formatNumberByLocale(data.balance)}`;
            } else if (sendDirection === 'NcogearthchainToEthereum') {
                data = await this.$bnb.getETHBalance(this.txData.eth_address);
                balance = `ETH address: ${this.txData.eth_address}, ${formatNumberByLocale(data)}`;
            }

            return balance;
        },
    },

    created() {
        /** Data for token swap. */
        this._swapTokenData = null;
    },

    mounted() {
        this.dTxData = this.txData;
        this.setSendToAddress();

        focusElem(this.$el);
        // this.setSendToAddress();
    },

    methods: {
        async setSendToAddress() {
            const { sendDirection } = this;
            let data;
            let stData = null;

            if (sendDirection === 'NcogearthchainToNcogearthchain') {
                this.sendToAddress = this.txData.ncogearthchain_address;
            } else if (sendDirection === 'NcogearthchainToBinance') {
                stData = {
                    direction: sendDirection,
                    bnbAddress: this.txData.bnb_address,
                };
            } else if (sendDirection === 'NcogearthchainToEthereum') {
                stData = {
                    direction: sendDirection,
                    ethAddress: this.txData.eth_address,
                };
            }

            if (stData) {
                data = await this.$bnb.swapToken(stData);

                this._swapTokenData = {
                    from_ncogearthchain_address: this.currentAccount.address,
                    ...this.txData,
                    ...data,
                };
                this.sendToAddress = data.ncogearthchain_address;
                this.dTxData.ncogearthchain_address = data.ncogearthchain_address;

                // console.log('_swapTokenData', this._swapTokenData);
            }

            this.setTx();
        },

        async setTx() {
            const from = this.currentAccount ? this.currentAccount.address : '';
            const { dTxData } = this;
            const fWallet = this.$fWallet;
            const { token } = this;

            if (!dTxData.ncogearthchain_address) {
                return;
            }

            if (token.address) {
                this.tx = await fWallet.getDefiTransactionToSign(
                    erc20Utils.erc20TransferTx(
                        token.address,
                        fWallet.toChecksumAddress(dTxData.ncogearthchain_address),
                        parseFloat(dTxData.amount) >= this.maxRemainingErc20TokenBalance
                            ? token.balanceOf || token.availableBalance
                            : Web3.utils.toHex(this.$defi.toTokenValue(dTxData.amount, token))
                    ),
                    this.currentAccount.address
                );
            } else {
                this.tx = await fWallet.getTransactionToSign({
                    value: Web3.utils.toHex(Web3.utils.toWei(dTxData.amount)),
                    from,
                    to: fWallet.toChecksumAddress(dTxData.ncogearthchain_address),
                    memo: dTxData.memo,
                });
            }
        },

        onSendTransactionSuccess(_data) {
            if (this._swapTokenData) {
                this.$emit('change-component', {
                    to: 'transaction-completing',
                    from: 'transaction-confirmation',
                    data: {
                        tx: _data.data.sendTransaction.hash,
                        ...this._swapTokenData,
                        cardOff: true,
                        windowMode: true,
                    },
                });
            } else {
                this.$emit('change-component', {
                    to: 'transaction-success-message',
                    from: 'transaction-confirmation',
                    data: {
                        tx: _data.data.sendTransaction.hash,
                        continueTo: 'hide-window',
                        continueButtonLabel: 'Close',
                        cardOff: true,
                        windowMode: true,
                    },
                });
            }
        },

        toNEC,
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
