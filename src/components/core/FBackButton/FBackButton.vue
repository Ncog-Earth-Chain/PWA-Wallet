<template>
    <span class="f-back-button" @click="onClick">
        <slot>
            <button class="btn light large same-size round" title="Back" aria-label="Go to previous page">
                <icon data="@/assets/svg/arrow-left.svg" aria-hidden="true" class="rtl-mirror c-green" />
            </button>
        </slot>
    </span>
</template>

<script>
export default {
    name: 'FBackButton',

    props: {
        routeName: {
            type: String,
            default: '',
        },
        params: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    methods: {
        onClick() {
            this.goBack();
        },

        goBack() {
            if (this.routeName) {
                this.$router.replace({ name: this.routeName, params: this.params });
            }
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
