module.exports = {
	devServer: {
		proxy: {
			'^/ipp': {
				pathRewrite: {
					'^/ipp': '/'
				},
				target: 'http://192.168.1.185:631',
				changeOrigin: true
			}
		}
	 }
}