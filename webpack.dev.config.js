module.exports = {
    entry: [
		'./src/index.js',
		'webpack-dev-server/client?http://0.0.0.0:6001',
	],

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {
		hot: true,
		proxy: {
			"**": "http://0.0.0.0:6000"
		},
		disableHostCheck: true,
        contentBase: __dirname + '/public/',
        historyApiFallback: true
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};
