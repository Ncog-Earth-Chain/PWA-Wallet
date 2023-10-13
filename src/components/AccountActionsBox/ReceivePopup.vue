<template>
    <div class="account-settings-window">
        <f-window
            ref="win"
            modal
            style="max-width: 1120px;"
            class="double-body-padding c-footer_ earth-chain"
            animation-in="scale-center-enter-active"
            animation-out="scale-center-leave-active"
            @window-hide="onWindowHide"
        >
        <receive-popup-content />
        </f-window>
    </div>
</template>

<script>
import FWindow from '@/components/core/FWindow/FWindow.vue';
import ReceivePopupContent from '@/components/ReceiveCoins/ReceiveCoins.vue';
export default {
    name: 'Receive Ncogearthchain NEC',

    components: { FWindow,ReceivePopupContent },


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
