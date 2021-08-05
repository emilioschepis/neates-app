module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          allowlist: [
            "LOCAL_FIREBASE_API_KEY",
            "LOCAL_FIREBASE_AUTH_DOMAIN",
            "LOCAL_FIREBASE_PROJECT_ID",
            "LOCAL_GRAPHQL_ENDPOINT",
            "PROD_FIREBASE_API_KEY",
            "PROD_FIREBASE_AUTH_DOMAIN",
            "PROD_FIREBASE_PROJECT_ID",
            "PROD_GRAPHQL_ENDPOINT",
          ],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
