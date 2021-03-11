import 'dotenv/config';

export default {
    name: 'front-end',
    slug: 'front-end',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
        backgroundColor: '#ffffff',
        image: './assets/splash.png',
        resizeMode: 'contain'
    },
    updates: {
        fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
        '**/*'
    ],
    ios: {
        supportsTablet: true
    },
    android: {
        adaptiveIcon: {
            backgroundColor: '#FFFFFF',
            foregroundImage: './assets/adaptive-icon.png'
        }
    },
    web: {
        favicon: './assets/favicon.png'
    },
    extra: {
        APOLLO_URI: process.env.APOLLO_URI,
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
    }
};
