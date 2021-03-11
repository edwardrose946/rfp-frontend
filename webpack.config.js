const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);

    config.module.rules.push({
        include: [path.join(__dirname, 'node_modules/react-router-native')],
        loader: 'babel-loader',
        test: /\.js$/,
    });

    return config;
};