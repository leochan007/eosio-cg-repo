const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const voca = require('voca')

//const VueConf = require('./src/assets/js/libs/vue_config_class')
//const vueConf = new VueConf(process.argv)

console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
console.log('process.env.TESTNET:', process.env.TESTNET)

let process_env = {};
let optimization = {};

if (process.env.NODE_ENV === 'development') {
  if (process.env.TESTNET === "testnet" || process.env.TESTNET === "testnet_stg") {
    process_env = require('./config/testnet-dev.env');
  } else {
    process_env = require('./config/dev.env');
  }
} else if (process.env.NODE_ENV === 'production') {
  optimization = {
    splitChunks: {
      chunks: "all",
      minSize: 10000,
      maxSize: 200000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3
    }
  };
  if (process.env.TESTNET === "testnet" || process.env.TESTNET === "testnet_stg") {
    process_env = require('./config/testnet.env');
  } else {
    process_env = require('./config/prod.env');
  }
}

console.log('process_env:', process_env)

const plugins = [
  new webpack.DefinePlugin({
    'process.env': process_env
  }),
  new CopyWebpackPlugin([{
    //from: path.resolve(__dirname, './public/'),
    from: './public/',
    to: 'assets',
    ignore: ['index.html', '.DS_Store']
  }])
];

const build_str = 'building for production ' + (!voca.isBlank(process.env.TESTNET) ? '(' + process.env.TESTNET + ')' : '') + '...';

console.log(build_str);

module.exports = {
  publicPath: './', //vueConf.baseUrl, // 根域上下文目录
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: ['vuex-persist'], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  css: { // 配置高于chainWebpack中关于css loader的配置
    // modules: true, // 是否开启支持‘foo.module.css’样式
    // extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    sourceMap: false, // 是否在构建样式地图，false将提高构建速度
    loaderOptions: { // css预设器配置项
      sass: {
        data: '' //`@import "@/assets/scss/mixin.scss";`
      }
    }
  },
  /*pages: {
    index: {
      // page 的入口
      entry: 'src/main.ts',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'AlphaCar Credit Inquiry Services',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    //subpage: 'src/subpage/main.js'
  },*/
  configureWebpack: {
    plugins: plugins,
    performance: {
      hints: false
    },
    optimization: optimization,
  },
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  pluginOptions: {},
  pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  },
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/': {
        target: 'http://kylin.fn.eosbixin.com',
        ws: false,
        changOrigin: true
      },
    },
    //before: app => {}
  },
}
