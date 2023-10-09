<template>
    <div class="address-actions-box">
        <!-- <ul v-if="!verticalMode" class="no-markers">
            <li>
                <f-copy-button
                    :text="currentAccount.address"
                    tooltip="Copy Address"
                    :hide-popover-after="3100"
                    class="btn large light same-size round"
                >
                    <template #popover-text>
                        Address copied to clipboard. <br />
                        Warning: Use this address to receive Ncogearthchain NEC only. If you are receiving NEC-ERC20 you need to
                        use a different address!
                    </template>
                </f-copy-button>
            </li>
            <li>
                <button class="btn large light same-size round" title="Show QR Code" @click="$refs.qrWindow.show()">
                    <icon data="@/assets/svg/monochrome/Options/QR.svg" width="20" height="20" aria-hidden="true" />
                </button>
            </li>
            <li v-if="downloadKeystoreFile">
                <button
                    class="btn large light same-size round"
                    title="Download Keystore"
                    @click="onDownloadKeystoreClick"
                >
                    <icon
                        data="@/assets/svg/monochrome/Options/Download.svg"
                        width="20"
                        height="20"
                        aria-hidden="true"
                    />
                </button>
            </li>
            <li v-if="currentAccount.isLedgerAccount">
                <button class="btn large light same-size round" title="Verify on Ledger" @click="onVerifyOnLedgerClick">
                    <icon data="@/assets/svg/check.svg" width="20" height="20" />
                </button>
            </li>
            <li>
                <button
                    class="btn large light same-size round"
                    title="Edit Wallet"
                    @click="$refs.accountSettingsWindow.show()"
                >
                    <icon data="@/assets/svg/monochrome/Options/Edit.svg" width="16" height="16" aria-hidden="true" />
                </button>
            </li>
            <li>
                <button
                    class="btn large light same-size round"
                    title="Remove Wallet"
                    @click="$refs.removeAccountWindow.show()"
                >
                    <icon data="@/assets/svg/monochrome/Options/Logout.svg" width="20" height="20" aria-hidden="true" />
                </button>
            </li>
        </ul>
        <ul v-else class="no-markers vertical-mode">
            <li>
                <f-copy-button
                    :text="currentAccount.address"
                    :hide-popover-after="3100"
                    class="btn large light"
                    @window-hide="onWindowHide"
                >
                    <icon data="@/assets/svg/monochrome/Options/Copy.svg" width="20" height="20" aria-hidden="true" />
                    Copy Address
                    <template #popover-text>
                        Address copied to clipboard. <br />
                        Warning: Use this address to receive Ncogearthchain NEC only. If you are receiving NEC-ERC20 you need to
                        use a different address!
                    </template>
                </f-copy-button>
            </li>
            <li>
                <button class="btn large light" @click="$refs.qrWindow.show()">
                    <icon data="@/assets/svg/monochrome/Options/QR.svg" width="20" height="20" aria-hidden="true" />
                    Show QR Code
                </button>
            </li>
            <li v-if="currentAccount.isLedgerAccount">
                <button class="btn large light" @click="onVerifyOnLedgerClick">
                    <icon data="@/assets/svg/check.svg" width="20" height="20" />
                    Verify on Ledger
                </button>
            </li>
            <li>
                <button class="btn large light" @click="$refs.accountSettingsWindow.show()">
                    <icon data="@/assets/svg/monochrome/Options/Edit.svg" width="16" height="16" aria-hidden="true" />
                    Edit Wallet
                </button>
            </li>
            <li v-if="downloadKeystoreFile">
                <button class="btn large light" @click="onDownloadKeystoreClick">
                    <icon
                        data="@/assets/svg/monochrome/Options/Download.svg"
                        width="20"
                        height="20"
                        aria-hidden="true"
                    />
                    Download Keystore
                </button>
            </li>
            <li>
                <button class="btn large light" @click="$refs.removeAccountWindow.show()">
                    <icon data="@/assets/svg/monochrome/Options/Logout.svg" width="20" height="20" aria-hidden="true" />
                    Remove Wallet
                </button>
            </li>
        </ul> -->
        <div class="wallet1-cvr">
            <div class="walletdtl-edit">
                <f-copy-button :text="currentAccount.address" tooltip="Copy Address" :hide-popover-after="3100"
                    class="copy-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <g clip-path="url(#clip0_49_4029)">
                            <path
                                d="M12.168 4.33301C12.168 4.56507 12.2602 4.78763 12.4243 4.95173C12.5883 5.11582 12.8109 5.20801 13.043 5.20801H16.5132C16.4488 4.63985 16.1995 4.1086 15.8036 3.69601L13.8051 1.63188C13.3679 1.18874 12.7879 0.91471 12.168 0.858383V4.33301ZM10.418 4.33301V0.833008H6.91797C5.75807 0.834397 4.64608 1.29578 3.82591 2.11595C3.00574 2.93612 2.54436 4.04811 2.54297 5.20801V13.958C2.54436 15.1179 3.00574 16.2299 3.82591 17.0501C4.64608 17.8702 5.75807 18.3316 6.91797 18.333H12.168C13.3279 18.3316 14.4399 17.8702 15.26 17.0501C16.0802 16.2299 16.5416 15.1179 16.543 13.958V6.95801H13.043C12.3468 6.95801 11.6791 6.68145 11.1868 6.18916C10.6945 5.69688 10.418 5.0292 10.418 4.33301ZM15.668 21.833H7.79297C7.5609 21.833 7.33835 21.7408 7.17425 21.5767C7.01016 21.4126 6.91797 21.1901 6.91797 20.958C6.91797 20.7259 7.01016 20.5034 7.17425 20.3393C7.33835 20.1752 7.5609 20.083 7.79297 20.083H15.668C16.3642 20.083 17.0318 19.8064 17.5241 19.3142C18.0164 18.8219 18.293 18.1542 18.293 17.458V7.83301C18.293 7.60094 18.3852 7.37838 18.5493 7.21429C18.7133 7.0502 18.9359 6.95801 19.168 6.95801C19.4 6.95801 19.6226 7.0502 19.7867 7.21429C19.9508 7.37838 20.043 7.60094 20.043 7.83301V17.458C20.0416 18.6179 19.5802 19.7299 18.76 20.5501C17.9399 21.3702 16.8279 21.8316 15.668 21.833Z"
                                fill="#31BC3C"></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_49_4029">
                                <rect width="21" height="21" fill="white" transform="translate(0.792969 0.833008)"></rect>
                            </clipPath>
                        </defs>
                    </svg>
                    <template #popover-text>
                        Address copied to clipboard. <br />
                        Warning: Use this address to receive Ncogearthchain NEC only. If you are receiving NEC-ERC20 you
                        need to
                        use a different address!
                    </template>Copy
                </f-copy-button>
                <a class="copy" @click="$refs.qrWindow.show()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M8.09176 0.682129C8.51176 0.682129 8.85276 1.01651 8.85276 1.42935C8.85276 1.8412 8.51276 2.17558 8.09176 2.17558L6.46276 2.17656C5.11076 2.17853 4.01076 3.25817 4.01076 4.58492V6.44414C4.01076 6.85599 3.66876 7.19135 3.24876 7.19135C2.82876 7.19135 2.48776 6.85599 2.48776 6.44414V4.58492C2.48776 2.43544 4.27076 0.685071 6.46176 0.68311L8.09076 0.682129H8.09176ZM15.2649 0.682617H16.8579C19.0549 0.682617 20.8409 2.43397 20.8409 4.58835V6.44463C20.8409 6.85648 20.5009 7.19184 20.0799 7.19184C19.6599 7.19184 19.3189 6.85648 19.3189 6.44463V4.58835C19.3189 3.25767 18.2149 2.17509 16.8579 2.17509H15.2649C14.8449 2.17509 14.5039 1.84169 14.5039 1.42983C14.5039 1.017 14.8449 0.682617 15.2649 0.682617ZM14.4266 4.42479H8.90256C7.63856 4.43753 6.62256 5.45049 6.63356 6.69095V7.93632C6.63656 8.08145 6.75556 8.2001 6.90356 8.205H16.4236C16.5726 8.20108 16.6916 8.08243 16.6966 7.93632V6.69095C16.6976 6.09181 16.4616 5.51619 16.0356 5.08767C15.6126 4.66307 15.0316 4.42479 14.4266 4.42479ZM1.42606 9.72336H21.9031C22.3231 9.72336 22.6641 10.0577 22.6641 10.4706C22.6641 10.8824 22.3231 11.2158 21.9031 11.2158H20.8411V14.7754C20.8411 16.9308 19.0541 18.6821 16.8581 18.6821H15.2651C14.8441 18.6821 14.5031 18.3477 14.5031 17.9349C14.5031 17.5231 14.8441 17.1887 15.2651 17.1887H16.8581C18.2151 17.1887 19.3191 16.1071 19.3191 14.7754V11.2158H16.6961V12.2072C16.7061 13.4477 15.6911 14.4616 14.4261 14.4734H8.90206C7.63806 14.4616 6.62306 13.4477 6.63306 12.2072V11.2158H4.01006V14.7793C4.01006 16.1061 5.11106 17.1857 6.46406 17.1877L8.09206 17.1887C8.51206 17.1887 8.85306 17.5231 8.85306 17.9349C8.85206 18.3477 8.51206 18.6821 8.09106 18.6821L6.46206 18.6811C4.27106 18.6792 2.48706 16.9288 2.48706 14.7793V11.2158H1.42606C1.00606 11.2158 0.664062 10.8824 0.664062 10.4706C0.664062 10.0577 1.00606 9.72336 1.42606 9.72336Z"
                            fill="#31BC3C"></path>
                    </svg>
                    QR
                </a>
                <a v-if="downloadKeystoreFile" class="copy" @click="onDownloadKeystoreClick">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                        <path
                            d="M9.89416 4.97265V0.963633C9.89416 0.537358 10.2342 0.182129 10.6642 0.182129C11.0492 0.182129 11.3753 0.48062 11.427 0.858709L11.4342 0.963633V4.97265L16.2141 4.97295C18.5941 4.97295 20.5494 6.92191 20.6592 9.35254L20.6641 9.56822V14.6075C20.6641 17.0552 18.7767 19.0643 16.4321 19.1771L16.2241 19.1821H5.10406C2.72406 19.1821 0.778152 17.2429 0.6689 14.8034L0.664062 14.5869L0.664063 9.55789C0.664063 7.11023 2.54197 5.09134 4.88606 4.97798L5.09406 4.97295H9.89406V11.3753L8.29406 9.72311C7.99406 9.41332 7.50406 9.41332 7.20406 9.72311C7.05406 9.87801 6.98406 10.0845 6.98406 10.2911C6.98406 10.448 7.02886 10.6116 7.12358 10.7501L7.20406 10.8487L10.1141 13.864C10.2541 14.0189 10.4541 14.1015 10.6641 14.1015C10.8307 14.1015 10.9974 14.0442 11.1293 13.9354L11.2041 13.864L14.1141 10.8487C14.4141 10.5389 14.4141 10.0329 14.1141 9.72311C13.8413 9.44148 13.4116 9.41588 13.1103 9.64631L13.0241 9.72311L11.4341 11.3753V4.97295L9.89416 4.97265Z"
                            fill="#31BC3C"></path>
                    </svg>
                    Keystore
                </a>
                <a class="copy" @click="$refs.accountSettingsWindow.show()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M6.3764 17.0884L15.1628 5.72599C15.6403 5.11325 15.8101 4.40484 15.6509 3.68354C15.513 3.0278 15.1097 2.40432 14.5049 1.93133L13.0299 0.759611C11.7459 -0.261614 10.1541 -0.154116 9.24152 1.0176L8.25465 2.2979C8.12731 2.45807 8.15914 2.69456 8.31832 2.82356C8.31832 2.82356 10.812 4.82301 10.8651 4.86601C11.0349 5.02725 11.1622 5.24225 11.1941 5.50024C11.2471 6.00548 10.8969 6.47847 10.377 6.54296C10.1329 6.57521 9.89944 6.49997 9.72966 6.36022L7.1086 4.27477C6.98126 4.1791 6.79025 4.19952 6.68413 4.32852L0.455138 12.3908C0.0518984 12.8961 -0.086052 13.5518 0.0518984 14.186L0.847767 17.6367C0.890213 17.8194 1.04939 17.9484 1.24039 17.9484L4.74222 17.9054C5.37891 17.8947 5.97316 17.6044 6.3764 17.0884ZM11.2797 16.0138H16.9898C17.5469 16.0138 18 16.4728 18 17.0372C18 17.6026 17.5469 18.0605 16.9898 18.0605H11.2797C10.7226 18.0605 10.2695 17.6026 10.2695 17.0372C10.2695 16.4728 10.7226 16.0138 11.2797 16.0138Z"
                            fill="#31BC3C"></path>
                    </svg>
                    Edit
                </a>
                <a v-if="currentAccount.isLedgerAccount" class="copy" @click="onVerifyOnLedgerClick">
                    <icon data="@/assets/svg/check.svg" width="20" height="20" style="color:#31BC3C" />
                    Verify on Ledger
                </a>
                <a class="edit" @click="$refs.removeAccountWindow.show()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.18721 0.174316H12.5635C15.4476 0.174316 17.3789 2.19918 17.3789 5.21094V12.1627C17.3789 15.1659 15.4476 17.1899 12.5635 17.1899H5.18721C2.30306 17.1899 0.363281 15.1659 0.363281 12.1627V5.21094C0.363281 2.19918 2.30306 0.174316 5.18721 0.174316ZM11.432 11.2345C11.7213 10.9461 11.7213 10.4782 11.432 10.1889L9.91764 8.67454L11.432 7.1593C11.7213 6.87089 11.7213 6.39445 11.432 6.10518C11.1428 5.81507 10.6748 5.81507 10.3771 6.10518L8.87118 7.61872L7.35679 6.10518C7.05901 5.81507 6.59108 5.81507 6.30182 6.10518C6.01255 6.39445 6.01255 6.87089 6.30182 7.1593L7.81621 8.67454L6.30182 10.1804C6.01255 10.4782 6.01255 10.9461 6.30182 11.2345C6.44645 11.3792 6.64213 11.4566 6.8293 11.4566C7.02498 11.4566 7.21215 11.3792 7.35679 11.2345L8.87118 9.72951L10.3856 11.2345C10.5302 11.3885 10.7174 11.4566 10.9045 11.4566C11.1002 11.4566 11.2874 11.3792 11.432 11.2345Z"
                            fill="#E20000"></path>
                    </svg>
                    Remove
                </a>
            </div>
        </div>
        <q-r-code-window ref="qrWindow" :address="currentAccount.address" @window-hide="onWindowHide">
            <f-message type="warning" with-icon style="color:#E87F40;border-radius: 5px;
                opacity: 0.5;
                background: rgba(249, 190, 80, 0.30);font-weight: 400;">
                Warning: Use this address to receive Ncogearthchain NEC only. If you are receiving NEC-ERC20 you need to use
                a
                different address!
            </f-message>
        </q-r-code-window>

        <account-settings-window ref="accountSettingsWindow" :account-data="accountData" @window-hide="onWindowHide" />
        <remove-account-window ref="removeAccountWindow" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FCopyButton from '../core/FCopyButton/FCopyButton.vue';
import AccountSettingsWindow from '../windows/AccountSettingsWindow/AccountSettingsWindow.vue';
import QRCodeWindow from '../windows/QRCodeWindow/QRCodeWindow.vue';
import { clientInfo } from '../../utils/client-info.js';
import FMessage from '../core/FMessage/FMessage.vue';
import RemoveAccountWindow from '../windows/RemoveAccountWindow/RemoveAccountWindow.vue';

export default {
    components: { RemoveAccountWindow, FMessage, QRCodeWindow, AccountSettingsWindow, FCopyButton },

    props: {
        /** Show buttons with labels. */
        verticalMode: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapGetters(['currentAccount']),

        accountData() {
            return {
                address: this.currentAccount.address,
                order: -1,
            };
        },

        downloadKeystoreFile() {
            return (
                !this.currentAccount.isLedgerAccount &&
                !this.currentAccount.isMetamaskAccount &&
                !this.currentAccount.isCoinbaseAccount &&
                !this.currentAccount.isWalletConnectAccount &&
                !clientInfo.mobile
            );
        },
    },

    methods: {
        onDownloadKeystoreClick() {
            const { keystore } = this.currentAccount;

            if (keystore) {
                this.$fWallet.downloadKeystore(keystore);
            }
        },

        onVerifyOnLedgerClick() {
            this.$router.push({ name: 'account-receive', params: { verify: true } }).catch(() => { });
            this.$emit('window-hide');
        },

        /**
         * Re-target `'window-hide'` event.
         *
         * @param {object} _data
         */
        onWindowHide(_data) {
            this.$emit('window-hide', _data);
        },
    },
};
</script>

<style lang="scss">@import 'style';</style>
