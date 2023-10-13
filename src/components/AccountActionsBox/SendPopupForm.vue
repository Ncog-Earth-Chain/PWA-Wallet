<template>
    <div class="account-settings-window">
        <f-window
            ref="win"
            modal
            style="max-width: 600px;"
           
            class="double-body-padding c-footer_ send-nec"
            animation-in="scale-center-enter-active"
            animation-out="scale-center-leave-active"
            @window-hide="onWindowHide"
        >
        <send-transaction-form />
        </f-window>
    </div>
</template>

<script>
import FWindow from '@/components/core/FWindow/FWindow.vue';
import SendTransactionForm from '@/components/forms/SendTransactionForm.vue';
export default {
    name: 'Send Ncogearthchain NEC',

    components: { FWindow,SendTransactionForm },


    methods: {
        show() {
            this.$refs.win.show();
        },

        /**
         * Called when `AccountSettingsForm` is submited.
         */
        onAccountSettingsFormData() {
            this.$refs.win.hide('fade-leave-active');
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
