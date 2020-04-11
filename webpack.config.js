const path = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        library: 'flappysonic-client',
        libraryTarget: 'umd',
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js'],
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
    // Define createjs as an external dependency
    externals: {
        createjs: 'createjs',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'eslint-loader',
                },
            },
        ],
    },
    mode: 'production',
}
