//
const appConfig = {
    // app title
    name: 'NCOG Earth Chain Wallet',
    // app description
    description: 'NCOG Earth Chain Wallet',
    // app keywords
    keywords: 'ncogearthchain, ncogchain, wallet',
    // apollo client settings
    apollo: {
        // list of providers. if one of them is unavailable, another is randomly picked
        providers: [
            {
                http: 'https://xapi-test.ncogchain.earth/',
                // for subscriptions
                ws: '',
            },
        ],
        // index into providers array of default provider or 'random' - takes index randomly
        defaultProviderIndex: 'random',
    },
    // Ncogearthchain chain id
    chainId: '0x9e0',
    // JSON-RPC endpoint
    rpc: 'https://api-test.ncogchain.earth/',
    // used in links pointing to ncogearthchain explorer
    explorerUrl: 'https://explorer-test.ncogchain.earth/',
    // used in links pointing to validators
    explorerUrl2: 'https://explorer-test.ncogchain.earth/',
    // used in links pointing to ncogearthchain explorer's transaction detail
    explorerTransactionPath: 'tx',
    // used in links pointing to ethereum explorer
    ethereumExplorerUrl: 'https://etherscan.io/',
    // used in links pointing to binance explorer
    binanceExplorerUrl: 'https://bscscan.com/',
    // BNBridge api config
    bnbridgeApi: {
        // url of api point
        url: 'https://api.bnbridge.exchange/api/v1',
        // auth token
        token: '',
        // use Ethereum chain
        useETH: false,
        // use Binance chain
        useBNB: false,
        // minimal amount of NEC to ETH transfer
        minNECToTransfer: 50,
    },
    disableFLend: true,
    //
    useTestnet: false,
    // testnet config
    testnet: {
        // list of providers. if one of them is unavailable, another is randomly picked
        providers: [
            {
                http: 'https://xapi-test.ncogchain.earth/',
                // for subscriptions
                ws: '',
            },
        ],
        // JSON-RPC endpoint
        rpc: 'https://api-test.ncogchain.earth/',
        // used in links pointing to ncogearthchain explorer
        explorerUrl: 'https://explorer-test.ncogchain.earth/',
        // used in links pointing to validators
        explorerUrl2: 'https://explorer-test.ncogchain.earth/',
        // used in links pointing to ncogearthchain explorer's transaction detail
        explorerTransactionPath: 'transactions',
        // chain id for testnet
        chainId: '0x9af',
    },
    // progressive web application
    usePWA: true,
    // pwa settings
    pwa: {
        // name used in pwa manifest
        name: 'NCOG Earth Chain Wallet',
        categories: ['finance'],
    },
    // determines if app is chrome extension
    isChromeExtension: !!process.env.VUE_APP_IS_CHROME_EXTENSION,
    // chrome extension settings
    chromeExtension: {
        // chrome extension version - increase version number, if you want to publish in the chrome web store
        version: '0.0.1',
        // chrome extension name
        name: 'NCOG Earth Chain Wallet',
        // chrome extension description
        description: 'NCOG Earth Chain Wallet',
        // output directory for application
        outputDir: 'chrome-extension/dist',
        // output directory for application (relative to outputDir)
        outputDirApp: 'app',
        // output directory for background js bundle script (relative to outputDir)
        outputDirBackgroundJs: 'background-js',
        // show extension prompts in new tab, instead of popup window
        tabNotPopup: false,
    },
    // default options for production build
    build: {
        // output dir for production build
        outputDir: 'dist',
    },
    // app settings
    settings: {
        // list of available currencies displayed in settings view ( https://en.wikipedia.org/wiki/ISO_4217 )
        currencies: ['USD', 'EUR'],
        // defi slippage reserve in percentage
        defaultDefiSlippageReserve: 0.3,
        // default funiswap slippage tolerance in percentage
        defaultFUniswapSlippageTolerance: 0.5,
        // funiswap provider fee (0.3%)
        fUniswapLiquidityProviderFee: 0.003,
        // success transaction message will automatically continue to the next step after this number of ms
        autoContinueToAfter: 2000,
    },
};

appConfig.mainnet = {
    chainId: appConfig.chainId,
    rpc: appConfig.rpc,
    explorerUrl: appConfig.explorerUrl,
    explorerUrl2: appConfig.explorerUrl2,
};

if (appConfig.useTestnet) {
    appConfig.apollo.providers = appConfig.testnet.providers;
    appConfig.explorerUrl = appConfig.testnet.explorerUrl;
    appConfig.explorerUrl2 = appConfig.testnet.explorerUrl2;
    appConfig.explorerTransactionPath = appConfig.testnet.explorerTransactionPath;
    appConfig.rpc = appConfig.testnet.rpc;
    appConfig.chainId = appConfig.testnet.chainId;
}

//
if (appConfig.isChromeExtension) {
    appConfig.usePWA = false;

    appConfig.build = {
        ...{
            // output dir for production build
            outputDir: `${appConfig.chromeExtension.outputDir}/${appConfig.chromeExtension.outputDirApp}`,
        },
    };
}

// scss variables prepended to every scss file
appConfig.scssData = `
    // @import "src/assets/scss/vars";

    $IS_CHROME_EXTENSION: ${appConfig.isChromeExtension ? 'true' : 'false'};
`;

module.exports = appConfig;
