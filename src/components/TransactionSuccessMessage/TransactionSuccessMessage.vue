<template>
    <f-card
        class="transaction-success-message f-card-double-padding"
        :class="{
            loading: loading,
            'window-mode': windowMode,
            'column-layout': windowMode && !loading,
            'column-layout--body-footer': windowMode && !loading,
        }"
        :off="cardOff"
    >
        <template v-if="loading">
            <h2>Verifying Transaction</h2>
            <pulse-loader color="#1969ff"></pulse-loader>
        </template>
        <template v-else>
            <div :class="{ 'center-v': windowMode }">
                <h2 data-focus tabindex="0">{{ dTitle }}</h2>

                <h3 class="break-word">
                    <a
                        v-if="!error"
                        :href="`${explorerUrl}${explorerTransactionPath}/${tx}`"
                        rel="noopener"
                        target="_blank"
                    >
                        <f-ellipsis :text="tx" overflow="middle" />
                    </a>
                    <f-message v-else type="error" alert>
                        {{ error }}
                    </f-message>
                </h3>

                <div v-if="transactionSuccess" class="success-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="172" height="172" viewBox="0 0 172 172" fill="none">
                        <circle opacity="0.6" cx="86.0004" cy="86.0426" r="85.1219" fill="#31BC3C" fill-opacity="0.07"/>
                        <circle opacity="0.6" cx="86.0007" cy="86.0424" r="61.0676" fill="#31BC3C" fill-opacity="0.11"/>
                        <path d="M86.001 44.8635C63.7183 44.8635 45.5898 62.9879 45.5898 85.2747C45.5898 87.3356 45.7474 89.4006 46.0546 91.4131C46.297 93.0174 47.7882 94.1368 49.4006 93.8701C51.0049 93.6236 52.1041 92.1244 51.8617 90.5241C51.599 88.8026 51.4656 87.0447 51.4656 85.2747C51.4656 66.2329 66.9593 50.7393 86.001 50.7393C105.043 50.7393 120.536 66.2329 120.536 85.2747C120.536 104.32 105.043 119.81 86.001 119.81C75.1991 119.81 65.2216 114.896 58.6224 106.329C57.6283 105.048 55.7856 104.801 54.5045 105.795C53.2154 106.781 52.977 108.628 53.9671 109.917C61.6856 119.935 73.3644 125.686 86.001 125.686C108.284 125.686 126.412 107.557 126.412 85.2747C126.412 62.9879 108.284 44.8635 86.001 44.8635Z" fill="#31BC3C"/>
                        <path d="M98.2438 73.5401L81.2064 90.5815L73.7587 83.1297C72.5746 81.9457 70.6551 81.9457 69.471 83.1297C68.287 84.3137 68.287 86.2333 69.471 87.4173L79.0606 97.0109C79.6304 97.5767 80.3982 97.8959 81.2064 97.8959C82.0066 97.8959 82.7784 97.5767 83.3482 97.0109L102.531 77.8278C103.715 76.6437 103.715 74.7242 102.531 73.5401C101.347 72.3561 99.4278 72.3561 98.2438 73.5401Z" fill="#31BC3C"/>
                    </svg>
                </div>
                <div v-else class="error-icon">
                    <icon data="@/assets/svg/message/times-circle.svg" width="96" height="96" aria-hidden="true" />
                </div>
            </div>

            <div v-if="(continueTo && transactionSuccess) || continueTo === 'hide-window'" class="form-buttons">
                <button class="btn large" @click="onContinueBtnClick">{{ continueButtonLabel }}</button>
            </div>
        </template>
    </f-card>
</template>

<script>
import FCard from '../core/FCard/FCard.vue';
import appConfig from '../../../app.config.js';
import FEllipsis from '../core/FEllipsis/FEllipsis.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import gql from 'graphql-tag';
import FMessage from '@/components/core/FMessage/FMessage.vue';
import { focusElem } from '@/utils/aria.js';
import { defer } from '@/utils';

export default {
    components: { FMessage, FEllipsis, FCard, PulseLoader },

    props: {
        /** Transaction hash */
        tx: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: 'Success',
        },
        /** Name of component/route used in 'continue' button. */
        continueTo: {
            type: String,
            default: '',
        },
        /** Parameters to be passed to `continueTo`. */
        continueToParams: {
            type: Object,
            default() {
                return {};
            },
        },
        /** `continueTo` is name of route. */
        continueToIsRoute: {
            type: Boolean,
            default: false,
        },
        /** */
        continueButtonLabel: {
            type: String,
            default: 'Continue',
        },
        /** Continue to `continueTo` automatically after this number of milliseconds. */
        autoContinueToAfter: {
            type: Number,
            default: 0,
        },
        /** Don't render card */
        cardOff: {
            type: Boolean,
            default: false,
        },
        /** Component is placed in FWindow */
        windowMode: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            explorerUrl: appConfig.explorerUrl,
            explorerTransactionPath: appConfig.explorerTransactionPath,
            loading: true,
            transactionSuccess: true,
            dTitle: this.title,
            error: '',
        };
    },

    watch: {
        loading() {
            defer(() => {
                console.log('lllloading change');
                focusElem(this.$el);
            });
        },
    },

    mounted() {
        this.verifyTransaction();
    },

    created() {
        /** Timeout id. */
        this._tId = -1;
    },

    beforeDestroy() {
        if (this._tId > -1) {
            clearTimeout(this._tId);
        }
    },

    methods: {
        verifyTransaction() {
            setTimeout(() => {
                this._verifyTransaction();
            }, 400);
        },

        async _verifyTransaction() {
            try {
                const data = await this.$apollo.query({
                    query: gql`
                        query TransactionByHash($hash: Bytes32!) {
                            transaction(hash: $hash) {
                                status
                            }
                        }
                    `,
                    variables: {
                        hash: this.tx,
                    },
                    fetchPolicy: 'network-only',
                });

                if (data.data.transaction.status === null) {
                    this.verifyTransaction();
                } else {
                    this.transactionSuccess = parseInt(data.data.transaction.status, 16) === 1;

                    if (!this.transactionSuccess) {
                        this.dTitle = 'Transaction Error';
                    }

                    this.loading = false;

                    if (this.continueTo === 'hide-window') {
                        this.$emit('step', 1000);
                    }

                    if (this.autoContinueToAfter > 0) {
                        this._tId = setTimeout(() => {
                            this.onContinueBtnClick();
                        }, this.autoContinueToAfter);
                    }
                }
            } catch (error) {
                console.error(error);
                this.loading = false;
                this.error = error;
                this.dTitle = 'Error';
                this.transactionSuccess = false;
            }
        },

        getParams(obj) {
            let params = null;

            if (obj) {
                if (obj.params) {
                    params = obj.params;
                } else if (obj.props) {
                    params = obj.props;
                }
            }

            return params;
        },

        onContinueBtnClick() {
            const { continueToParams } = this;
            if (this.continueTo === 'account-history' || this.continueToIsRoute) {
                this.$router.replace({ name: this.continueTo, params: continueToParams });
            } else if (this.continueTo === 'hide-window') {
                this.$emit('cancel-button-click');
            } else {
                this.$emit('change-component', {
                    to: this.continueTo,
                    from: 'transaction-success-message',
                    data: continueToParams,
                });
            }

            const params = this.getParams(continueToParams);

            if (params && params.step) {
                this.$emit('step', params.step);
            }
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
