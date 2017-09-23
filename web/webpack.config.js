var path = require('path');
var webpack = require('webpack');

const config = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    devtool: 'source-map',
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.vue$/, loader: 'vue-loader'}
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        }
    },
    devServer: {
        contentBase: './build',
        inline: true,
        host: '127.0.0.1',
        port: 8080,
        stats: {
            version: false,
            hash: false,
            chunkModules: false
        }
    }
};

if ( process.env.PRODUCTION ) {
   config.plugins.push(
       new webpack.optimize.UglifyJsPlugin({
           compress: {
               drop_console: true,
           }
       })
   );
}

module.exports = config;
