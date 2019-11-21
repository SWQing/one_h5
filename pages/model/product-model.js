const util = require('../../utils/util.js')
/******************************************/
/**
 * 根据id获取产品详情
 * url /xxx
 * 参数 productId
 * 返回 product
 */
function getProduct(data, callback) {
	util.get('/order/product/detail', data, res => {
		return callback(res)
	})
}
/**
 * 获取用户信息
 */
function getUserInfo(data, callback) {
	util.get('/order/member/profile', data, res => {
		return callback(res)
	})
}
/**
 * 创建订单
 */
function createOrder(data, callback) {
	util.post('/order/order/create', data, res => {
		return callback(res)
	})
}
/**
 * 下单支付
 */
function payfor(data, callback) {
	util.post('/order/order/getParameterMap', data, res => {
		return callback(res)
	})
}
/**
 * 获取微信js配置数据
 */
function jsConfig(data, callback) {
	util.get('/common/getJSCfg', data, res => {
		return callback(res)
	})
}
/**
 * 获取顾问列表
 */
function getList(data, callback) {
	util.get('/order/member/counselor', data, res => {
		return callback(res)
	})
}

/******************未用到的请求***********************/
/**************判断是否有已完成的等级任务************************/
function hasFinishTask(data, callback) {
	util.post('/rankTask/hasFinishTask', data, res => {
		return callback(res)
	})
}
module.exports = {
	getProduct, getUserInfo, createOrder, payfor, jsConfig, getList
}
