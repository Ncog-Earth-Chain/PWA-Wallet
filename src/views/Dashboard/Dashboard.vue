<template>
    <div class="view-dashboard" @click="onAccountListClick"
        @keyup="onAccountListKeyup">
        <!-- <dashboard-header /> -->

        <main>
            <!-- <section :aria-labelledby="walletsId">
                <h2 :id="walletsId" class="h1">
                    Wallets <span class="f-records-count">({{ accounts.length }})</span>
                </h2>
                <account-list edit-mode />
            </section> -->

        
        
        </main>
        <h2 style="color:#fff;font-size: 35px;">Home</h2>
        <div class="row">
            <div class="col-lg-8">
                <div class="row">
                    <div class="col-lg-4">
                        <a class="contect-wall" @click="onConnectWalletClick" style="cursor:pointer">
                            <img src="img/connect-wallet.png" alt="">
                            <h3>Connect Wallet</h3>
                        </a>
                    </div>
                    <div class="col-lg-4">
                        <a class="create-wallet" @click="onCreateAWalletClick" style="cursor:pointer">
                            <img src="img/create-wallet.png" alt="">
                            <h3>Create Wallet</h3>
                        </a>
                    </div>
                    <div class="col-lg-4">
                        <a class="restore-wallet" @click="onRestoreWalletClick" style="cursor:pointer">
                            <img src="img/restore-wallet.png" alt="">
                            <h3>Restore Wallet</h3>
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="col-lg-12 pl-0 pr-0" style="height:100%;">
                    <div class="nec-status">
                        <div class="available-cvr">
                            <h5>Available</h5>
                            <p><n-e-c-token-value :value="accountsBalance" no-currency /><span class="">NEC</span></p>
                            <span class="available-value"><n-e-c-token-value
                                    :value="accountsBalance * this.$store.state.tokenPrice" with-price-currency
                                    no-currency /></span>
                        </div>
                        <div class="total-cvr">
                            <h5>Total</h5>
                            <div class="total-val">
                                <p><n-e-c-token-value :value="accountsTotalBalance" no-currency /><span class="">NEC</span>
                                </p>
                                <span class="total-value"><n-e-c-token-value
                                        :value="accountsTotalBalance * this.$store.state.tokenPrice" with-price-currency
                                        no-currency /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row wallet-cvr">
            
            <div class="col-lg-12">
                <h2 :id="walletsId" class="h1">
                    Wallets <span class="f-records-count count">{{ accounts.length }}</span>
                </h2>
            </div>
            <div v-for="(account, index) in accounts" :key="account.address" class="col-lg-12">
                <div class="col-lg-5">
                    <div class="walletkey-dtl">
                        <div class="wallet-no">

                        </div>
                        <span v-if="pickMode" class="value clickable" :data-address="account.address" tabindex="0">
                            <account-name :account="account" />
                        </span>
                        <router-link v-else :to="{
                            name: routeName,
                            params: { ...routeParams, address: account.address },
                        }" :target="targetWindow" class="value clickable" aria-label="Address"
                            :data-address="account.address">
                            <account-name :account="account" />
                        </router-link>
                        <h6>Keystore File</h6>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="nec-statuswall">
                        <div class="available-cvr">
                            <h5>Available</h5>
                            <p style="display: flex;"><n-e-c-token-value :value="account.balance" convert no-currency /><span class="">NEC</span>
                            </p>
                            <span class="available-value"><n-e-c-token-value :value="WEIToNEC(account.balance) * tokenPrice"
                                    with-price-currency no-currency /></span>
                        </div>
                        <div class="total-cvr">
                            <h5>Total</h5>
                            <div class="total-val">
                                <p style="display: flex;"><n-e-c-token-value :value="account.totalBalance" convert no-currency /><span
                                        class="">NEC</span></p>
                                <span class="total-value"><n-e-c-token-value
                                        :value="WEIToNEC(account.totalBalance) * tokenPrice" with-price-currency
                                        no-currency /></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="walletdtl-edit">
                        <a class="edit"  :data-address="account.address"
                                        :data-index="index" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M6.3764 17.0884L15.1628 5.72599C15.6403 5.11325 15.8101 4.40484 15.6509 3.68354C15.513 3.0278 15.1097 2.40432 14.5049 1.93133L13.0299 0.759611C11.7459 -0.261614 10.1541 -0.154116 9.24152 1.0176L8.25465 2.2979C8.12731 2.45807 8.15914 2.69456 8.31832 2.82356C8.31832 2.82356 10.812 4.82301 10.8651 4.86601C11.0349 5.02725 11.1622 5.24225 11.1941 5.50024C11.2471 6.00548 10.8969 6.47847 10.377 6.54296C10.1329 6.57521 9.89944 6.49997 9.72966 6.36022L7.1086 4.27477C6.98126 4.1791 6.79025 4.19952 6.68413 4.32852L0.455138 12.3908C0.0518984 12.8961 -0.086052 13.5518 0.0518984 14.186L0.847767 17.6367C0.890213 17.8194 1.04939 17.9484 1.24039 17.9484L4.74222 17.9054C5.37891 17.8947 5.97316 17.6044 6.3764 17.0884ZM11.2797 16.0138H16.9898C17.5469 16.0138 18 16.4728 18 17.0372C18 17.6026 17.5469 18.0605 16.9898 18.0605H11.2797C10.7226 18.0605 10.2695 17.6026 10.2695 17.0372C10.2695 16.4728 10.7226 16.0138 11.2797 16.0138Z"
                                    fill="#31BC3C" />
                            </svg>
                            Edit

                        </a>
                        <a class="copy">
                            
                            <f-copy-button
                                        :text="account.address"
                                        tooltip="Copy address to clipboard"
                                        :default-icon-size="16"
                                        class="btn light same-size round"
                                        style="background:none"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <g clip-path="url(#clip0_49_4029)">
                                    <path
                                        d="M12.168 4.33301C12.168 4.56507 12.2602 4.78763 12.4243 4.95173C12.5883 5.11582 12.8109 5.20801 13.043 5.20801H16.5132C16.4488 4.63985 16.1995 4.1086 15.8036 3.69601L13.8051 1.63188C13.3679 1.18874 12.7879 0.91471 12.168 0.858383V4.33301ZM10.418 4.33301V0.833008H6.91797C5.75807 0.834397 4.64608 1.29578 3.82591 2.11595C3.00574 2.93612 2.54436 4.04811 2.54297 5.20801V13.958C2.54436 15.1179 3.00574 16.2299 3.82591 17.0501C4.64608 17.8702 5.75807 18.3316 6.91797 18.333H12.168C13.3279 18.3316 14.4399 17.8702 15.26 17.0501C16.0802 16.2299 16.5416 15.1179 16.543 13.958V6.95801H13.043C12.3468 6.95801 11.6791 6.68145 11.1868 6.18916C10.6945 5.69688 10.418 5.0292 10.418 4.33301ZM15.668 21.833H7.79297C7.5609 21.833 7.33835 21.7408 7.17425 21.5767C7.01016 21.4126 6.91797 21.1901 6.91797 20.958C6.91797 20.7259 7.01016 20.5034 7.17425 20.3393C7.33835 20.1752 7.5609 20.083 7.79297 20.083H15.668C16.3642 20.083 17.0318 19.8064 17.5241 19.3142C18.0164 18.8219 18.293 18.1542 18.293 17.458V7.83301C18.293 7.60094 18.3852 7.37838 18.5493 7.21429C18.7133 7.0502 18.9359 6.95801 19.168 6.95801C19.4 6.95801 19.6226 7.0502 19.7867 7.21429C19.9508 7.37838 20.043 7.60094 20.043 7.83301V17.458C20.0416 18.6179 19.5802 19.7299 18.76 20.5501C17.9399 21.3702 16.8279 21.8316 15.668 21.833Z"
                                        fill="#31BC3C" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_49_4029">
                                        <rect width="21" height="21" fill="white"
                                            transform="translate(0.792969 0.833008)" />
                                    </clipPath>
                                </defs>
                            </svg>
                                        <template #popover-text>
                                            Address copied to clipboard. <br />
                                            Warning: Use this address to receive Ncogearthchain NEC only. If you are receiving
                                            NEC-ERC20 you need to use a different address!
                                        </template><span style="color:#000;font-weight: 400;">Copy</span>
                                    </f-copy-button>
                           
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class=" contact-new">
            <div class="contact-add">
                <section :aria-labelledby="contactsId">
                    <h2 :id="contactsId" class="h1">
                        Contacts <span class="f-records-count count">{{ contacts.length }}</span>
                    </h2>

                    <contact-list edit-mode />
                </section>
            </div>
        </div>
        <account-settings-window  ref="accountSettingsWindow" :account-data="accountData"  />
        <create-account-window ref="createAccountWindow" />
        <restore-account-window ref="restoreAccountWindow" />
        <connect-wallet-window ref="connectWalletWindow" />
    </div>
