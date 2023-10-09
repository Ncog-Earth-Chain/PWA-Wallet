<template>
    <div class="view-home vertical-layout">

        <main class="main">
            <div class="logo-section">
                <img src="/ncog_logo.svg" />
            </div>
            <div class="head-section">
                <router-view></router-view>
            </div>
        </main>

        <Footer />
    </div>
</template>

<script>
import Footer from '../../components/Footer/Footer.vue';

export default {
    components: {
        Footer,
        
    }
};
</script>

<style lang="scss">
@import 'style';
</style>
