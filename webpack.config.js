const { VuetifyPlugin } = require("webpack-plugin-vuetify");

module.exports = {
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    // make sure to include the plugin!
    new VuetifyPlugin({ autoImport: true }),
  ],
};
