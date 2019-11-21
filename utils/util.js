// 获取url参数
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}

// var rootDocment = `https://${location.host}/wechat/`
var rootDocment = ''
if(location.href.includes('oneone.oneonelife')) {
	rootDocment = 'https://oneone.oneonelife.com/wechat/';
} else {
	rootDocment = 'https://wenxi.51vip.biz/wechat';
}
function post(url, data, cb) {
	wx.request({
		url: rootDocment + url,
		data: data,
		method: 'post',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		success: function(res) {
			return typeof cb == "function" && cb(res.data)
		},
		fail: function(res) {
			console.log(res)
			if (res.errMsg == 'request:fail timeout') {
				wx.showToast({
					title: '请求超时！',
					icon: 'none'
				})
			} else if (res.errMsg == 'request:fail ') {
				wx.showToast({
					title: '请求地址出错！',
					icon: 'none'
				})
			}
		}
	})
}

function get(url, data, cb) {
	wx.request({
		url: rootDocment + url,
		data: data,
		method: 'get',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		success: function(res) {
			return typeof cb == "function" && cb(res.data)
		},
		fail: function() {
			return typeof cb == "function" && cb(false)
		}
	})
}

module.exports = {
	post: post,
	get: get,
	rootDocment: rootDocment,
	getQueryVariable: getQueryVariable
}
