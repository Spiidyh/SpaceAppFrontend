const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = rewireLess.withLoaderOptions({
      modifyVars: {
          "@layout-body-background": "#282c34",
          "@layout-header-background": "#282c34",
          "@layout-footer-background": "#282c34",
          "@layout-color": "white"
      },
      javascriptEnabled: true
    })(config, env);
    return config;
};