import 'dotenv/config';

export default {
    android: {
        adaptiveIcon: {
            backgroundColor: '#FFFFFF',
            foregroundImage: './assets/adaptive-icon.png'
        },
        config: {
            googleMaps: {
                apiKey: process.env.ANDRIOD_GOOGLE_API_KEY
            }
        },
        package: 'com.rosefamilyproperties.rfp'
    },
    assetBundlePatterns: [
        '**/*'
    ],
    extra: {
        APOLLO_URI: process.env.APOLLO_URI,
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
    },
    hooks: {
     postPublish: [
         {
             config: {
                 authToken: process.env.SENTRY_AUTH_TOKEN,
                 organization: 'edward-rose',
                 project: 'edward-rose'
             },
             file: 'sentry-expo/upload-sourcemaps'
         }
     ]
    },

    icon: 'assets/rfp-logo-square.png',
    ios: {
        supportsTablet: true
    },
    name: 'RFP',
    orientation: 'portrait',
    slug: 'RFP',
    splash: {
        backgroundColor: '#ffffff',
        image: './assets/splash.png',
        resizeMode: 'contain'
    },
    updates: {
        fallbackToCacheTimeout: 0
    },
    version: '1.0.0',
    web: {
        favicon: './assets/favicon.png'
    }
};
