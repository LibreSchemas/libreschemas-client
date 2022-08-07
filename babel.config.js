module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "safe": true
      }],
      'react-native-paper/babel',
      'react-native-reanimated/plugin'
    ],
  };
};
