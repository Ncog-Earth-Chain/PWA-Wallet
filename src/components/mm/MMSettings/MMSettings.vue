<template>
    <div class="mmsettings">
        <center><f-card class="f-card-double-padding w-95">
            <div class="small-container">
                <template v-if="isMMInstalled">
                    <div class="mmsettings_section">
                        <h3>Networks</h3>
                        <div class="row">
                            <div class="col-sm">
                                <button id="add_mainnet_btn" class="set rounded-pill"
                                    :disabled="addNcogearthchainMainnetInProgress" @click="onAddChainClick('mainnet')">
                                    Add NCOGEarthChain NCOGEarthChain Mainnet
                                    <pulse-loader v-if="addNcogearthchainMainnetInProgress" color="#fff"></pulse-loader>
                                </button>
                            </div>
                            <div class="col-sm">
                                <button id="add_testnet_btn" class=" unset rounded-pill testnet-button"
                                    :disabled="addNcogearthchainTestnetInProgress" @click="onAddChainClick('testnet')">
                                    Add NCOGEarthChain Testnet
                                    <pulse-loader v-if="addNcogearthchainTestnetInProgress" color="#1969ff"></pulse-loader>
                                </button>
                            </div>

                        </div>


                    </div>

                    <div class="mmsettings_section">
                        <h3>Assets</h3>
                        <button id="add_token_btn" class="set" :disabled="addTokenInProgress"
                            @click="onAddTokenClick">
                            Add Token <pulse-loader v-if="addTokenInProgress" color="#fff"></pulse-loader>
                        </button>
                        <button id="add_custom_token_btn" class="unset" :disabled="addCustomTokenInProgress"
                            @click="onAddCustomTokenClick">
                            Add Custom Token <pulse-loader v-if="addCustomTokenInProgress" color="#fff"></pulse-loader>
                        </button>
                    </div>

                    <f-window ref="popover" popover :attach-to="`#${btnId}`" attach-position="auto"
                        preferred-attach-position="top" :attach-margin="[4, 4, 4, 4]" :with-header="false"
                        :hide-after="3800" animation-in="scale-center-enter-active"
                        animation-out="scale-center-leave-active" style="width: auto; max-width: 360px;">
                        <slot name="popover-text">
                            {{ popoverText }}
                        </slot>
                    </f-window>

                    <defi-token-picker-window ref="tokenPicker" :tokens="defiTokens" hide-balance
                        @window-hide="stopLoadingIndicators" @defi-token-picked="onDefiTokenPicked" />

                    <m-m-custom-token-window ref="customTokenWindow" @window-hide="stopLoadingIndicators"
                        @custom-token-form-data="onCustomTokenFormData" />
                </template>
                <template v-else>
                    <button class="set" :disabled="installMMInProgress" @click="onInstallMMClick">
                        Install Metamask <pulse-loader v-if="installMMInProgress" color="#fff"></pulse-loader>
                    </button>
                </template>
            </div>
        </f-card>
    </center>
    </div>
</template>

<script>
import FCard from '@/components/core/FCard/FCard.vue';
import { NCOGEARTHCHAIN_MAINNET, NCOGEARTHCHAIN_TESTNET } from '@/plugins/mm/mm.js';
import FWindow from '@/components/core/FWindow/FWindow.vue';
import { mapGetters } from 'vuex';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import DefiTokenPickerWindow from '@/components/windows/DefiTokenPickerWindow/DefiTokenPickerWindow.vue';
import MetaMaskOnboarding from '@metamask/onboarding';
import MMCustomTokenWindow from '@/components/mm/MMCustomTokenWindow/MMCustomTokenWindow.vue';

