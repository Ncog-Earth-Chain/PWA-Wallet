<template>
    <div class="view-defi-manage-collateral">
        <h1 class="with-back-btn"><f-back-button :route-name="backButtonRoute" /> Lock/Unlock {{ wnecTokenSymbol }}</h1>

        <h2 class="perex">
            Lock {{ wnecTokenSymbol }} to increase the collateral ratio and mint nusd, unlock
            {{ wnecTokenSymbol }} after you repaid nusd.
        </h2>

        <div class="grid">
            <div>
                <div class="df-data-item smaller">
                    <h3 class="label">Available balance</h3>
                    <div class="value"><f-token-value :token="wnecToken" :value="availableNEC" /></div>
                </div>
                <div class="df-data-item smaller">
                    <h3 class="label">Locked balance</h3>
                    <div class="value"><f-token-value :token="wnecToken" :value="collateral" /></div>
                </div>
                <div v-if="!largeView" class="df-data-item smaller">
                    <h3 class="label">Minted nusd</h3>
                    <div class="value"><f-token-value :token="nusdToken" :value="debt" /></div>
                </div>
            </div>
            <div class="defi-price-input-col align-center">
                <div class="defi-price-input">
                    <label :for="`text-input-${id}`" class="not-visible">{{ label }}</label>
                    <input
                        :id="`text-input-${id}`"
                        ref="input"
                        :value="inputValue"
                        :min="minCollateral"
                        :max="maxCollateral"
                        type="number"
                        step="any"
                        class="text-input no-style"
                        @change="onInput"
                    />

                    <div class="f-slider-wrap">
                        <f-slider
                            ref="slider"
                            v-model="currCollateral"
                            step="any"
                            :min="minCollateral.toString()"
                            :max="maxCollateral.toString()"
                            use-lower-fill-bar
                        >
                            <template #top="sProps">
                                <label :for="sProps.inputId" class="not-visible">{{ label }}</label>
                            </template>
                        </f-slider>
                        <div class="slider-buttons">
                            <button class="btn small light" @click="onMinBtnClick">Min</button>
                            <button
                                v-show="currCollateral !== collateral.toString()"
                                class="btn small light"
                                @click="onResetBtnClick"
                            >
                                Reset
                            </button>
                            <button class="btn small light" @click="onMaxBtnClick">Max</button>
                        </div>
                    </div>

                    <div class="token-label">{{ wnecTokenSymbol }}</div>
                    <div class="collateral-info">
                        <div class="collateral-info-label">Unlock {{ wnecTokenSymbol }}</div>
                        <icon data="@/assets/svg/angle-double-left.svg" width="66" height="66" aria-hidden="true" />
                    </div>
                    <div class="collateral-info increase">
                        <div class="collateral-info-label">Lock {{ wnecTokenSymbol }}</div>
                        <icon data="@/assets/svg/angle-double-right.svg" width="66" height="66" aria-hidden="true" />
                    </div>
                </div>
            </div>
            <div v-if="!smallView" class="minting-limit-col align-center">
                <!--                <template v-if="debt > 0">-->
                <h3>Debt Limit <debt-limit-f-info /></h3>
                <f-circle-progress
                    show-percentage
                    :stroke-width="6"
                    :animate="false"
                    :colors="colors"
                    :value="debtLimit"
                />
                <!--
                </template>
                <div v-else class="df-data-item">
                    <h3 class="no-margin">Max mintable</h3>
                    <div class="value">{{ maxMintable }} <span class="currency">nusd</span></div>
                </div>
                -->
            </div>
            <div v-if="largeView" class="right-col">
                <div class="df-data-item smaller">
                    <h3 class="label">Minted nusd</h3>
                    <div class="value"><f-token-value :token="nusdToken" :value="debt" /></div>
                </div>
                <template v-if="smallView">
                    <div v-if="debt > 0" class="df-data-item smaller">
                        <h3 class="label">Debt Limit <debt-limit-f-info /></h3>
                        <div class="value">
                            <f-colored-number-range show-percentage :colors="colors" :value="debtLimit" />
                        </div>
                    </div>
                    <div v-else class="df-data-item smaller">
                        <h3 class="label">Max mintable</h3>
                        <div class="value"><f-token-value :token="nusdToken" :value="maxMintable" /></div>
                    </div>
                </template>
            </div>

            <f-message v-if="message" type="info" role="alert" class="big">
                {{ message }}
            </f-message>
            <f-message v-else-if="increasedCollateral > 0" type="info" role="alert" class="big">
                You’re adding
                <span class="inc-desc-collateral">
                    <f-token-value :token="wnecToken" :value="increasedCollateral" no-currency /> {{ wnecTokenSymbol }}
                </span>
                to your collateral
            </f-message>
            <f-message v-else-if="decreasedCollateral > 0" type="info" role="alert" class="big">
                You’re removing
                <span class="inc-desc-collateral">
                    <f-token-value :token="wnecToken" :value="decreasedCollateral" no-currency /> {{ wnecTokenSymbol }}
                </span>
                from your collateral
            </f-message>
        </div>

        <div class="defi-buttons">
            <button class="btn large" :disabled="submitDisabled" @click="onSubmit">
                Submit
                <!--
                <template v-if="collateral > 0">
                    <template v-if="collateral === parseFloat(currCollateral)">Rebalance Now</template>
                    <template v-else-if="increasedCollateral > 0">Deposit Now</template>
                    <template v-else>Withdraw Deposit Now</template>
                </template>
                <template v-else>Add collateral</template>
                -->
            </button>
        </div>
    </div>
