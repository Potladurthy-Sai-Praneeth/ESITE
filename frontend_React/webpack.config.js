const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src", "index.jsx"),
    output: {
        filename: "bundle.js",
        chunkFilename: "[name].bundle.js?h=[chunkhash]",
        publicPath: "/",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        fallback: {
            assert: require.resolve("assert"),
            crypto: require.resolve("crypto-browserify"),
            http: require.resolve("stream-http"),
            https: require.resolve("https-browserify"),
            os: require.resolve("os-browserify/browser"),
            buffer: require.resolve("buffer"),
            stream: require.resolve("stream-browserify"),
        },
    },
    watch: true,
    devServer: {
        port: 4400,
        historyApiFallback: true,
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: ["@babel/transform-runtime"],
                },
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
            filename: "index.html",
        }),
    ],
};