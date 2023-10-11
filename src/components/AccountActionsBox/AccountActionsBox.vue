<template>
    <nav class="account-actions-box actions-box" aria-label="Wallet actions">
        <ul class="no-markers">
            <!-- <li>
                <router-link :to="{ name: 'account-history' }" class="action" title="Home" aria-label="Wallet info">
                    <span class="btn large same-size round">
                        <icon data="@/assets/svg/wallet.svg" width="20" height="20" :fill="false" aria-hidden="true" />
                    </span>
                    <span class="link-label">Wallet</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'account-blockchain-picker-form' }" class="action" title="Send"
                    aria-label="Send NEC">
                    <span class="btn large same-size round">
                        <icon data="@/assets/svg/send.svg" width="20" height="20" aria-hidden="true" />
                    </span>
                    <span class="link-label">Send</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'account-receive' }" class="action" title="Receive" aria-label="Receive NEC">
                    <span class="btn large same-size round">
                        <icon data="@/assets/svg/receive.svg" width="20" height="20" aria-hidden="true" />
                    </span>
                    <span class="link-label">Receive</span>
                </router-link>
            </li> -->
            <!--
            <li>
                <router-link :to="{ name: 'account-stake' }" class="action" title="Stake">
                    <span class="btn large same-size round">
                        <icon data="@/assets/svg/stake.svg" width="20" height="20" aria-hidden="true" />
                    </span>
                    <span class="link-label">Staking</span>
                </router-link>
            </li>
            -->
        </ul>
        <div class="row wallet-msg no-markers">
            <div class="col-lg-6">
                <div class="row wallet-b">
                    <div class="col-lg-2">
                        <router-link :to="{ name: 'account-history' }" class="wallet" title="Home" aria-label="Wallet info">
                            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="65" viewBox="0 0 72 65" fill="none" style="margin-top:20px;">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M56.3172 20.0044H71.3611C71.3611 7.92547 64.1236 0.869141 51.8609 0.869141H19.7502C7.48753 0.869141 0.25 7.92547 0.25 19.8504V45.8879C0.25 57.8128 7.48753 64.8691 19.7502 64.8691H51.8609C64.1236 64.8691 71.3611 57.8128 71.3611 45.8879V44.7786H56.3172C49.3352 44.7786 43.6752 39.2603 43.6752 32.4532C43.6752 25.646 49.3352 20.1277 56.3172 20.1277V20.0044ZM56.3181 25.3049H68.7072C70.1734 25.3049 71.362 26.4637 71.362 27.8933V36.8908C71.345 38.3134 70.1663 39.4626 68.7072 39.4792H56.6025C53.0679 39.5256 49.9771 37.1661 49.1754 33.8095C48.7739 31.7258 49.3375 29.5757 50.7152 27.9353C52.0929 26.295 54.1437 25.3321 56.3181 25.3049ZM56.8552 34.765H58.0246C59.5257 34.765 60.7426 33.5785 60.7426 32.115C60.7426 30.6515 59.5257 29.465 58.0246 29.465H56.8552C56.1372 29.4568 55.4458 29.7291 54.9351 30.2212C54.4245 30.7133 54.1371 31.3842 54.1372 32.0842C54.1371 33.5528 55.349 34.7481 56.8552 34.765ZM17.0949 20.0042H37.164C38.6651 20.0042 39.882 18.8177 39.882 17.3542C39.882 15.8906 38.6651 14.7042 37.164 14.7042H17.0949C15.606 14.7041 14.3942 15.8719 14.3768 17.3234C14.3767 18.792 15.5886 19.9873 17.0949 20.0042Z"
                                    fill="#31BC3C"></path>
                            </svg>
                            <h3 style="margin-top:20px;">Wallet</h3>
                        </router-link>
                    </div>
                    <div class="col-lg-2">
                        <a @click="$refs.SendPopup.show()" class="send-cvr" title="Send"
                            aria-label="Send NEC" style="cursor:pointer">
                            <div class="send-img">
                                <img src="img/Send.svg" alt="">
                            </div>
                            <h3>Send</h3>
                        </a>
                    </div>
                    <div class="col-lg-2">
                        <a  @click="$refs.ReceivePopup.show()" class="receive-cvr" title="Receive"
                            aria-label="Receive NEC" style="cursor:pointer">
                            <div class="receive-img">
                                <img src="img/Send.svg" alt="">
                            </div>
                            <h3 style="margin-top:20px">Receive</h3>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="nec-status wallet_cover">
                    <div class="available-cvr col-lg-2">
                        <h5>Available</h5>
                        <p class="net-balance" style="display:flex"> <n-e-c-token-value :value="accountBalance" convert no-currency /><span class="">NEC</span></p>
                        <span class="available-value"><n-e-c-token-value :value="WEIToNEC(accountBalance) * tokenPrice"
                                with-price-currency no-currency /></span>
                    </div>
                    <div class="total-cvr col-lg-2"> 
                        <h5>Total</h5>
                        <div class="total-val">
                            <p class="net-balance" style="display:flex"><n-e-c-token-value :value="accountTotalBalance" convert no-currency /><span
                                    class="">NEC</span></p>
                            <span class="total-value"><n-e-c-token-value :value="WEIToNEC(accountTotalBalance) * tokenPrice"
                                    with-price-currency no-currency /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="wallet-transactions">
            <div class="transaction-title">
                <h5>Transactions (0)</h5>
                <p>Assets (0)</p>
            </div>
            <div class="wallet-table">
                <table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Time</th>
                            <th class="text-center">Address</th>
                            <th class="text-center">Amount (NEC)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="4">
                                <p class=" no-itm">No items</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div> -->
        <send-popup ref="SendPopup" @window-hide="onWindowHide" />
        <receive-popup ref="ReceivePopup" @window-hide="onWindowHide" />
    </nav>
</template>

<script>
import ReceivePopup from '../AccountActionsBox/ReceivePopup.vue';
import SendPopup from '../AccountActionsBox/SendPopup.vue';
import FCard from '../core/FCard/FCard.vue';
import AccountActionsBox from '../AccountActionsBox/AccountActionsBox.vue';
import { mapGetters } from 'vuex';
import { WEIToNEC } from '../../utils/transactions.js';
import { pollingMixin } from '../../mixins/polling.js';
import { UPDATE_ACCOUNT_BALANCE } from '../../store/actions.type.js';
import NECTokenValue from '@/components/core/NECTokenValue/NECTokenValue.vue';

export default {
    components: { NECTokenValue, FCard, AccountActionsBox,SendPopup,ReceivePopup },

    mixins: [pollingMixin],

    computed: {
        ...mapGetters(['currentAccount', 'currentAccountAddress']),

        accountBalance() {
            return this.currentAccount ? this.currentAccount.balance : 0;
        },

        accountTotalBalance() {
            return this.currentAccount ? this.currentAccount.totalBalance : 0;
        },

        tokenPrice() {
            return this.$store.state.tokenPrice;
        },
    },

    mounted() {
        this._polling.start(
            'update-account-balance',
            () => {
                this.$store.dispatch(UPDATE_ACCOUNT_BALANCE);
            },
            5000
        );
    },

    methods: {
        WEIToNEC,
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
