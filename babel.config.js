module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'react-native-reanimated/plugin',
            [
                'module-resolver',
                {
                    root: ['.'],
                    alias: {
                        '@': './src',
                    },
                    extensions: ['.js', '.ts', '.tsx', '.ios.js', '.android.js'],
                },
            ],
        ],
    };
};
