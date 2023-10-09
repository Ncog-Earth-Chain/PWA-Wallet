<template>
    <div class="mnemonic-phrase" tabindex="-1">
        <h2 data-focus style="color: #1E1E1E;">Your mnemonic phrase</h2>

        <f-message type="info" with-icon>
            Please backup the text below on paper and keep it somewhere secret and safe.
        </f-message>

        <ul v-if="dMnemonicArray.length" class="phrase-list no-markers" aria-label="mnemonic phrase - list of words" style="color:#000">
            <li v-for="(item, index) in dMnemonicArray" :key="`mn${index}`" tabindex="0" :aria-label="item">
                <span class="num" aria-hidden="true">{{ index + 1 }}</span> {{ item }}
            </li>
        </ul>

        <div class="footer">
            <button class="btn secondary large" @click="onPrivateKeyButClick" style="background-color:rgba(49, 188, 60, 0.15);color:#31BC3C;border: 1px solid rgba(49, 188, 60, 0.60);">View your private key</button> &nbsp;
            <button class="btn large" @click="onSubmitButClick" style="background-color:#31BC3C">I wrote down my recovery key</button>
        </div>
    </div>
</template>

<script>
import FMessage from '../core/FMessage/FMessage.vue';
import { focusElem } from '@/utils/aria.js';
export default {
    components: { FMessage },

    props: {
        // {privateKey: string, mnemonic: string, keystore: EncryptedKeystoreV3Json}
        account: {
            type: Object,
            default() {
                return {
                    privateKey: '',
                    mnemonic: '',
                    keystore: null,
                };
            },
        },
    },

    data() {
        return {
            dMnemonicArray: this.$fWallet.getMnemonicArray(this.account.mnemonic),
        };
    },

    mounted() {
        focusElem(this.$el);
    },

    methods: {
        onSubmitButClick() {
            this.$emit('change-component', {
                detail: {
                    from: 'mnemonic-phrase',
                    data: { account: this.account },
                },
            });
        },

        onPrivateKeyButClick() {
            alert(this.account.privateKey);
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
