const { override, fixBabelImports, addLessLoader, addWebpackAlias, addWebpackModuleRule } = require('customize-cra');
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addLessLoader({
    modifyVars: {},
    javascriptEnabled: true
  }),
  addWebpackAlias({
    "@": resolve("src")
  })
);
