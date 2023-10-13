<template>
    <div class="keystore-form">
        <f-form ref="keystore-form" @f-form-submit="onFormSubmit">
            <fieldset>
                <legend class="not-visible">Keystore file</legend>

                <div class="form-body">
                    <div class="main">
                        <br />

                        <f-file-input-button
                            name="keystore-file"
                            accept="application/json"
                            class="secondary large w100p keystore-file"
                            @change="onKeystoreFileChange"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                            <g clip-path="url(#clip0_177_12751)">
                            <path d="M24.7001 10.8015C24.4664 10.7327 24.2532 10.6047 24.0797 10.4291C23.9062 10.2535 23.778 10.036 23.7068 9.79618C23.3112 8.41224 22.6478 7.12552 21.7566 6.0139C20.8654 4.90228 19.765 3.98886 18.5219 3.32892C17.2789 2.66898 15.919 2.27624 14.5247 2.17446C13.1303 2.07268 11.7305 2.26398 10.4098 2.73678C9.08918 3.20959 7.87519 3.95407 6.84131 4.92517C5.80744 5.89627 4.97519 7.07381 4.39491 8.38652C3.81463 9.69923 3.4984 11.1198 3.46535 12.5623C3.43229 14.0048 3.68311 15.4393 4.20261 16.7788C4.32196 17.0608 4.34765 17.3755 4.2757 17.674C4.20374 17.9726 4.03818 18.2382 3.80478 18.4295C2.77626 19.2175 1.97325 20.2779 1.48075 21.4984C0.988244 22.7189 0.824563 24.0542 1.00703 25.3628C1.29178 27.132 2.18157 28.7372 3.51491 29.887C4.84824 31.0368 6.53674 31.655 8.27395 31.6295H15.1417C15.4843 31.6295 15.8128 31.489 16.0551 31.239C16.2973 30.9889 16.4334 30.6498 16.4334 30.2962C16.4334 29.9426 16.2973 29.6034 16.0551 29.3534C15.8128 29.1033 15.4843 28.9628 15.1417 28.9628H8.27395C7.15831 28.9908 6.06988 28.6052 5.20593 27.8761C4.34198 27.1469 3.75966 26.1224 3.56453 24.9882C3.44078 24.1545 3.54107 23.3017 3.85447 22.5228C4.16787 21.7439 4.68235 21.0687 5.34186 20.5708C6.03461 20.0364 6.53573 19.2795 6.76649 18.4191C6.99725 17.5588 6.94457 16.6436 6.61674 15.8175C5.96852 14.0505 5.93519 12.1058 6.52245 10.3162C6.99158 8.91428 7.83166 7.67601 8.94753 6.74165C10.0634 5.80729 11.4105 5.21418 12.8361 5.02951C13.1668 4.98556 13.4999 4.9633 13.8333 4.96284C15.5035 4.95716 17.1305 5.51008 18.4708 6.53883C19.8111 7.56758 20.7925 9.0168 21.2681 10.6695C21.4538 11.2993 21.7883 11.8716 22.2415 12.3348C22.6947 12.798 23.2524 13.1375 23.8644 13.3228C25.362 13.7801 26.6887 14.6987 27.6666 15.9557C28.6446 17.2127 29.2272 18.7481 29.3365 20.3563C29.4458 21.9645 29.0766 23.5689 28.2782 24.9545C27.4798 26.3401 26.2904 27.4409 24.8693 28.1095C24.6589 28.2207 24.4831 28.3906 24.3618 28.6C24.2406 28.8093 24.1787 29.0496 24.1834 29.2935C24.1809 29.5141 24.2321 29.7319 24.3323 29.9268C24.4326 30.1217 24.5786 30.2874 24.7571 30.4089C24.9356 30.5303 25.1407 30.6035 25.3537 30.6218C25.5667 30.6401 25.7808 30.6029 25.9762 30.5135C31.316 27.8642 34.2171 20.8948 29.6962 14.1615C28.4514 12.4854 26.6883 11.2997 24.7001 10.8015Z" fill="#0E8917"/>
                            <path d="M25.0966 23.2388C25.3387 22.9888 25.4748 22.6497 25.4748 22.2962C25.4748 21.9426 25.3387 21.6035 25.0966 21.3535L23.048 19.2388C22.3213 18.4889 21.3359 18.0677 20.3084 18.0677C19.2809 18.0677 18.2954 18.4889 17.5688 19.2388L15.5202 21.3535C15.2849 21.605 15.1547 21.9418 15.1576 22.2914C15.1606 22.641 15.2964 22.9754 15.5359 23.2226C15.7754 23.4698 16.0994 23.61 16.438 23.6131C16.7767 23.6161 17.103 23.4817 17.3466 23.2388L19.0167 21.5148V31.6295C19.0167 31.9831 19.1528 32.3223 19.395 32.5723C19.6373 32.8224 19.9658 32.9628 20.3084 32.9628C20.651 32.9628 20.9795 32.8224 21.2217 32.5723C21.464 32.3223 21.6001 31.9831 21.6001 31.6295V21.5148L23.2702 23.2388C23.5124 23.4888 23.8409 23.6292 24.1834 23.6292C24.5259 23.6292 24.8544 23.4888 25.0966 23.2388Z" fill="#0E8917"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_177_12751">
                            <rect width="31" height="32" fill="white" transform="translate(0.93335 0.96283)"/>
                            </clipPath>
                            </defs>
                        </svg> <span class="c-green">&nbsp; Upload keystore
                            file</span>
                        </f-file-input-button>
                        <f-message v-if="dKeystoreUploadMsg && !dKeystoreErrorMsg" type="success" with-icon>
                            {{ dKeystoreUploadMsg }}
                        </f-message>
                        <br />

                        <f-message v-if="dKeystoreErrorMsg" type="error" alert with-icon>
                            {{ dKeystoreErrorMsg }}
                        </f-message>
                        <br />

                        <f-password-field
                            v-model="pwd"
                            placeholder="Enter your wallet password"
                            field-size="large"
                            autocomplete="off"
                            name="pwd"
                            validate-on-input
                            :validator="checkPassword"
                        >
                            <template #bottom="sProps">
                                <f-message v-show="sProps.showErrorMessage" type="error" alert with-icon>
                                    Type a password
                                </f-message>
                            </template>
                        </f-password-field>

                        <f-message v-if="dErrorMsg" type="error" alert with-icon>{{ dErrorMsg }}</f-message>
                    </div>

                    <div class="footer">
                        <button type="submit" class="btn large bg-dark-green" :disabled="dSubmitDisabled">
                            Unlock wallet
                        </button>
                    </div>
                </div>
            </fieldset>
        </f-form>
    </div>
