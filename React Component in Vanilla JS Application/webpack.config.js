var path = require('path');

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, "./src/index.ts"),
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ ".ts", ".js", ".tsx"],
    },
    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "public", "static", "bundle"),
    }
};