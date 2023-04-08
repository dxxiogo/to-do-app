module.exports = {
    entry: {
        index: './src/index.js'
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.js$/,
            use:['babel-loader']
        }, 
        {
            test: /\.css/,
            use:['style-loader', 'css-loader']
        }
    ]
    },
    output: {
        filename: '[name].min.js'
    }
}