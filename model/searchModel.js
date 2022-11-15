class SearchModel {
	static handleUpdatePlaceholderText(instance) {
		const arr = ['APP · 微信小程序', 'Java · SprinBoot', 'SpringCloud · SpringSecurity', 'Vue · React']
		let i = 0;
		SearchModel.handleSetPlaceholderText(instance, arr[i])
		setInterval(() => {
			i = i < 3 ? ++i : 0
			SearchModel.handleSetPlaceholderText(instance, arr[i])
		}, 3000)
	}
	static handleSetPlaceholderText(instance, data) {
		const webview = instance.$scope.$getAppWebview();
		webview.setStyle({
			"titleNView": {
				"searchInput": {
					"placeholder": data
				}
			}
		})
	}
}

export default SearchModel
