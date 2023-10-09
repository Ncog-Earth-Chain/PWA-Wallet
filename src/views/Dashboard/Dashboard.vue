<template>
    <div class="view-dashboard">

        <h2>Home</h2>
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="row">
                                <div class="col-lg-4">
                                    <a href="#!" class="contect-wall">
                                        <img src="img/connect-wallet.png" alt="">
                                        <h3>Connect Wallet</h3>
                                    </a>
                                </div>
                                <div class="col-lg-4">
                                    <a href="#!" class="create-wallet">
                                        <img src="img/create-wallet.png" alt="">
                                        <h3>Create Wallet</h3>
                                    </a>
                                </div>
                                <div class="col-lg-4">
                                    <a href="#!" class="restore-wallet">
                                        <img src="img/restore-wallet.png" alt="">
                                        <h3>Restore Wallet</h3>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="nec-status">
                                <div class="available-cvr">
                                    <h5>Available</h5>
                                    <p>9,922 <span class="">NEC</span></p>
                                    <span class="available-value">0.00</span>
                                </div>
                                <div class="total-cvr">
                                    <h5>Total</h5>
                                    <div class="total-val">
                                        <p>02<span class="">NEC</span></p>
                                        <span class="total-value">0.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row wallet-cvr">
                        <div class="col-lg-5">
                            <div class="walletkey-dtl">
                                <div class="wallet-no">
                                    <h4>Wallets</h4>
                                    <span>01</span>
                                </div>
                                <h5>Wallet 1</h5>
                                <p>0x1848CE39fd2E1BA43f28e5b735Cb16Bbbb62335e</p>
                                <h6>Keystore File</h6>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="nec-statuswall">
                                <div class="available-cvr">
                                    <h5>Available</h5>
                                    <p>9,922 <span class="">NEC</span></p>
                                    <span class="available-value">0.00</span>
                                </div>
                                <div class="total-cvr">
                                    <h5>Total</h5>
                                    <div class="total-val">
                                        <p>0.00<span class="">NEC</span></p>
                                        <span class="total-value">0.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="walletdtl-edit">
                                <a href="#!" class="edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19"
                                        fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M6.3764 17.0884L15.1628 5.72599C15.6403 5.11325 15.8101 4.40484 15.6509 3.68354C15.513 3.0278 15.1097 2.40432 14.5049 1.93133L13.0299 0.759611C11.7459 -0.261614 10.1541 -0.154116 9.24152 1.0176L8.25465 2.2979C8.12731 2.45807 8.15914 2.69456 8.31832 2.82356C8.31832 2.82356 10.812 4.82301 10.8651 4.86601C11.0349 5.02725 11.1622 5.24225 11.1941 5.50024C11.2471 6.00548 10.8969 6.47847 10.377 6.54296C10.1329 6.57521 9.89944 6.49997 9.72966 6.36022L7.1086 4.27477C6.98126 4.1791 6.79025 4.19952 6.68413 4.32852L0.455138 12.3908C0.0518984 12.8961 -0.086052 13.5518 0.0518984 14.186L0.847767 17.6367C0.890213 17.8194 1.04939 17.9484 1.24039 17.9484L4.74222 17.9054C5.37891 17.8947 5.97316 17.6044 6.3764 17.0884ZM11.2797 16.0138H16.9898C17.5469 16.0138 18 16.4728 18 17.0372C18 17.6026 17.5469 18.0605 16.9898 18.0605H11.2797C10.7226 18.0605 10.2695 17.6026 10.2695 17.0372C10.2695 16.4728 10.7226 16.0138 11.2797 16.0138Z"
                                            fill="#31BC3C" />
                                    </svg>
                                    Edit
                                </a>
                                <a href="#!" class="copy">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                        fill="none">
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
                                    Copy
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class=" contact-new">
                        <div class="contact-add">
                            <div class="contact-cvr">
                                <h4>Contacts</h4>
                                <span>0</span>
                            </div>
                            <button type="submit" class="newadd-contct">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20"
                                    fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M17.7549 11.9419H2.84509C1.5851 11.9419 0.5625 11.1579 0.5625 10.1919C0.5625 9.22589 1.5851 8.44189 2.84509 8.44189H17.7549C19.0149 8.44189 20.0375 9.22589 20.0375 10.1919C20.0375 11.1579 19.0149 11.9419 17.7549 11.9419Z"
                                        fill="white" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M10.3008 19.9309C9.33478 19.9309 8.55078 18.9083 8.55078 17.6484V2.73547C8.55078 1.47548 9.33478 0.452881 10.3008 0.452881C11.2668 0.452881 12.0508 1.47548 12.0508 2.73547V17.6484C12.0508 18.9083 11.2668 19.9309 10.3008 19.9309Z"
                                        fill="white" />
                                </svg>
                                New Contact
                            </button>
                        </div>
                    </div>
    </div>
</template>

<script>
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.vue';
import AccountList from '../../components/AccountList/AccountList.vue';
import { mapGetters } from 'vuex';
import ContactList from '../../components/ContactList/ContactList.vue';
import { getUniqueId } from '@/utils';

export default {
    name: 'Dashboard',

    components: { ContactList, AccountList, DashboardHeader },

    data() {
        return {
            walletsId: getUniqueId(),
            contactsId: getUniqueId(),
        };
    },

    computed: {
        ...mapGetters(['accounts', 'contacts']),
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
