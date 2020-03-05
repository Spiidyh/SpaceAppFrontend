const {override, fixBabelImports, addLessLoader} = require('customize-cra');


module.exports = override(
    config = fixBabelImports('import', {
        libraryName: 'antd', libraryDirectory: "es", style: true}),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            "@layout-body-background": "#282c34",
            "@layout-header-background": "#282c34",
            "@layout-footer-background": "#282c34",
            "@layout-color": "white"
        },
    }));

