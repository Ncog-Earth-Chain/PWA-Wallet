<template>
    <div class="view-wallet">
        <div class="nec-logo">
            <a href="#/" class="nechdr-logo"><img src="img/NEC-logo.svg" alt="nec-logo"></a>
            <a class="nav_bar_open_button d-block d-md-none" @click="toggleNavbar">
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="23" viewBox="0 0 38 23" fill="none">
                    <path d="M27.9691 19.8627H2.01592C1.4524 19.8627 0.989258 20.3258 0.989258 20.8894C0.989258 21.4529 1.4524 21.916 2.01592 21.916H27.9691C28.5326 21.916 28.9958 21.4529 28.9958 20.8894C28.9958 20.3258 28.5326 19.8627 27.9691 19.8627ZM27.9691 3.48947C28.5326 3.48947 28.9958 3.02633 28.9958 2.46281C28.9958 1.8993 28.5326 1.43616 27.9691 1.43616H2.01592C1.4524 1.43616 0.989258 1.8993 0.989258 2.46281C0.989258 3.02633 1.4524 3.48947 2.01592 3.48947H27.9691ZM35.6024 12.7027C36.1659 12.7027 36.6291 12.2396 36.6291 11.6761C36.6291 11.1126 36.1659 10.6494 35.6024 10.6494H9.64921C9.08569 10.6494 8.62255 11.1126 8.62255 11.6761C8.62255 12.2396 9.08569 12.7027 9.64921 12.7027H35.6024Z" fill="white" stroke="white"/>
                </svg>
            </a>
        </div>
        <div class="nec-slidebar">
            <navigation :items="navigation" :toggle="isOpen" aria-label="main navigation" />
            <div class="nec-dtl">

                <router-view></router-view>
                <!-- <wallet-menu />  -->
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '@/views/Wallet/Navigation.vue';
// import WalletMenu from '../../components/WalletMenu/WalletMenu.vue';
// import FHamburgerSwitch from '@/components/core/FHamburgerSwitch/FHamburgerSwitch.vue';
// import SocialMediaLinks from '@/components/SocialMediaLinks/SocialMediaLinks.vue';
import { mapGetters, mapState } from 'vuex';
import { helpersMixin } from '../../mixins/helpers.js';
const ACCOUNT_DEFAULT_VIEW = 'account-history';
const STAKING_DEFAULT_VIEW = 'staking-delegations-info';
export default {
    mixins: [helpersMixin],
    name: 'Wallet',

    components: { Navigation },
    data() {
        return {
            /** Is drawer visible? */
            drawerOn: false,
            /** Animate drawer. */
            menuTransitionOn: false,
            /** Navigation items. */
            isOpen: false,
            navigation: [
                {
                    url: {
                        name: 'dashboard',
                    },
                    title: 'Home',
                    //    icon: homeIcon,
                    fill: true,
                },
                {
                    url: {
                        name: ACCOUNT_DEFAULT_VIEW,
                    },
                    title: 'Wallet',
                    // icon: walletIcon,
                    walletLink: true,
                    fill: true,
                },
                {
                    url: {
                        name: STAKING_DEFAULT_VIEW,
                    },
                    title: 'Staking',
                    // icon: stakingIcon,
                    stakingLink: true,
                    fill: true,
                },
                /*{
                      url: {
                          name: 'fmint',
                      },
                      title: 'fMint',
                      icon: fmintIcon,
                      fillColor: true,
                      fmintLink: true,
                  },
                  {
                      url: {
                          name: 'fswap',
                      },
                      title: 'fSwap',
                      icon: swapIcon,
                      fill: true,
                      fswapLink: true,
                  },
                 {
                      url: {
                          name: 'defi',
                      },
                      title: 'DeFi',
                      icon: defiIcon,
                      deFiLink: true,
                      fill: true,
                  },
                  {
                      url: {
                          name: 'funiswap',
                      },
                      title: 'fUNI',
                      icon: funiIcon,
                      fill: true,
                      fUniswapLink: true,
                  },*/
                {
                    url: {
                        name: 'gov',
                    },
                    title: 'Governance',
                    // icon: voteIcon,
                    govLink: true,
                    fill: true,
                },
                {
                    url: {
                        name: 'settings',
                    },
                    title: 'Settings',
                    // icon: settingsIcon,
                    // original: true,
                    fill: true,
                },
            ],
        };
    },

    computed: {
        /**
         * Container's css classes.
         *
         * @retun {object}
         */
        cssClass() {
            return {
                'drawer-on': this.drawerOn,
                'animate-menu': this.menuTransitionOn,
                'bottom-menu-on': this.useBottomMenu,
            };
        },

        ...mapState(['breakpoints']),

        ...mapGetters(['currentAccount', 'accounts']),
    },

    watch: {
        /**
         * Watches for vue route change.
         */
        $route() {
            this.hamburgerSwitchOff();
        },

        currentAccount(_account) {
            this.setWalletUrl(_account);
        },

        /**
         * Watches for `breakpoints` state change.
         *
         * @param {object} _breakpoints
         */
        breakpoints(_breakpoints) {
            this.onMenuBreakpoint(_breakpoints);
            /*
            const menuMobileBreakpoint = _breakpoints['menu-mobile'];

            if (menuMobileBreakpoint) {
                if (!menuMobileBreakpoint.matches) {
                    this.hamburgerSwitchOff();
                    this.menuTransitionOn = false;
                } else {
                    setTimeout(() => {
                        this.menuTransitionOn = true;
                    }, 20);
                }
            }
*/
        },
    },

    mounted() {
        this.setWalletUrl();
        this.onMenuBreakpoint(this.breakpoints);
    },

    methods: {
        toggleNavbar() {
            this.isOpen = !this.isOpen; // Toggles the value of isOpen
        },
        hamburgerSwitchOff() {
            const fHamburgerSwitch = this.findChildByName('f-hamburger-switch');

            if (fHamburgerSwitch) {
                fHamburgerSwitch.dOn = false;
            }
        },

        onMenuBreakpoint(_breakpoints) {
            const menuMobileBreakpoint = _breakpoints['menu-mobile'];

            if (menuMobileBreakpoint) {
                if (!menuMobileBreakpoint.matches) {
                    this.hamburgerSwitchOff();
                    this.menuTransitionOn = false;
                } else {
                    setTimeout(() => {
                        this.menuTransitionOn = true;
                    }, 20);
                }
            }
        },

        /**
         * @param {object} _account
         */
        setWalletUrl(_account) {
            this.setMenuItemUrl('walletLink', _account);
            this.setMenuItemUrl('stakingLink', _account, STAKING_DEFAULT_VIEW);
            // this.setMenuItemUrl('deFiLink', _account, 'defi-home');
            this.setMenuItemUrl('fmintLink', _account, 'defi-fmint');
            this.setMenuItemUrl('fswapLink', _account, 'defi-ftrade');
            this.setMenuItemUrl('fUniswapLink', _account, 'funiswap-swap');
            this.setMenuItemUrl('govLink', _account, 'gov-home');
        },

        /**
         * @param {string} _propName
         * @param {object} [_account]
         * @param {string} [_routeName]
         */
        setMenuItemUrl(_propName, _account, _routeName = ACCOUNT_DEFAULT_VIEW) {
            const { navigation } = this;
            const account = _account || this.currentAccount;
            let navItemIdx = -1;

            navigation.find((_item, _idx) => {
                if (_item[_propName]) {
                    navItemIdx = _idx;
                    return true;
                }

                return false;
            });

            if (navItemIdx > -1) {
                if (account) {
                    this.$set(navigation, navItemIdx, {
                        ...navigation[navItemIdx],
                        url: {
                            name: _routeName,
                            params: { address: account.address },
                        },
                        linkTitle: account.name || account.address,
                        disabled: false,
                    });
                } else {
                    this.$set(navigation, navItemIdx, {
                        ...navigation[navItemIdx],
                        url: { path: '#' },
                        linkTitle: '',
                        disabled: true,
                    });
                }
            }
        },

        onHamburgerSwitchOn() {
            this.drawerOn = true;
        },

        onHamburgerSwitchOff() {
            this.drawerOn = false;
        },

        onDrawerClick() {
            this.hamburgerSwitchOff();
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
