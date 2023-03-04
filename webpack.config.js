module.exports = {
    entry: {
        index: './src/index.js'
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.js$/,
            use:['babel-loader']
        }]
    },
    output: {
        filename: '[name].min.js'
    }
}