export default {
    name: 'MMSettings',

    components: { MMCustomTokenWindow, DefiTokenPickerWindow, FWindow, FCard, PulseLoader },

    data() {
        return {
            isMMInstalled: false,
            popoverText: '',
            btnId: '',
            addNcogearthchainMainnetInProgress: false,
            addNcogearthchainTestnetInProgress: false,
            addTokenInProgress: false,
            addCustomTokenInProgress: false,
            installMMInProgress: false,
            defiTokens: [],
            requestPendingMessage: 'Request already pending',
        };
    },

    computed: {
        ...mapGetters(['currentAccount']),
    },

    created() {
        this._intervalId = -1;
        /** @type {MetaMaskOnboarding} */
        this._onboarding = null;

        this.setInterval();
    },

    beforeDestroy() {
        this.clearInterval();
        this._onboarding = null;
    },

    methods: {
        showPopover(_text, _btnId) {
            const ePopover = this.$refs.popover;

            if (ePopover) {
                this.popoverText = _text;
                this.btnId = _btnId;
                ePopover.show();
            }
        },

        stopLoadingIndicators() {
            this.addNcogearthchainMainnetInProgress = false;
            this.addNcogearthchainTestnetInProgress = false;
            this.addTokenInProgress = false;
            this.addCustomTokenInProgress = false;
            this.installMMInProgress = false;
        },

        setInterval(_interval = 30) {
            this.clearInterval();

            this._intervalId = setInterval(() => {
                if (this.$mm._initialized) {
                    this.isMMInstalled = this.$mm.isInstalled();
                    this.clearInterval();
                }
            }, _interval);
        },

        clearInterval() {
            if (this._intervalId > -1) {
                clearInterval(this._intervalId);
                this._intervalId = -1;
            }
        },

        /**
         * @param {('mainnet' | 'testnet')} _type
         * @return {Promise<void>}
         */
        async onAddChainClick(_type = 'mainnet') {
            const mainnet = _type === 'mainnet';
            const chain = mainnet ? NCOGEARTHCHAIN_MAINNET : NCOGEARTHCHAIN_TESTNET;
            const btnId = mainnet ? 'add_mainnet_btn' : 'add_testnet_btn';

            if (mainnet) {
                this.addNcogearthchainMainnetInProgress = true;
            } else {
                this.addNcogearthchainTestnetInProgress = true;
            }

            try {
                const response = await this.$mm.addEthereumChain(chain);

                if (response === null) {
                    this.showPopover(`${chain.chainName} was added to Metamask`, btnId);
                }

                this.stopLoadingIndicators();
            } catch (_error) {
                if (_error.code !== -32002) {
                    this.stopLoadingIndicators();
                } else {
                    this.showPopover(this.requestPendingMessage, btnId);
                }

                console.error(_error);
            }
        },

        async onAddTokenClick() {
            const accountAddress = this.currentAccount ? this.currentAccount.address : '';

            this.defiTokens =
                this.defiTokens.length > 0 ? this.defiTokens : await this.$defi.fetchTokens(accountAddress);
            this.addTokenInProgress = true;
            this.$refs.tokenPicker.show();
        },

        onAddCustomTokenClick() {
            this.addCustomTokenInProgress = true;
            this.$refs.customTokenWindow.show();
        },

        async onDefiTokenPicked(_token, _btnId) {
            const btnId = _btnId || 'add_token_btn';

            try {
                const response = await this.$mm.watchAsset({
                    type: 'ERC20',
                    options: {
                        address: _token.address,
                        symbol: _token.symbol,
                        decimals: _token.decimals,
                        image: _token.logoUrl,
                    },
                });

                if (response) {
                    this.showPopover(`Asset ${_token.symbol} was added to Metamask`, btnId);
                }

                this.stopLoadingIndicators();
            } catch (_error) {
                if (_error.code !== -32002) {
                    this.stopLoadingIndicators();
                } else {
                    this.showPopover(this.requestPendingMessage, btnId);
                }
                console.error(_error);
            }
        },

        onCustomTokenFormData(_data) {
            this.onDefiTokenPicked(_data, 'add_custom_token_btn');
        },

        onInstallMMClick() {
            this.installMMInProgress = true;
            this._onboarding = new MetaMaskOnboarding();
            this._onboarding.startOnboarding();
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
