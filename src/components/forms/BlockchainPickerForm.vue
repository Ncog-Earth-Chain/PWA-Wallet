<template>
    <div class="blockchain-picker-form">
        <!-- <h2 class="with-back-btn align-center" data-focus>
            Send Ncogearthchain NEC
        </h2> -->

        <f-card class="f-card-double-padding">
            <h3 :id="labelId" class="align-center">Which blockchain are you sending NEC to?</h3>

            <div class="bc-picker">
                <f-form ref="form" :aria-labelledby="labelId" center-form @f-form-submit="onFormSubmit">
                    <blockchain-picker />

                    <div class="align-center">
                        <a @click="$refs.SendPopupForm.show()" class="con-button">
                            Continue
                        </a>
                    </div>
                </f-form>
            </div>
        </f-card>
        <send-popup-form ref="SendPopupForm" @window-hide="onWindowHide" />
    </div>
</template>

<script>
import SendPopupForm from '@/components/AccountActionsBox/SendPopupForm.vue';
import FCard from '../core/FCard/FCard.vue';
// import { SET_SEND_DIRECTION } from '../../store/mutations.type.js';
import FForm from '../core/FForm/FForm.vue';
import BlockchainPicker from '../BlockchainPicker/BlockchainPicker.vue';
import { focusElem } from '@/utils/aria.js';
import { getUniqueId } from '@/utils';
import { viewHelpersMixin } from '@/mixins/view-helpers.js';

export default {
    name: 'BlockchainPickerForm',

    components: { BlockchainPicker, FForm, FCard ,SendPopupForm},

    mixins: [viewHelpersMixin],

    data() {
        return {
            labelId: getUniqueId(),
        };
    },

    mounted() {
        focusElem(this.$el);
    },

    methods: {
        onFormSubmit(_event) {
            const { data } = _event.detail;
            let direction = '';

            if (data.blockchain) {
                switch (data.blockchain) {
                    case 'ncogearthchain':
                        direction = 'NcogearthchainToNcogearthchain';
                        break;
                    case 'binance':
                        direction = 'NcogearthchainToBinance';
                        break;
                    case 'ethereum':
                        direction = 'NcogearthchainToEthereum';
                        break;
                }

                this.$router.push({
                    name: 'account-send-transaction-form',
                    params: {
                        sendDirection: direction,
                    },
                });
            }
        },
    },
};
</script>

<style scoped>

.con-button {
    border-radius: 32.5px;
    background: #31bc3c;
    border: none;
    outline: none;
    box-shadow: 0 10px 30px -7px #31bc3c;
    padding: 12px 30px;
    line-height: 1;
    margin-top: 20px;
    color: #fff;
    cursor: pointer;
}
</style>