</template>

<script>
import FCircleProgress from '../../components/core/FCircleProgress/FCircleProgress.vue';
import { mapGetters } from 'vuex';
import FMessage from '../../components/core/FMessage/FMessage.vue';
import FSlider from '../../components/core/FSlider/FSlider.vue';
import { getUniqueId } from '../../utils';
import FColoredNumberRange from '../../components/core/FColoredNumberRange/FColoredNumberRange.vue';
import { getAppParentNode } from '../../app-structure.js';
import FBackButton from '../../components/core/FBackButton/FBackButton.vue';
import { formatNumberByLocale } from '../../filters.js';
import { eventBusMixin } from '../../mixins/event-bus.js';
import FTokenValue from '@/components/core/FTokenValue/FTokenValue.vue';
import DebtLimitFInfo from '@/components/DebLimitFInfo/DebtLimitFInfo.vue';

export default {
    name: 'DefiDepositNEC',

    components: { DebtLimitFInfo, FTokenValue, FBackButton, FColoredNumberRange, FSlider, FMessage, FCircleProgress },

    mixins: [eventBusMixin],

    data() {
        return {
            /** @type {FMintAccount} */
            fMintAccount: {
                collateral: [],
                debt: [],
            },
            /** @type {DefiToken} */
            wnecToken: {},
            /** @type {DefiToken} */
            nusdToken: {},
            /** @type {DefiToken[]} */
            tokens: [],
            currCollateral: '0',
            message: '',
            tokenPrice: 0,
            increasedCollateral: 0,
            decreasedCollateral: 0,
            label: 'tmp',
            id: getUniqueId(),
        };
    },

    computed: {
        ...mapGetters(['currentAccount', 'defiSlippageReserve']),

        debt() {
            /** @type {FMintTokenBalance} */
            const tokenBalance = this.$defi.getFMintAccountDebt(this.fMintAccount, this.nusdToken);

            return this.$defi.fromTokenValue(tokenBalance.balance, this.nusdToken) || 0;
        },

        collateral() {
            /** @type {FMintTokenBalance} */
            const tokenBalance = this.$defi.getFMintAccountCollateral(this.fMintAccount, this.wnecToken);

            return this.$defi.fromTokenValue(tokenBalance.balance, this.wnecToken) || 0;
        },

        availableNEC() {
            return this.wnecToken ? this.$defi.fromTokenValue(this.wnecToken.availableBalance, this.wnecToken) || 0 : 0;
        },

        maxMintable() {
            return this.$defi.getMaxDebt(this.currCollateral, this.tokenPrice).toFixed(2);
        },

        debtLimit() {
            const collateralNUSD = parseFloat(this.collateral) * this.tokenPrice;
            const currCollateralNUSD = parseFloat(this.currCollateral) * this.tokenPrice - collateralNUSD;

            return this.$defi.getDebtLimit(this.fMintAccount, 0, currCollateralNUSD);
        },

        overallCollateral() {
            return this.$defi.getOverallCollateral(this.fMintAccount);
        },

        overallDebt() {
            return this.$defi.getOverallDebt(this.fMintAccount);
        },

        minCollateral() {
            const collateralNUSD = parseFloat(this.collateral) * this.tokenPrice;
            let minC = 0;

            if (this.tokenPrice > 0) {
                const overallCollateralLeft = this.overallCollateral - this.$defi.getMinCollateral(this.overallDebt, 1);

                minC = collateralNUSD - overallCollateralLeft;
                if (minC < 0) {
                    minC = 0;
                } else {
                    // collateral minus rest in token currency
                    minC = this.collateral - (collateralNUSD - minC) / this.tokenPrice;
                }
            }

            return minC + this.defiSlippageReserve * this._maxCollateral;
        },

        /*
        minCollateral() {
            let minC = 0;

            if (this.tokenPrice > 0) {
                minC = this.$defi.getMinCollateral(this.debt, this.tokenPrice) + (this.debt > 0 ? 1 : 0);
            }

            return Math.min(minC, this.collateral);
        },
*/

        maxCollateral() {
            const maxCollateral = this._maxCollateral;

            return maxCollateral - maxCollateral * this.defiSlippageReserve;
        },

        _maxCollateral() {
            let max = this.collateral + this.availableNEC - 1;

            if (max < 0) {
                max = 0;
            }

            return max;
        },

        inputValue() {
            return this.formatInputValue(this.currCollateral);
        },

        submitDisabled() {
            return parseFloat(this.currCollateral) === parseFloat(this.collateral);
        },

        colors() {
            return this.$defi.getDebtLimitColors();
        },

        wnecTokenSymbol() {
            return this.$defi.getTokenSymbol(this.wnecToken);
        },

        backButtonRoute() {
            const parentNode = getAppParentNode('defi-manage-collateral');

            return parentNode ? parentNode.id : '';
        },

        /**
         * Property is set to `true`, if 'small' breakpoint is reached.
         *
         * @return {Boolean}
         */
        smallView() {
            const breakpoint = this.$store.state.breakpoints['small'];

            return breakpoint && breakpoint.matches;
        },

        /**
         * Property is set to `true`, if 'medium' breakpoint is reached.
         *
         * @return {Boolean}
         */
        mediumView() {
            const breakpoint = this.$store.state.breakpoints['medium'];

            return breakpoint && breakpoint.matches;
        },

        /**
         * Property is set to `true`, if 'large' breakpoint is reached.
         *
         * @return {Boolean}
         */
        largeView() {
            const breakpoint = this.$store.state.breakpoints['large'];

            return breakpoint && breakpoint.matches;
        },
    },

    watch: {
        currCollateral(_value, _oldValue) {
            let cValue;

            // console.log('tf', _value, _oldValue);

            if (_value !== _oldValue) {
                cValue = this.$refs.slider.getCorrectValue(_value);

                if (cValue !== _value && cValue === this.maxCollateral.toString()) {
                    this.currCollateral = cValue;
                    // this.$refs.input.select();
                }

                // const currCollateral = parseFloat(this.currCollateral);
                this.updateMessage();
            }
        },
    },

    created() {
        this.updateMessage();

        this.init();

        this._eventBus.on('account-picked', this.onAccountPicked);
    },

    methods: {
        async init() {
            const { $defi } = this;
            const result = await Promise.all([
                $defi.fetchFMintAccount(this.currentAccount.address),
                $defi.fetchTokens(this.currentAccount.address),
                $defi.init(),
            ]);

            this.fMintAccount = result[0];
            this.tokens = result[1];
            this.wnecToken = this.tokens.find((_item) => _item.symbol === 'WNEC');
            this.nusdToken = this.tokens.find((_item) => _item.symbol === 'NUSD');
            this.tokenPrice = $defi.getTokenPrice(this.wnecToken);
            this.currCollateral = this.collateral.toString();

            this.tmpTokenPrice = this.tokenPrice;
        },

        formatInputValue(_value) {
            return parseFloat(_value).toFixed(this.$defi.getTokenDecimals(this.wnecToken));
        },

        updateMessage() {
            if (this.availableNEC <= 0.01) {
                this.message = `Deposit more ${this.wnecTokenSymbol} to increase your collateral`;
            } else {
                this.message = '';
            }

            this.increasedCollateral = 0;
            this.decreasedCollateral = 0;

            if (this.collateral > 0) {
                const collateralDiff = parseFloat(this.currCollateral) - this.collateral;

                if (collateralDiff > 0) {
                    this.increasedCollateral = collateralDiff;
                    this.message = '';
                } else if (collateralDiff < 0) {
                    this.decreasedCollateral = -collateralDiff;
                    this.message = '';
                }
            }
        },

        updateCurrCollateral() {
            this.currCollateral = this.collateral.toString();
        },

        onSubmit() {
            if (!this.submitDisabled) {
                const tokenBalance = this.$defi.getFMintAccountCollateral(this.fMintAccount, this.wnecToken);

                this.$router.push({
                    name: 'defi-manage-collateral-confirmation',
                    params: {
                        currCollateral: parseFloat(this.currCollateral),
                        collateral: this.collateral,
                        collateralHex: tokenBalance.balance,
                        token: this.wnecToken,
                    },
                });
            }
        },

        onInput(_event) {
            this.currCollateral = this.$refs.slider.getCorrectValue(_event.target.value);
            _event.target.value = this.formatInputValue(this.currCollateral);
        },

        onMinBtnClick() {
            this.currCollateral = this.minCollateral.toString();
        },

        onResetBtnClick() {
            this.updateCurrCollateral();
        },

        onMaxBtnClick() {
            this.currCollateral = this.maxCollateral.toString();
        },

        onAccountPicked() {
            this.init();
        },

        formatNumberByLocale,
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
