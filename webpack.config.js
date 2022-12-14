const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'mf-todo',
    projectName: 'items',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: ['@mf-app/utility'],

    // modify the webpack config however you'd like to by adding to this object
  });
};
