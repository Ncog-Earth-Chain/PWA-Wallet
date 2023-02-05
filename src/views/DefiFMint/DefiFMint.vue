<template>
    <div class="view-defi-fmint">
        <h1 class="with-back-btn" data-focus>fMint</h1>

        <h2 class="perex">Manage your collateral and minted synths</h2>

        <section class="grid" aria-label="fMint info">
            <div>
                <h2>Collateral</h2>
                <div class="df-data-item smaller">
                    <h3 class="label">
                        <router-link :to="{ name: 'defi-ftrade' }"> Available {{ wnecTokenSymbol }} </router-link>
                        <template v-if="snecToken.address">+ {{ snecTokenSymbol }}</template>
                    </h3>
                    <div class="value">
                        <f-token-value :token="wnecToken" :value="availableWNEC + availableSNEC" no-currency />
                    </div>
                </div>
                <div class="df-data-item smaller">
                    <h3 class="label">
                        Locked {{ wnecTokenSymbol }}
                        <template v-if="snecToken.address"> + {{ snecTokenSymbol }}</template>
                    </h3>
                    <div class="value"><f-token-value :token="wnecToken" :value="collateral" no-currency /></div>
                </div>
                <div class="df-data-item smaller">
                    <h3 class="label">Current {{ wnecTokenSymbol }} price</h3>
                    <div class="value">
                        <f-token-value
                            :value="currentPrice"
                            :content-loaded="!!tokenPrice"
                            :decimals="5"
                            number-currency="USD"
                            no-currency
                        />
                    </div>
                </div>
            </div>
            <div class="limit-col align-center">
                <ratio-info :value="collateralRatio">
                    <template #ratio-info-title>
                        <h2>C-Ratio <c-ratio-info /></h2>
                    </template>
                </ratio-info>
            </div>
            <div class="align-end">
                <h2>Synths</h2>
                <div class="df-data-item smaller">
                    <h3 class="label">Max mintable</h3>
                    <div class="value"><f-token-value :token="nusdToken" :value="maxMintable" /></div>
                </div>
                <div class="df-data-item smaller">
                    <h3 class="label">Minted</h3>
                    <div class="value"><f-token-value :token="nusdToken" :value="debtNUSD" /></div>
                </div>
                <div class="df-data-item smaller">
                    <h3 class="label">Est. Pending / Stashed Rewards</h3>
                    <div class="value">
                        <f-placeholder
                            :content-loaded="!!wnecToken.symbol && 'rewardsEarned' in rewards"
                            replacement-text="999 / 999 wNEC"
                        >
                            <f-token-value
                                no-currency
                                :use-placeholder="false"
                                :token="wnecToken"
                                :value="pendingRewardsWNEC - stashedRewardsWNEC"
                            />
                            <span class="currency-light">
                                /
                                <f-token-value
                                    :use-placeholder="false"
                                    :token="wnecToken"
                                    :value="stashedRewardsWNEC"
                                />
                            </span>
                        </f-placeholder>
                    </div>
                </div>
                <!--
                <div class="df-data-item smaller">
                    <h3 class="label">Liquidation price</h3>
                    <div class="value">{{ liquidationPrice }}</div>
                </div>
                -->
            </div>
            <f-message v-if="closeToLiquidation" type="error" alert class="big">
                You're getting close to your liquidation price. <br />
                Please rebalance your collateral.
            </f-message>
        </section>

        <section class="form-buttons" aria-label="fMint actions">
            <div class="row">
                <div class="col align-start align-center-md">
                    <router-link :to="{ name: 'defi-lock', params: { token: { ...wnecToken } } }" class="btn large">
                        Lock Collateral
                    </router-link>
                    <br />
                    <router-link
                        :to="{ name: 'defi-unlock', params: { token: { ...wnecToken } } }"
                        class="btn large secondary"
                    >
                        Unlock Collateral
                    </router-link>
                </div>
                <div class="col">
                    <!--                    <router-link
                        v-if="canClaimRewards"
                        :to="{
                            name: 'defi-fmint-claim-rewards-confirmation',
                            params: { pendingRewards: pendingRewardsWNEC, token: { ...wnecToken } },
                        }"
                        class="btn large"
                    >
                        Claim Rewards
                    </router-link>
                    <template v-else>
                        <button type="button" class="btn large" disabled>Claim Rewards</button>
                    </template>-->
                    <button
                        type="button"
                        class="btn large"
                        :disabled="!canClaimRewards"
                        @click="onClaimRewardsBtnClick"
                    >
                        Claim Rewards
                    </button>
                    <button
                        type="button"
                        class="btn large secondary"
                        :disabled="!canPushRewards"
                        @click="onPushRewardsBtnClick"
                    >
                        Push Rewards
                    </button>
                </div>
                <div class="col align-end align-center-md">
                    <button v-if="mintableTokens.length === 0" disabled class="btn large">Mint Synths</button>
                    <router-link v-else :to="{ name: 'defi-mint' }" class="btn large">Mint Synths</router-link>
                    <br />
                    <router-link :to="{ name: 'defi-repay' }" class="btn large secondary">Repay Synths</router-link>
                </div>
            </div>
            <!--
            <router-link
                :to="{ name: $defi.tmpWNEC ? 'defi-lock-unlock' : 'defi-manage-collateral' }"
                class="btn large"
            >
                Lock/Unlock {{ wnecTokenSymbol }}
            </router-link>
            <router-link :to="{ name: $defi.tmpWNEC ? 'defi-mint-repay' : 'defi-borrow-nusd' }" class="btn large">
                Mint/Repay nusd
            </router-link>
            -->
        </section>

        <section aria-label="fMint positions">
            <f-tabs>
                <template #fmint-overview>
                    fMint Overview
                    <span class="f-records-count">({{ fMintOverviewRecordsCount }})</span>
                </template>
                <template #collateral-positions>
                    Collateral Positions
                    <span class="f-records-count">({{ collateralPositionsRecordsCount }})</span>
                </template>
                <template #synths-positions>
                    Synths Positions
                    <span class="f-records-count">({{ synthsPositionsRecordsCount }})</span>
                </template>
                <template #assets>
                    Assets
                    <span class="f-records-count">({{ assetsRecordsCount }})</span>
                </template>

                <f-tab title-slot="fmint-overview">
                    <h2 class="not-visible">fMint Overview - {{ fMintOverviewRecordsCount }} items</h2>
                    <f-mint-overview-list
                        :tokens="tokens"
                        deposit-route-name="defi-lock-unlock"
                        borrow-route-name="defi-mint-repay"
                        @records-count="onFMintOverviewRecordsCount"
                    />
                </f-tab>
                <f-tab title-slot="collateral-positions">
                    <h2 class="not-visible">Collateral Positions - {{ collateralPositionsRecordsCount }} items</h2>
                    <collateral-positions-list
                        :tokens="tokens"
                        :f-mint-account="fMintAccount"
                        deposit-route-name="defi-lock-unlock"
                        borrow-route-name="defi-mint-repay"
                        @records-count="onCollateralPositionsRecordsCount"
                    />
                </f-tab>
                <f-tab title-slot="synths-positions">
                    <h2 class="not-visible">Synths Positions - {{ synthsPositionsRecordsCount }} items</h2>
                    <synths-positions-list
                        :tokens="tokens"
                        :f-mint-account="fMintAccount"
                        deposit-route-name="defi-lock-unlock"
                        borrow-route-name="defi-mint-repay"
                        @records-count="onSynthsPositionsRecordsCount"
                    />
                </f-tab>
                <f-tab title-slot="assets">
                    <h2 class="not-visible">Assets- {{ assetsRecordsCount }} items</h2>
                    <assets-list
                        defi-assets-list
                        :tokens="tokens"
                        :f-mint-account="fMintAccount"
                        @records-count="onAssetsRecordsCount"
                    />
                </f-tab>
            </f-tabs>
        </section>

        <tx-confirmation-window
            ref="confirmationWindow"
            body-min-height="350px"
            :steps-count="1"
            :active-step="1"
            :window-title="windowTitle"
            @cancel-button-click="onCancelButtonClick"
        />

        <!--
        <defi-menu v-else>
            <li class="col-4">
                <div class="menu-item disabled">
                    <h2>Manage collateral</h2>
                    <div class="icon">
                        <icon data="@/assets/svg/defi/mint.svg" width="96" height="96" />
                    </div>
                    <p class="description">Lock NEC to use it as collateral and mint nusd</p>
                    <div class="title">Coming Soon</div>
                </div>
            </li>
            <li class="col-4">
                <div class="menu-item" tabindex="0">
                    <h2>Mint</h2>
                    <div class="icon">
                        <icon data="@/assets/svg/defi/mint.svg" width="96" height="96" />
                    </div>
                    <p class="description">Mint nusd by locking your NEC</p>
                    <router-link :to="{ name: 'defi-borrow-nusd' }" class="clickable title">
                        Mint nusd
                    </router-link>
                </div>
            </li>
            <li class="col-4">
                <div class="menu-item disabled" tabindex="0">
                    <h2>Repay</h2>
                    <div class="icon">
                        <icon data="@/assets/svg/defi/repay.svg" width="96" height="96" />
                    </div>
                    <p class="description">Repay the nusd you minted and unlock your NEC</p>
                    <div class="title">Coming Soon</div>
                </div>
            </li>
        </defi-menu>
        -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FMessage from '../../components/core/FMessage/FMessage.vue';
