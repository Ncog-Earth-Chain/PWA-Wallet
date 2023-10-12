<template>
    <ul class="blockchain-picker no-markers">
        <li style="display: flex;">
            <label for="bc-ncogearthchain">
                <input
                    id="bc-ncogearthchain"
                    v-model="blockchain"
                    type="radio"
                    name="blockchain"
                    value="ncogearthchain"
                    class="not-visible"
                /> 
                <span>
                    <icon
                        data="@/assets/svg/chain-logos/ncogearthchain-active.svg"
                        width="50"
                        height="50"
                        original
                        aria-hidden="true"
                        class="logo-active"
                        style="border-radius:50%;"
                    />
                    <icon
                        data="@/assets/svg/chain-logos/ncogearthchain-inactive.svg"
                        width="50"
                        height="50"
                        original
                        aria-hidden="true"
                        class="logo-inactive"
                        style="border-radius:50%"
                    />
                   
                </span>NCOGEarthChain
            </label>
        </li>
        <li>
            <label for="bc-eth">
                <input
                    id="bc-eth"
                    v-model="blockchain"
                    type="radio"
                    name="blockchain"
                    value="ethereum"
                    class="not-visible"
                    :disabled="!appConfig.bnbridgeApi.useETH || disableETH"
                />
                <span>
                    <icon
                        data="@/assets/svg/chain-logos/ethereum-active.svg"
                        width="50"
                        height="50"
                        original
                        aria-hidden="true"
                        class="logo-active"
                        style="border-radius:50%"
                    />
                    <icon
                        data="@/assets/svg/chain-logos/ethereum-inactive.svg"
                        width="50"
                        height="50"
                        original
                        aria-hidden="true"
                        class="logo-inactive"
                        style="border-radius:50%"
                    />
                    
                </span>Ethereum
            </label>
        </li>
        <li>
            <label for="bc-binance">
                <input
                    id="bc-binance"
                    v-model="blockchain"
                    type="radio"
                    name="blockchain"
                    value="binance"
                    class="not-visible"
                    :disabled="!appConfig.bnbridgeApi.useBNB || disableBNB"
                />
                <span>
                    <icon
                        data="@/assets/svg/chain-logos/binance-active.svg"
                        width="50"
                        height="50"
                        original
                        aria-hidden="true"
                        class="logo-active"
                        style="border-radius:50%"
                    />
                    <icon
                        data="@/assets/svg/chain-logos/binance-inactive.svg"
                        width="50"
                        height="50"
                        original
                        aria-hidden="true"
                        class="logo-inactive"
                        style="border-radius:50%"
                    /> 
                </span>
                Binance Chain
            </label>
        </li>
    </ul>
</template>

<script>
import appConfig from '../../../app.config.js';

export default {
    name: 'BlockchainPicker',

    props: {
        disableETH: {
            type: Boolean,
            default: false,
        },
        disableBNB: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            blockchain: 'ncogearthchain',
            appConfig,
        };
    },

    watch: {
        blockchain(_value) {
            this.$emit('blockchain-pick', _value);
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