</template>

<script>


import {
    DEACTIVATE_ACTIVE_ACCOUNT,
    SET_ACTIVE_ACCOUNT_ADDRESS,
    SET_ACTIVE_ACCOUNT_BY_ADDRESS,
} from '../../store/mutations.type.js';
import { eventBusMixin } from '../../mixins/event-bus.js';
import { UPDATE_ACCOUNTS_BALANCES } from '../../store/actions.type.js';
import AccountSettingsWindow from '@/components/windows/AccountSettingsWindow/AccountSettingsWindow.vue';
import AccountName from '@/components/AccountName/AccountName.vue';
import { pollingMixin } from '../../mixins/polling.js';
import FCopyButton from '@/components/core/FCopyButton/FCopyButton.vue';
import { isAriaAction } from '../../utils/aria.js';

import { WEIToNEC } from '../../utils/transactions.js';
import NECTokenValue from '@/components/core/NECTokenValue/NECTokenValue.vue';
import CreateAccountWindow from '@/components/windows/CreateAccountWindow/CreateAccountWindow.vue';
import RestoreAccountWindow from '@/components/windows/RestoreAccountWindow/RestoreAccountWindow.vue';
import ConnectWalletWindow from '@/components/windows/ConnectWalletWindow/ConnectWalletWindow.vue';
// import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.vue';
// import AccountList from '../../components/AccountList/AccountList.vue';
import { mapGetters } from 'vuex';
import ContactList from '../../components/ContactList/ContactList.vue';
import { getUniqueId } from '@/utils';

