<template>
    <section :aria-labelledby="labelId" class="installation-info">
        <h2 :id="labelId" class="not-visible">Wallet instalation</h2>

        <p class="align-center installation-description">
            The NCOG Earth Chain Wallet has been created as a Progressive Web App (PWA) which is easy to launch on all platforms:
        </p>

        <div class="inst-buttons">
            <span class="installation-links large" aria-label="Windows installation" @click="showDesktopInfo">
                <icon data="@/assets/svg/brands/windows.svg" width="30" height="40" aria-hidden="true" />
                Windows
            </span>
            <span class="installation-links large" aria-label="macOS installation" @click="showDesktopInfo">
                <icon data="@/assets/svg/brands/apple.svg" width="30" height="40" aria-hidden="true" />
                macOS
            </span>
            <span class="installation-links large" aria-label="Linux installation" @click="showDesktopInfo">
                <icon data="@/assets/svg/brands/linux.svg" width="30" height="40" aria-hidden="true" />
                Linux
            </span>
            <span class="installation-links large" aria-label="iOS installation" @click="showIOSInfo">
                <icon data="@/assets/svg/brands/apple.svg" width="30" height="40" aria-hidden="true" />
                iOS
            </span>
            <span class="installation-links large" aria-label="Android installation" @click="showAndroidInfo">
                <icon data="@/assets/svg/brands/android.svg" width="30" height="40" aria-hidden="true" />
                Android
            </span>
        </div>

        <f-window
            ref="desktopInfo"
            modal
            title="Desktop Installation"
            style="max-width: 520px;"
            animation-in="scale-center-enter-active"
            animation-out="scale-center-leave-active"
            class="c-black bg-white send-chain"
        >
            <div class="inst-content">
                <ul class="no-markers">
                    <li>
                        <b>Step 1:</b> Open the <a class="text-link" 
                        href="https://wallet.ncogchain.earth/">NCOG Earth Chain Wallet</a> in
                        <b>Chrome</b>
                    </li>
                    <li><b>Step 2:</b> Go to <b>Settings</b> (Three dots in the top right corner)</li>
                    <li><b>Step 3:</b> Click <b>“Install NCOG Earth Chain Wallet”</b></li>
                </ul>
            </div>
        </f-window>

        <f-window
            ref="iosInfo"
            modal
            title="iOS Installation"
            style="max-width: 520px;"
            animation-in="scale-center-enter-active"
            animation-out="scale-center-leave-active"
            class="c-black bg-white send-chain"
        >
            <div class="inst-content">
                <ul class="no-markers">
                    <li>
                        <b>Step 1:</b> Open the <a class="text-link" href="https://wallet.ncogchain.earth/">NCOG Earth Chain Wallet</a> in
                        <b>Safari</b>
                    </li>
                    <li><b>Step 2:</b> Click the <b>Share button</b> in Safari (at the bottom)</li>
                    <li><b>Step 3:</b> Click <b>“Add to Home Screen”</b></li>
                </ul>
            </div>
        </f-window>

        <f-window
            ref="androidInfo"
            modal
            title="Android Installation"
            style="max-width: 520px;"
            animation-in="scale-center-enter-active"
            animation-out="scale-center-leave-active"
            class="c-black bg-white send-chain"
        >
            <div class="inst-content">
                <ul class="no-markers">
                    <li>
                        <b>Step 1:</b> Open the <a class="text-link" href="https://wallet.ncogchain.earth/">NCOG Earth Chain Wallet</a> in
                        <b>Chrome</b>
                    </li>
                    <li><b>Step 2:</b> Click <b>Settings</b> (top right corner)</li>
                    <li><b>Step 3:</b> Click <b>“Add to Home Screen”</b></li>
                </ul>
            </div>
        </f-window>
    </section>
</template>

<script>
import FWindow from '../core/FWindow/FWindow.vue';
import { getUniqueId } from '@/utils';
export default {
    name: 'InstallationInfo',

    components: { FWindow },

    data() {
        return {
            desktopTitle: '',
            labelId: getUniqueId(),
        };
    },

    methods: {
        showDesktopInfo() {
            this.$refs.desktopInfo.show();
        },

        showIOSInfo() {
            this.$refs.iosInfo.show();
        },

        showAndroidInfo() {
            this.$refs.androidInfo.show();
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
