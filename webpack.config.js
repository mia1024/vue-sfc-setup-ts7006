const HtmlWebpackPlugin = require("html-webpack-plugin");
const {VueLoaderPlugin} = require("vue-loader");
const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
require("@vue/compiler-sfc")

module.exports = {
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            "vue": "vue/dist/vue.runtime.esm-bundler.js",
            // "vue":"vue/dist/vue.esm-bundler.js",
            "@": path.resolve(__dirname, "src"),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(woff|ttf|png|svg|jpg|jpeg)/i,
                type: 'asset'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        },
                    }
                ]
            },
            {
                test: /\.css$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    devtool: "source-map",
    entry: [
        path.resolve(__dirname, "src/index.ts")
    ],
    stats: {
        errorDetails: true,
        orphanModules: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            inject: true,
            template: "src/index.html",
            base: "/",
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            }
        }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            "__VUE_PROD_DEVTOOLS__": true,
            "__VUE_OPTIONS_API__": true
        }),
        new MiniCssExtractPlugin()
    ],
    devServer: {
        client: {
            logging: "none"
        },
        historyApiFallback: true,
    },
    performance: {
        maxEntrypointSize: 1024 ** 3, // 1MB
        maxAssetSize: 1024 ** 3
    },
    mode: "development"
}