export default {
    name: 'Dashboard',

    components: {
        ContactList , CreateAccountWindow, RestoreAccountWindow, ConnectWalletWindow, NECTokenValue,
        FCopyButton, AccountName, AccountSettingsWindow,
    },

    data() {
        return {
            walletsId: getUniqueId(),
            contactsId: getUniqueId(),
            routeName: 'account-history',
            routeParams: {},
            accountData: {
                address: '',
                index: -1,
            },
        };
    },
    props: {
        /** Show action icons on the right side. */
        editMode: {
            type: Boolean,
            default: false,
        },
        /** Emit 'account-picked' event when whole account element is clicked. */
        pickMode: {
            type: Boolean,
            default: false,
        },
        /** Target window for account links */
        targetWindow: {
            type: String,
            default: undefined,
        },
    },
    computed: {
        
        ...mapGetters(['accounts', 'contacts']),
        tokenPrice() {
            return this.$store.state.tokenPrice;
        },
        accountsBalance() {
            return this.accounts.reduce((_total, _currItem) => {
                return _total + WEIToNEC(_currItem.balance);
            }, 0);
        },
        
        accountsTotalBalance() {
            return this.accounts.reduce((_total, _currItem) => {
                return _total + WEIToNEC(_currItem.totalBalance);
            }, 0);
        },
    },
    mixins: [eventBusMixin, pollingMixin],
    watch: {
        $route(_route) {
            if (_route.params && _route.params.address) {
                this.$emit('account-picked', _route.params.address);
                this._eventBus.emit('account-picked', _route.params.address);
            }
        },
    },
    created() {
        const routeName = this.$route.name;

        if (
            routeName.indexOf('account-') > -1 ||
            routeName.indexOf('defi-') > -1 ||
            routeName.indexOf('fmint') > -1 ||
            routeName.indexOf('fswap') > -1 ||
            routeName.indexOf('staking') > -1 ||
            routeName.indexOf('funiswap') > -1 ||
            routeName.indexOf('gov-') > -1
        ) {
            this.routeName = routeName;
            this.routeParams = this.$route.params;
        }
    },
    mounted() {
        this.$store.dispatch(UPDATE_ACCOUNTS_BALANCES);

        /*
        this.$store.dispatch(UPDATE_ACCOUNTS_BALANCES).then(() => {
            this.$emit('accounts-updated');
        });
        */

        this._polling.start(
            'account-list',
            () => {
                this.$store.dispatch(UPDATE_ACCOUNTS_BALANCES);
            },
            3000
        );
    },

    beforeDestroy() {
        const route = this.$route;

        if (route.params && route.params.address) {
            this.pickAccount(route.params.address);
        }
    },
    methods: {
        /**
        * @param {string} _address
        */
        pickAccount(_address) {
            this.$store.commit(DEACTIVATE_ACTIVE_ACCOUNT);
            this.$store.commit(SET_ACTIVE_ACCOUNT_BY_ADDRESS, _address);
            this.$store.commit(SET_ACTIVE_ACCOUNT_ADDRESS, _address);
        },

        /**
         * @param {Event} _event
         */
        onAccountListClick(_event) {
            if (!this.onEditAccountButtonClick(_event)) {
                const elem = _event.target.closest('[data-address]');
                const address = elem ? elem.getAttribute('data-address') : '';

                // if (address && address.toLowerCase() === this.currentAccount.address.toLowerCase()) {
                if (address) {
                    this.$emit('account-picked', address);
                }
            }
        },
        onWindowHide(_data) {
            this.$emit('window-hide', _data);
        },
        /**
         * @param {Event} _event
         */
        onEditAccountButtonClick(_event) {
            const elem = _event.target.closest('[data-address]');
            const address = elem ? elem.getAttribute('data-address') : '';
            const index = elem ? parseInt(elem.getAttribute('data-index')) : -1;

            if (address && !isNaN(index) && index > -1) {
                this.accountData = { address, order: index + 1 };
                this.pickAccount(address);
                this.$refs.accountSettingsWindow.show();

                return true;
            }

            return false;
        },

        /**
         * @param {KeyboardEvent} _event
         */
        onAccountListKeyup(_event) {
            if (this.pickMode && isAriaAction(_event) && !_event.target.closest('.btn')) {
                const elem = _event.target.closest('[data-address]');
                const address = elem ? elem.getAttribute('data-address') : '';

                if (address) {
                    this.$emit('account-picked', address);
                }
            }
        },


        onCreateAWalletClick() {
            this.$refs.createAccountWindow.show();
        },

        onRestoreWalletClick() {
            this.$refs.restoreAccountWindow.show();
        },

        onConnectWalletClick() {
            this.$refs.connectWalletWindow.show();
        },
        WEIToNEC,
    },

};
</script>

<style lang="scss">
@import 'style';
</style>
