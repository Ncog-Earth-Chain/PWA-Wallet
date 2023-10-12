<template>
    <div class="account-settings-window">
        <f-window
            ref="win"
            modal
            style="max-width: 800px;"
            title="Send NCOG Earth Chain NEC"
            class="double-body-padding c-footer_ send-chain"
            animation-in="scale-center-enter-active"
            animation-out="scale-center-leave-active"
            @window-hide="onWindowHide"
        >
        <send-popup-content />
        </f-window>
    </div>
</template>

<script>
import FWindow from '@/components/core/FWindow/FWindow.vue';
import SendPopupContent from '@/components/forms/BlockchainPickerForm.vue';
export default {
    name: 'Send NCOG Earth Chain NEC',

    components: { FWindow,SendPopupContent },


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