</template>

<script>
import FForm from '../core/FForm/FForm.vue';
import FFileInputButton from '../core/FFileInputButton/FFileInputButton.vue';
import { FileReaderP } from '../../utils/file-reader.js';
import { mapGetters } from 'vuex';
import FMessage from '../core/FMessage/FMessage.vue';
import FPasswordField from '../core/FPasswordField/FPasswordField.vue';

export default {
    components: {
        FPasswordField,
        FMessage,
        FForm,
        FFileInputButton,
    },

    data() {
        return {
            dPrimaryPwdOk: true,
            dSubmitDisabled: true,
            dKeystoreErrorMsg: '',
            dKeystoreUploadMsg: '',
            dErrorMsg: '',
            pwd: '',
        };
    },

    computed: {
        ...mapGetters(['getAccountByAddress']),
    },

    created() {
        this._fileReader = new FileReaderP();
        this._keystore = null;
    },

    beforeDestroy() {
        this._fileReader = null;
    },

    methods: {
        checkForm() {
            this.dSubmitDisabled = !this.pwd || this._keystore === null;
        },

        checkPassword(_value) {
            const ok = _value.length > 0;

            this.checkForm();

            return ok;
        },

        async onKeystoreFileChange(_event) {
            const files = _event.target.files;

            if (files.length === 1) {
                try {
                    this._keystore = await this._fileReader.readAsJSON(files[0]);
                    this.dKeystoreErrorMsg = '';
                    this.dKeystoreUploadMsg = 'Keystore sucessfully loaded';
                    this.checkForm();
                } catch (e) {
                    this._keystore = null;
                    this.dKeystoreErrorMsg = 'Not valid JSON file.';
                    this.checkForm();
                }
            }
        },

        onFormSubmit(_event) {
            try {
                const account = this.$fWallet.decryptFromKeystore(this._keystore, this.pwd);

                if (account) {
                    if (this.getAccountByAddress(account.address)) {
                        this.dErrorMsg = 'An account with this address already exist';
                    } else {
                        _event.detail.data.keystore = this._keystore;
                        this.$emit('f-form-submit', _event);
                    }
                }

                this._keystore = null;
                this.pwd = '';
            } catch (_error) {
                this.dErrorMsg = 'Bad keystore file or password.';
            }
        },
    },
};
</script>

<style lang="scss"></style>