import { getUniqueId } from '../../utils';
import { eventBusMixin } from '../../mixins/event-bus.js';
import FTokenValue from '@/components/core/FTokenValue/FTokenValue.vue';
import FPlaceholder from '@/components/core/FPlaceholder/FPlaceholder.vue';
import RatioInfo from '@/components/RatioInfo/RatioInfo.vue';
import CRatioInfo from '@/components/CRatioInfo/CRatioInfo.vue';
import FMintOverviewList from '@/components/data-tables/FMintOverviewList/FMintOverviewList.vue';
import FTabs from '@/components/core/FTabs/FTabs.vue';
import FTab from '@/components/core/FTabs/FTab.vue';
import CollateralPositionsList from '@/components/data-tables/CollateralPositionsList/CollateralPositionsList.vue';
import SynthsPositionsList from '@/components/data-tables/SynthsPositionsList/SynthsPositionsList.vue';
import AssetsList from '@/components/data-tables/AssetsList/AssetsList.vue';
import TxConfirmationWindow from '@/components/windows/TxConfirmationWindow/TxConfirmationWindow.vue';
import { focusElem } from '@/utils/aria.js';

export default {
    name: 'DefiFMint',

    components: {
        TxConfirmationWindow,
        AssetsList,
        SynthsPositionsList,
        CollateralPositionsList,
        FTab,
        FTabs,
        FMintOverviewList,
        CRatioInfo,
        RatioInfo,
        FPlaceholder,
        FTokenValue,
        FMessage,
    },

    mixins: [eventBusMixin],

    data() {
        return {
            tokenPrice: 0,
            /** @type {FMintAccount} */
            fMintAccount: {
                collateral: [],
                debt: [],
            },
            /** @type {FMintAccount} */
            rewards: {},
            /** @type {DefiToken} */
            wnecToken: {},
            /** @type {DefiToken} */
            snecToken: {},
            /** @type {DefiToken} */
            nusdToken: {},
            /** @type {DefiToken[]} */
            tokens: [],
            /** @type {DefiToken[]} */
            mintableTokens: [],
            fMintOverviewRecordsCount: 0,
            collateralPositionsRecordsCount: 0,
            synthsPositionsRecordsCount: 0,
            assetsRecordsCount: 0,
            windowTitle: '',
            id: getUniqueId(),
        };
    },

    computed: {
        ...mapGetters(['currentAccount', 'defiSlippageReserve']),

        debt() {
            // overall debt
            return this.$defi.fromTokenValue(this.fMintAccount.debtValue, this.nusdToken);
        },

        debtNUSD() {
            return this.tokens.reduce((_prev, _token) => {
                return _prev + this.$defi.convertTokenValue(this.getDebt(_token), _token, this.nusdToken);
            }, 0);
        },

        collateral() {
            /** @type {FMintTokenBalance} */
            const wNECtokenBalance = this.$defi.getFMintAccountCollateral(this.fMintAccount, this.wnecToken);
            /** @type {FMintTokenBalance} */
            const sNECtokenBalance = this.$defi.getFMintAccountCollateral(this.fMintAccount, this.snecToken);
            const wNECtokenBalanceValue = this.$defi.fromTokenValue(wNECtokenBalance.balance, this.wnecToken) || 0;
            const sNECtokenBalanceValue = this.$defi.fromTokenValue(sNECtokenBalance.balance, this.snecToken) || 0;

            return wNECtokenBalanceValue + sNECtokenBalanceValue;
        },

        availableWNEC() {
            return this.wnecToken ? this.$defi.fromTokenValue(this.wnecToken.availableBalance, this.wnecToken) || 0 : 0;
        },

        availableSNEC() {
            return this.snecToken ? this.$defi.fromTokenValue(this.snecToken.availableBalance, this.snecToken) || 0 : 0;
        },

        currentPrice() {
            return this.tokenPrice;
            // return formatNumberByLocale(this.tokenPrice, 5, 'USD');
        },

        pendingRewards() {
            return this.$defi.fromTokenValue(this.rewards.rewardsEarned, this.nusdToken) || 0;
        },

        pendingRewardsWNEC() {
            return this.$defi.fromTokenValue(this.rewards.rewardsEarned, this.wnecToken) || 0;
            // return this.$defi.convertTokenValue(this.pendingRewards, this.nusdToken, this.wnecToken);
        },

        stashedRewards() {
            return this.$defi.fromTokenValue(this.rewards.rewardsStashed, this.nusdToken) || 0;
        },

        stashedRewardsWNEC() {
            return this.$defi.fromTokenValue(this.rewards.rewardsStashed, this.wnecToken) || 0;
            // return this.$defi.convertTokenValue(this.stashedRewards, this.nusdToken, this.wnecToken);
        },

        canClaimRewards() {
            const { rewards } = this;

            return rewards.canClaimRewards && (rewards.rewardsEarned !== '0x0' || rewards.rewardsStashed !== '0x0');
        },

        canPushRewards() {
            return this.rewards.canPushNewRewards;
            // return true;
        },

        liquidationPrice() {
            return '-';
            /*
            const liqPrice = this.$defi.getLiquidationPrice(this.debt, this.collateral);

            return liqPrice > 0 ? formatNumberByLocale(liqPrice, 5, 'USD') : '-';
            */
        },

        availableBalance() {
            return this.wnecToken ? this.$defi.fromTokenValue(this.wnecToken.availableBalance, this.wnecToken) || 0 : 0;
        },

        maxMintable() {
            const borrowLimit = this.$defi.getBorrowLimit(this.fMintAccount);

            return this.debtNUSD + borrowLimit - borrowLimit * this.defiSlippageReserve;
            /*
            return (
                this.debtNUSD +
                Math.min(
                    this.availableBalance * this.tokenPrice,
                    this.$defi.getBorrowLimit(this.fMintAccount) / this.tokenPrice
                )
            );
            */
            // return this.$defi.getMaxDebt(this.collateral, this.tokenPrice).toFixed(2);
        },

        debtLimit() {
            return this.$defi.getDebtLimit(this.fMintAccount);
        },

        collateralRatio() {
            return this.$defi.getCollateralRatio(this.fMintAccount);
        },

        closeToLiquidation() {
            return false;
            /*
            const { $defi } = this;

            return this.debtLimit > ($defi.warningCollateralRatio / $defi.minCollateralRatio) * 100;
            */
        },

        wnecTokenSymbol() {
            return this.$defi.getTokenSymbol(this.wnecToken);
        },

        snecTokenSymbol() {
            return this.$defi.getTokenSymbol(this.snecToken);
        },

        /**
         * Property is set to `true`, if 'small' breakpoint is reached.
         *
         * @return {Boolean}
         */
        /*
        smallView() {
            const breakpoint = this.$store.state.breakpoints['small'];

            return breakpoint && breakpoint.matches;
        },
        */
    },

    created() {
        this._eventBus.on('account-picked', this.onAccountPicked);
        this._eventBus.on('claim-mint-rewards', this.onClaimMintRewards);

        this.init();
    },

    mounted() {
        focusElem(this.$el);
    },

    methods: {
        async init() {
            const { $defi } = this;
            const { address } = this.currentAccount;
            const result = await Promise.all([
                $defi.fetchFMintAccount(address, true),
                $defi.fetchTokens(address),
                $defi.init(),
            ]);

            this.fMintAccount = result[0];
            this.tokens = result[1];
            this.nusdToken = this.tokens.find((_item) => _item.symbol === 'NUSD') || {};
            this.wnecToken = this.tokens.find((_item) => _item.symbol === 'WNEC') || {};
            this.snecToken = this.tokens.find((_item) => _item.symbol === 'SNEC') || {};

            // this.tokenPrice = $defi.getTokenPrice(this.wnecToken);
            this.tokenPrice = await this.$fWallet.getTokenPrice();

            this.mintableTokens = this.tokens.filter($defi.canTokenBeMinted);

            this.rewards = await $defi.fetchFMintAccountRewards(address);
        },

        /**
         * @param {DefiToken} _token
         * @return {number}
         */
        getDebt(_token) {
            /** @type {FMintTokenBalance} */
            const tokenBalance = this.$defi.getFMintAccountDebt(this.fMintAccount, _token);

            return this.$defi.fromTokenValue(tokenBalance.balance, _token) || 0;
        },

        onAccountPicked() {
            this.init();
        },

        onFMintOverviewRecordsCount(_count) {
            this.fMintOverviewRecordsCount = _count;
        },

        onCollateralPositionsRecordsCount(_count) {
            this.collateralPositionsRecordsCount = _count;
        },

        onSynthsPositionsRecordsCount(_count) {
            this.synthsPositionsRecordsCount = _count;
        },

        onAssetsRecordsCount(_count) {
            this.assetsRecordsCount = _count;
        },

        onClaimMintRewards(_data) {
            if (this.canClaimRewards) {
                this.windowTitle = 'Claim Rewards';
                this.$refs.confirmationWindow.changeComponent('defi-f-mint-claim-rewards-confirmation', {
                    params: _data,
                });
                this.$refs.confirmationWindow.show();
            }
        },

        onClaimRewardsBtnClick() {
            if (this.canClaimRewards) {
                this.windowTitle = 'Claim Rewards';
                this.$refs.confirmationWindow.changeComponent('defi-f-mint-claim-rewards-confirmation', {
                    params: { pendingRewards: this.pendingRewardsWNEC, token: { ...this.wnecToken } },
                });
                this.$refs.confirmationWindow.show();
            }
        },

        onPushRewardsBtnClick() {
            if (this.canPushRewards) {
                this.windowTitle = 'Push Rewards';
                this.$refs.confirmationWindow.changeComponent('defi-f-mint-push-rewards-confirmation', {
                    params: { token: { ...this.wnecToken } },
                });
                this.$refs.confirmationWindow.show();
            }
        },

        onCancelButtonClick() {
            this.$emit('reload-view');
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
