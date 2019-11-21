<template>
	<view class="container home-container">
		<form>
			<view class="order_box" :style='{height: contentH + "px"}'>
				<!-- 产品信息 -->
				<view class="order_info">
					<image class="order_product_img" :src="product.img" mode="aspectFill"></image>
					<view class='order_product_info'>
						<view class="order_product_title">{{product.name}}</view>
						<view class="order_product_counts">
							<view class="left_icon"></view>
							<input disabled @input='changeCountsInput' class="counts" type="number" confirm-type='done' :value="pCount"
							 @blur='inputBlur'></input>
							<view class="right_icon"></view>
							<view class="left_icon_wrap" @tap="changeCounts('cut')"></view>
							<view class="right_icon_wrap" @tap="changeCounts('add')"></view>
						</view>
						<view class="clear"></view>
						<view class="order_product_price" v-if="!isPointsCommodity"><text class='oldPrice' v-if="originalPrice">￥{{originalPrice}}</text>￥{{price}}</view>
						<view class="order_product_price" v-else>{{price}} ONE币</view>
						<view class='order_product_stock'>
						</view>
					</view>
				</view>
				<block v-if="skus.length > 0">
					<view class='specification'>
						<block v-for="(item, index) in skus" :key="index">
							<view class='line'>
								<view class='title'>{{item.name}}:</view>
								<view class='options'>
									<block v-for="(option, idx) in item.entries" :key="idx">
										<view v-if="option.hasStock == false" class="item" style='color: #ccc;'>{{option.value}}</view>
										<view v-else @tap.stop='changeSkus(idx, index, option.id)' class="item" :class="{selected: option.selected, locked: option.locked}">{{option.value}}</view>
									</block>
								</view>
							</view>
						</block>
					</view>
				</block>
				<!-- ONE币抵扣 -->
				<view class="order-point" v-if="!isPointsCommodity && !isVirtualCommodity && !isVip">
					<view class="order_flex">
						<view class="order_one_box">
							<text class="one_text">可用</text>
							<text>{{available_one_coin}}</text>
							<text class="one_text">ONE币,可抵</text>
							<text>{{deductible_amount}}</text>
							<text class="one_text">元</text>
						</view>
						<view class="logistics-skip">
							<switch class="switch-box" @change="switchChange" color="#04BE02" />
						</view>
					</view>
				</view>
				<view class='order-point' v-else v-show="!isVirtualCommodity">
					<view class="order_flex">
						<view class="order_one_box">
							<text class="one_text">可用</text>
							<text>{{available_one_coin}}</text>
							<text class="one_text">ONE币</text>
						</view>
					</view>
				</view>
				<block v-if="use_point">
					<view class="order-point">
						<view class="integral-box">
							<view class="deductible-drawer">
								<view>抵扣：</view>
								<view class="deductible-text">{{'￥' + actual_deductible_amount}}</view>
							</view>
							<view class="input-drawer">
								<input class="integral-input" @input="integralInput" type="number" :value='userIntegral'></input>
								<view class="use-btn" @tap="userIntegralTap">使用</view>
							</view>
						</view>
					</view>
				</block>
				<!-- 地址 -->
				<view class="order_address">
					<!-- 选择方式 -->
					<!-- <view class='sendType'>
						<view class='typeBox'>
							<text style='color: #fff;'>到店自取</text>
							<view class='typeBg' style='left: 0; width: 100%;'></view>
						</view>
					</view> -->
					<view class='storeInfo'>
						<view class='store-title'>信息</view>
						<view class='store-content'>
							<view class='myName'><text>姓名：</text><input type='text' data-type="infoName" :value="infoName" @input="getInfoInput" placeholder="请输入姓名" placeholder-class="placeholder" ></input></view>
							<view class='myName'><text>电话：</text><input type='number' data-type="infoPhone" :value="infoPhone" @input="getInfoInput" placeholder="请输入电话" placeholder-class="placeholder" ></input></view>
							<view class='myName'><text>备注：</text><input type='text' data-type="infoTip" :value="infoTip" @input="getInfoInput" placeholder="请输入备注(微信号)" placeholder-class="placeholder"></input></view>
						</view>
					</view>
				</view>
				<!-- 备注 -->
				<!-- <view class="order_dec">
					<view class="order_dec_title">备注</view>
					<view class="order_dec_content memo_content">
						{{contentVal.length > 0 ? contentVal : '有什么想嘱咐仓库小哥的？'}}
					</view>
				</view> -->

			</view>
			<button class="order_pay" hover-class='order_pay_hover' @tap="payforTip" v-if="!isPointsCommodity && use_point">微信支付￥{{allPrice}}元
				+ {{userIntegral}} ONE币（{{pCount}}件）</button>
			<button class="order_pay" hover-class='order_pay_hover' @tap="payforTip" v-else-if="!isPointsCommodity && !use_point">微信支付￥{{price_presell}}元（{{pCount}}件）</button>
			<button class="order_pay oneBtn" hover-class='order_pay_hover' @tap="payforTip" v-else-if="available_one_coin >= price">支付</button>
			<block v-else>
				<button class="order_pay oneBtn" hover-class='order_pay_hover' disabled>ONE币不足，无法购买</button>
			</block>
		</form>
	</view>
</template>

<script>
	import wexinPay from '../../utils/wxPay.js'
	const util = require('../../utils/util.js')
	const productModel = require('../model/product-model')
	let disableStockArr = [];//不能点击的
	// 获取选择的id数组
	let selectIds = []
	let arrB = []
	export default {
		data() {
			return {
				loadingHidden: true,
				product: [],
				pCount: 1,
				// 规格功能所需数据
				productData: [],
				productId: '', // 产品id
				spItems: [], // 规格数据
				skuIds: [], // skuIds
				price: 0,
				stock: 0,
				presell: 0,
				productSkuId: '',
				one_coin: 0, // 已有ONE币
				vipPoint: 0, //vip one币
				available_one_coin: 0, // 可用ONE币
				deductible_amount: 0, // 抵扣金额
				actual_deductible_amount: 0, // 实际抵扣金额
				rmb_point_proportion: 125, // 抵扣比例， rmb ： point
				use_point: false, // 使用积分
				userIntegral: 0, // 输入框积分
				contentVal: '', // 备注
				isPointsCommodity: false,
				allPrice: 0,
				oneReduce: true,
				oldPrice: 0, //产品原价（未打折）
				storeInfo: null, //门店信息
				storeId: '',
				storeName: '',
				isVip: false,
				skus: [], //动态修改的规格数组
				infoName: '',
				infoPhone: '',
				infoTip: ''
			}
		},
		onLoad: function(option) {
			console.log(option);
			const that = this;
			uni.getSystemInfo({
				success: res => {
					let ww = res.windowWidth;
					let wh = res.windowHeight;
					that.contentH = wh - ww / 750
				}
			})
			var id = option.id; // 商品携带的参数(顾问id/话题id/产品id)
			var arr = id.split("/");
			that.id = id;
			that.share_user_id = option.share_user_id || '';
			that.counselorId = arr[0];
			that.topicId = arr[1];
			that.productId = arr[2];
			that.storeId = option.storeId || '';
			that.storeName = option.storeName || '';
			// console.log(option)
			that.openId = localStorage.getItem('openId')
			that._loadData();
		},
		onShow: function() {
			console.log('show----------')
			var that = this;
			that.storeInfo = uni.getStorageSync('storeInfo')
			// 获取变更的数据
			productModel.getUserInfo({openId: this.openId}, (data) => {
				console.log("userInfo", data);
				that.one_coin = data.resultContent.info.points
				that.vipPoint = data.resultContent.info.vipPoints
				that.rebate = data.resultContent.info.rebate
				if (that.oneReduce) {
					setTimeout(() => {
						that.price = (that.price * data.resultContent.info.rebate).toFixed(2)
						that.price_presell = (that.price * data.resultContent.info.rebate).toFixed(2)
						that.oneReduce = false
						that.calculateONE();
					}, 200)
				}

				that.calculateONE();
			});
		},
		onUnload() {
			disableStockArr = []; //不能点击的
			// 获取选择的id数组
			selectIds = []
			arrB = []
		},
		methods: {
			//确认
			confirm: function() {
				this.contentVal = this.textareaVal
			},
			textareaInput: function(e) {
				this.textareaVal = e.detail.value
			},
			/*加载所有数据*/
			_loadData: function(callback) {
				var that = this;
				console.log(that.productId)
				// 读取缓存中的商品信息
				var productInfo = uni.getStorageSync("productInfo");
				if (productInfo) {
					var data = productInfo;
					console.log(data)
					if (data.spItems) {
						data.spItems.forEach(item => {
							item.entries.forEach(itemTwo => {
								itemTwo.selected = false
								if (data.spItems.length == 1) {
									itemTwo.hasStock = false
									if (data.productData[itemTwo.id.toString()]) {
										itemTwo.hasStock = true
									}
								}
							})
						})
					}
					that.product = that._setGoods(data.goods) // 商品基本信息
					that.spItems = data.spItems // 全部规格数组
					that.skus = data.spItems
					that.skuIds = data.specificationValueIds // 默认规格标识的组合
					that.productData = data.productData // 库存、价格数据（key:规格标识组合,value:某个商品规格数据）
					that.productSkuId = data.defaultProductSku.id // 默认productSkuId
					that.price = data.defaultProductSku.price // 产品价格
					that.oldPrice = data.defaultProductSku.price // 产品价格
					that.stock = data.defaultProductSku.stock // 产品库存数量
					that.price_presell = data.defaultProductSku.price
					that.presell = data.defaultProductSku.presellQuantity //预售量
					that.isPointsCommodity = data.goods.isPointsCommodity
					that.isVirtualCommodity = data.goods.isVirtualCommodity
					that.isVip = data.goods.isVip
					that.originalPrice = data.goods.originalPrice
				} else {
					// 访问数据库获取最新的商品信息
					var json = {
						productId: that.productId,
						fromMemberId: '',
						openId: that.openId
					}
					productModel.getProduct(json, (data) => {
						console.log(data);
						if (data.spItems) {
							data.spItems.forEach(item => {
								item.entries.forEach(itemTwo => {
									itemTwo.selected = false
									if (data.spItems.length == 1) {
										itemTwo.hasStock = false
										if (data.productData[itemTwo.id.toString()]) {
											itemTwo.hasStock = true
										}
									}
								})
							})
						}
						console.log(data.spItems)
						that.product = that._setGoods(data.goods)
						that.spItems = data.spItems // sku集合
						that.skus = data.spItems
						that.skuIds = data.specificationValueIds // 默认sku数组
						that.productData = data.productData // 库存、价格数据
						that.productSkuId = data.defaultProductSku.id // 默认productSkuId
						that.price = data.defaultProductSku.price // 产品价格
						that.stock = data.defaultProductSku.stock // 产品库存数量
						that.presell = data.defaultProductSku.presellQuantity //预售量
					});
				}
			},
			getChangeData: function() {
				var that = this;

				// 获取默认收货地址
				address.getAddress((data) => {
					that.address = data.address
				});
			},
			// 选择配送方式
			selectType(e) {
				this.activeType = e.currentTarget.dataset.type
			},

			/********************************逻辑业务***********************************/
			// 获取配送信息
			getInfoInput(e) {
				this[e.currentTarget.dataset.type] = e.detail.value
			},
			/**************转化产品数据*************/
			_setGoods: function(goods) {
				if (goods != null) {
					goods.price = goods.price.toFixed(2);
				}
				return goods;
			},
			/**************调整商品数目*************/
			changeCounts: function(type) {
				var that = this;
				var pCount = this.pCount;
				if (type == 'add') {
					pCount += 1;
				} else {
					if (pCount == 1) {
						pCount = 1;
					} else {
						pCount -= 1;
					}
				}
				this.pCount = pCount
				this.calculateONE();
				that.resetAmount();
				if (!this.use_point) {
					this.userIntegral = 0
					this.price_presell = (Math.round((this.oldPrice * this.pCount) * this.rebate * 100) / 100)
				} else {
					this.allPrice = (Math.round(((this.oldPrice * this.pCount) * this.rebate - this.actual_deductible_amount) * 100) / 100)
				}
			},
			changeCountsInput: function(event) {
				console.log("inputChange");
				var that = this;
				var newNum = event.detail.value;
				var oldNum = that.pCount;
				console.log("newNum:" + newNum);
				console.log("oldNum:" + oldNum);
				if (newNum && newNum <= 0) {
					that.pCount = 1
					that.calculateONE();
					that.resetAmount();
					return;
				}
				that.pCount = newNum
				that.calculateONE();
				that.resetAmount();
			},
			inputBlur: function(event) {
				var that = this;
				if (!event.detail.value) {
					that.pCount = 1
				}
				that.calculateONE();
				that.resetAmount();
			},
			/**************挑选地址*************/
			addressTip: function(event) {
				uni.navigateTo({
					url: '../address_list/address_list'
				})
			},
			/**************选择门店*************/
			selectStore: function(event) {
				console.log(this.product)
				uni.navigateTo({
					url: '../store_list/store_list?productId=' + this.product.id
				})
			},
			/**************下单支付*************/
			payforTip: function(event) {
				console.log(this.skus)
				console.log(this.skuIds)
				if (this.skuIds.length != this.spItems.length) {
					uni.showToast({
						title: '请选择规格',
						icon: 'none'
					})
					return
				}
				if ((!this.productData[this.skuIds.join(',')]) && !this.product.isVedio) {
					uni.showModal({
						title: '提示',
						content: '库存不足',
						showCancel: false,
						confirmText: "确定",
						success: function(res) {

						}
					})
					return
				}
				if (this.product.isVedio) {

				} else {
					this.productSkuId = this.productData[this.skuIds.join(',')].id
				}
				var that = this;
				/** sku判断开始 */
				var skuIds = that.skuIds; // 当前sku组合
				var length = 0;
				for (var i in skuIds) {
					if (skuIds[i] != 'undefined' && skuIds[i] !== "") {
						length++;
					}
				}
				var yesLength = that.spItems.length; // 正确sku长度
				console.log("【提交表单】正确sku长度" + yesLength);
				console.log("【提交表单】当前sku长度" + length);
				if (length < yesLength) {
					uni.showToast({
						title: '请选择规格',
						icon: 'loading',
						duration: 1000
					})
					return;
				}

				var pCount = that.pCount;
				var skuKey = skuIds.toString();
				var selectSku = that.productData[skuKey];

				var stock = 0;
				var presell = 0;
				if (selectSku) {
					stock = selectSku.stock;
					presell = selectSku.presell;
				}

				console.log("【提交表单】判断库存");
				console.log("【提交表单】" + "选择库存：" + pCount + "实际库存：" + stock + '预售：' + presell);
				if (!pCount) {
					uni.showModal({
						title: '提示',
						content: '请输入购买数量',
						showCancel: false,
						confirmText: "确定",
						success: function(res) {

						}
					})
					return;
				}
				var product = that.product;
				if (((stock <= 0 && presell <= 0) || (pCount > stock && pCount > presell) || !that.productSkuId) && !this.product.isVedio) {
					uni.showModal({
						title: '提示',
						content: '库存不足',
						showCancel: false,
						confirmText: "确定",
						success: function(res) {

						}
					})
					return;
				}
				/** sku判断结束 */
				if (!this.infoName || !this.infoPhone) {
					uni.showToast({
						title: '请完善自取信息',
						icon: "loading",
						duration: 1000
					});
					return;
				}
				if(!(/^1[3456789]\d{9}$/.test(this.infoPhone))) {
					uni.showToast({
						title: '手机号格式不正确',
						icon: "none"
					});
					return;
				}
				uni.showLoading({
					title: '加载中...',
					mask: true,
				})
				console.log("【生成订单】获取数据");
				var values = event.detail.value;
				var share_user_id = uni.getStorageSync('share_user_id');
				var strCreateItems = new Array();
				if (that.isPointsCommodity) {
					var consumePoints = parseInt(that.price * that.pCount);
				} else {
					var consumePoints = that.use_point ? (that.userIntegral ? that.userIntegral : 0) : 0;
				}
				strCreateItems.push({
					productId: that.product.id,
					productSkuId: that.productSkuId,
					quantity: that.pCount
				});
				var _setting = {
					'strCreateItems': JSON.stringify(strCreateItems),
					'counselorId': that.counselorId,
					'topicId': that.topicId,
					'consumePoints': consumePoints,
					'fromMemberId': this.share_user_id || '',
					'consignee': this.infoName,
					'phone': this.infoPhone,
					'memo': this.infoTip,
					'orderType': 'self',
					'openId': this.openId
					
				};
				if (this.storeId) {
					_setting.storeId = this.storeId
				} else {
					_setting.storeId = ''
				}
				console.log("【生成订单】访问创建订单接口");
				productModel.createOrder(_setting, (data) => {
					console.log("【生成订单】创建订单接口返回订单数据");
					console.log(data);
					uni.hideLoading();
					if (data.resultCode == 200 && data.resultContent.orderStatus == 'unconfirmed') {
						productModel.payfor({sn: data.resultContent.sn}, (datas) => {
							console.log("【订单支付】跳到订单支付方法");
							console.log(datas);
							var wechatData = datas.parameterMap;
							console.log(wechatData);
							productModel.jsConfig({url: window.location.href}, config => {
								wechatData.signature = config.signature
								that.payment(wechatData);
							})
						});
					} else if (data.resultCode == 200 && (data.resultContent.orderStatus == 'confirmed' || data.resultContent.orderStatus ==
							'completed')) {
						// 订单金额为0时
						uni.showToast({
							title: '支付成功',
							icon: 'success',
							mask: true,
							duration: 1500
						})

						setTimeout(function() {
							if (that.product.isVedio) {
								uni.showModal({
									title: '温醒提示',
									content: `1、 课程已发送到“oneone聚点”公众号，请前往查看
			  
			  2、 若未关注公众号的，请关注后进入订单内点击商品，即可收到课程
			  
			  3、 如遇问题，可联系时尚顾问咨询`,
									showCancel: false,
									success(res) {
										if (res.confirm) {
											let type = ''
											if (data.resultContent.orderStatus == 'confirmed') {
												type = 'confirmed'
											} else if (data.resultContent.orderStatus == 'completed') {
												type = 'completed'
											}
											uni.reLaunch({
												url: '../order_list/order_list?type=' + type
											})
										}
									}
								})
							} else {
								that.hasFinishTask()
							}
						}, 1000)
					} else {
						uni.showModal({
							title: '提示',
							content: data.resultMsg,
							showCancel: false,
							confirmText: "确定",
							success: function(res) {

							}
						})
					}
				});
			},

			/*微信支付*/
			payment: function(wechatData) {
				const that = this;
				uni.hideLoading();
				console.log(wechatData)
				wexinPay(wechatData, res => {
					console.log("success");
					if (res.errMsg == "requestPayment:cancel") {
						uni.showToast({
							title: '用户取消支付',
							icon: 'loading',
							mask: true,
							duration: 1500
						})
					} else if (res.errMsg == "requestPayment:ok") {
						uni.showToast({
							title: '支付成功',
							icon: 'success',
							mask: true,
							duration: 1500
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '../select/select?counselorId=' + that.counselorId
							})
						}, 1000)
					}
				}, err => {
					console.log("fail");
					uni.showToast({
						title: '支付失败',
						icon: 'loading',
						mask: true,
						duration: 1500
					})
				})
			},
			// 判断是否有已完成的等级任务
			hasFinishTask() {
				const that = this;
				product.hasFinishTask({}, res => {
					if (res.resultCode == 200 && res.resultContent.hasFinishTask) {
						uni.showModal({
							title: '提示',
							content: '您有已完成的等级任务待领取!',
							confirmText: '去领取',
							success(ret) {
								if (ret.confirm) {
									uni.reLaunch({
										url: '../my_center/my_center',
									})
								} else {
									let type = ''
									if (that.activeType == 1) {
										type = 'tihuo'
									}
									uni.reLaunch({
										url: '../order_list/order_list?type=' + type
									})
								}
							}
						})
					} else {
						let type = ''
						if (that.activeType == 1) {
							type = 'tihuo'
						}
						uni.reLaunch({
							url: '../order_list/order_list?type=' + type
						})
					}
				})
			},
			/********************************规格**********************************/
			// 规格选择方法(改用：选择规格2方法)
			changeSku: function(e) {
				console.log(e)
				console.log("【规格选择方法】当前选中[" + e.target.dataset.item + "][" + e.target.dataset.index + "]");
				var isselected = e.target.dataset.isselected;
				if (isselected) {
					console.log("【规格选择方法】已选中当前规格");
					return;
				}
				var islocked = e.target.dataset.islocked
				if (islocked) {
					console.log("【规格选择方法】已锁定当前规格");
					return;
				}
				var itemIndex = e.target.dataset.item;
				var optionIndex = e.target.dataset.index;

				var that = this;
				var spItems = that.spItems;
				var skuIds = that.skuIds;
				var productData = that.productData;
				for (var i in spItems) {
					if (i == itemIndex) {
						for (var j in spItems[i].entries) {
							// 选中/取消选中当前选项
							if (j == optionIndex) {
								spItems[i].entries[j].selected = !spItems[i].entries[j].selected; // 当前规格项的选中状态改为true
								if (spItems[i].entries[j].selected == true) {
									skuIds[i] = spItems[i].entries[j].id; // 修改当前skuIds的值
								} else {
									skuIds[i] = ''; // 修改当前skuIds的值
								}
								var productSku = productData[skuIds.join(",")];
								console.log("【规格选择方法】选中的productSku:");
								console.log(productSku);
								if (productSku != undefined) {
									console.log("【规格选择方法】设置当前productSkuId:" + productSku.id);
									that.productSkuId = productSku.id
								}
							} else {
								spItems[i].entries[j].selected = false; // 取消同一级其他选项的选中状态
							}
						}
					}
				}

				that.spItems = spItems
				that.skuIds = skuIds

				// 重新加载库存、价格数据
				that.reloadSkuData();
			},
			// 选择规格2
			changeSkus(index, item, id) {
				/**
				 * item：第几行
				 * index：第几个
				 * id：规格id
				 */
				let hasStockArr = []
				//const hasStockArr = [];//有库存的规格id组合
				let skus = this.skus
				for (let item in this.productData) {
					hasStockArr.push(item.split(','))
				}
				console.log(hasStockArr)
				// 更改选择状态
				console.log(skus[item])
				console.log(index)
				if (skus[item].entries[index].selected) {
					console.log(skus[item].entries[index])
					skus[item].entries[index].selected = false
					selectIds.splice(selectIds.findIndex(item => item.id == id), 1)
				} else {
					skus[item].entries[index].selected = true
					selectIds.push({
						index: item,
						id: id
					})
					console.log(selectIds)
					skus[item].entries.forEach(skusItem => {
						if (skusItem.id != id) {
							skusItem.selected = false
							console.log(skusItem)
							if (selectIds.map(item => item.id).includes(skusItem.id)) {
								selectIds.splice(selectIds.findIndex(selectIdsItem => selectIdsItem.id == skusItem.id), 1)
							}
						}
					})
				}

				// skus.forEach((item, index) => {
				//   item.entries.forEach(itemTwo => {
				//     if (itemTwo.selected) {
				//       selectIds.push({ index: index, id: itemTwo.id })
				//     }
				//   })
				// })
				console.log(selectIds)


				// 判断当前操作--取消操作
				if (!(selectIds.map(item => item.id)).includes(id)) {
					console.log('!!!!!!')
					disableStockArr = []
					arrB = []
					selectIds.forEach((selectItem, selectIndex) => {
						this.selectSkuSub(selectItem.index, selectItem.id, hasStockArr, selectIds.slice(0, selectIndex + 1), skus)
					})
					if (selectIds.length == 0) {
						disableStockArr = []
						console.log('--------' + disableStockArr)
					}
				} else {
					this.selectSkuSub(item, id, hasStockArr, selectIds, skus)
				}
				// console.log(disableStockArr)
				// console.log(['133', '134'].includes(String(133)))
				// console.log(disableStockArr.includes(String(133)))
				skus.forEach((item, index) => {
					item.entries.forEach(itemTwo => {
						itemTwo.hasStock = true
						// console.log(String(itemTwo.id))
						if (disableStockArr.includes(String(itemTwo.id))) {
							itemTwo.hasStock = false
						}
					})
				})
				// console.log(skus)
				let skuIds = []
				skus.forEach(itemSkus => {
					skuIds = [...skuIds, ...itemSkus.entries]
				})
				skuIds = skuIds.filter(item => item.selected).map(item => item.id)
				// console.log(skus, skuIds)
				this.skus = skus
				this.skuIds = skuIds

			},
			// 选择规格子方法
			selectSkuSub(item, id, hasStockArr, selectIds, skus) {
				let newDisableStock = []

				this.spItems.forEach((spItemsItem, spItemsIndex) => {
					if (spItemsIndex != item) {
						spItemsItem.entries.forEach(spItemsItem2 => {
							newDisableStock.push(String(spItemsItem2.id))
						})
					}
				})
				console.log(newDisableStock, disableStockArr)
				disableStockArr = [...disableStockArr, ...newDisableStock]
				disableStockArr = Array.from(new Set(disableStockArr))
				console.log(selectIds)
				// 有两行
				if (skus.length == 2 || skus.length == 3) {
					// 筛选出arrA：亮的规格，arrB：暗的规格
					let arrA = []
					// arrB = []
					// if(selectIds.length < 3) {
					hasStockArr.forEach(hasStockArrItem => {
						if (hasStockArrItem[item] == id) {
							hasStockArrItem.forEach((twoItem, twoIndex) => {
								if (twoIndex != item) {
									arrA.push(twoItem)
								}
							})
						} else {
							hasStockArrItem.forEach((twoItem, twoIndex) => {
								if (twoIndex != item) {
									arrB.push(twoItem)
								}
							})
						}
					})
					/** */
					disableStockArr = this.disposeArrAB(arrA, arrB, disableStockArr)
					// }

					console.log(disableStockArr)
					if (selectIds.length > 1) {
						arrA = []
						// arrB = []
						let selectIdsIndexArr = selectIds.map(item => item.index)
						// 找到
						hasStockArr.forEach(hasStockItem => {
							if (hasStockItem.includes(String(selectIds[0].id)) && hasStockItem.includes(String(selectIds[1].id))) {
								hasStockItem.forEach(twoItem => {
									if (twoItem != String(selectIds[0].id) && twoItem != String(selectIds[1].id)) {
										arrA.push(twoItem)
									}
								})
							} else {
								for (let i = 0; i < hasStockItem.length; i++) {
									if (!selectIdsIndexArr.includes(i)) {
										arrB.push(hasStockItem[i])
									}
								}
							}
						})
						selectIds.forEach(selectIdsItem => {
							arrA.push(String(selectIdsItem.id))
						})
						disableStockArr = this.disposeArrAB(arrA, arrB, disableStockArr)
					}
					disableStockArr = Array.from(new Set(disableStockArr))
					console.log(disableStockArr)
					// 如果选择的为0
					if (selectIds.length == 0) {
						disableStockArr = []
					}
				} else {
					console.log(skus)
					skus[0].entries.forEach(item => {
						if (!item.hasStock) {
							disableStockArr.push(String(item.id))
						}
					})
					disableStockArr = Array.from(new Set(disableStockArr))
				}
			},
			// arrA、arrB数组处理方法
			disposeArrAB(arrA, arrB, disableStockArr) {
				arrA = Array.from(new Set(arrA))
				arrB = Array.from(new Set(arrB))
				disableStockArr = Array.from(new Set(disableStockArr))
				console.log(Array.from(new Set(arrA)), Array.from(new Set(arrB)), disableStockArr)
				// 去掉暗规格中，亮规格没有的id放入总数组（暗规格数组）
				arrB.forEach(itemArrB => {
					disableStockArr.push(itemArrB)
				})
				disableStockArr = Array.from(new Set(disableStockArr))
				console.log(arrA, arrB, disableStockArr)
				// 将亮规格和总暗规格对比，去掉总暗规格里亮规格有的
				arrA.forEach(item => {
					if (disableStockArr.includes(item)) {
						disableStockArr.splice(disableStockArr.findIndex(dis => dis == item), 1)
					}
				})
				return disableStockArr
			},

			// 重新加载库存、价格数据
			reloadSkuData: function(e) {
				var that = this;
				var spItems = that.spItems;
				var skuIds = that.skuIds;

				var length = 0;
				for (var i in skuIds) {
					if (skuIds[i] != 'undefined' && skuIds[i] !== "") {
						length++;
					}
				}
				var targetLength = that.spItems.length; // 正确sku长度
				console.log("【加载动态数据】正确sku长度" + targetLength);
				console.log("【加载动态数据】当前sku长度" + length);
				if (targetLength == length) {
					// 获取规格和数量1
					var product = that.product;
					var productData = that.productData;
					var tempSkuIds = skuIds.join(",");
					console.log("【加载动态数据】转化skuIds为字符串");
					console.log(tempSkuIds);
					console.log("【加载动态数据】产品sku信息");
					var productSku = productData[tempSkuIds]
					console.log(productSku);
					if (productSku != undefined) {
						that.productSkuId = productSku.id
						that.price = productSku.price
						that.stock = that.stock // 产品库存数量
						that.presell = that.presell //预售量
					} else {
						console.log("【加载动态数据】产品sku信息不存在");
						that.productSkuId = ''
						that.price = 0
						that.stock = 0
						that.presell = 0
					}
					that.resetAmount();
					that.calculateONE();
					return;
					// 数据库获取对应的价格和库存（考虑效率原因暂未使用）
					uni.request({
						url: Config.restUrl + 'member/product/getSkuInfo',
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: {
							productId: that.productId,
							strSpecificationValueIds: JSON.stringify(skuIds)
						},
						success: function(res) {
							console.log(res.data);
							if (res.data.resultCode != "200") {
								uni.showToast({
									title: res.data.resultMsg,
									icon: 'loading',
									duration: 1000,
								})
								that.resetAmount();
								that.calculateONE();
								return;
							}
							that.price = res.data.resultContent.price
							that.stock = res.data.resultContent.stock
							that.resetAmount();
							that.calculateONE();
						}
					})
				}
			},
			/** 是否使用ONE币 */
			switchChange: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.detail.value)
				let that = this;
				that.use_point = e.detail.value
				that.resetAmount();
				if (!this.use_point) {
					this.userIntegral = 0
				} else {
					this.allPrice = (Math.round(((this.oldPrice * this.pCount) * this.rebate - this.actual_deductible_amount) * 100) / 100)
				}
			},
			/**
			 * 计算抵扣ONE币
			 */
			calculateONE: function(userIntegral) {
				console.log(userIntegral);
				let that = this;
				console.log(that.oldPrice)
				let _price = that.oldPrice * that.pCount;
				let need_use_vipPoint_num = Math.ceil((_price * this.rebate).toFixed(2) * that.rmb_point_proportion);
				// 判断需要使用的vip币是否大于自己有的
				if (need_use_vipPoint_num > this.vipPoint) {
					let vip_reduce_price = parseInt((this.vipPoint / that.rmb_point_proportion) * 100) / 100
					let vip_reduce_point = this.vipPoint
					console.log(vip_reduce_price)
					if (this.rebate > 0.7) {
						_price = Math.round(_price * (this.rebate - 0.7) * 100) / 100;
					} else {
						_price = 0
					}
					let _has_point = that.one_coin;
					let _available_point;
					console.log("1_price", _price, "_available_point", _available_point);
					// 判断vip抵扣过剩的金额是否够最大one币抵扣的金额
					if ((that.oldPrice * that.pCount * this.rebate).toFixed(2) - vip_reduce_price <= _price) {
						_price = (that.oldPrice * that.pCount * this.rebate).toFixed(2) - vip_reduce_price
					}
					let _all_point = Math.ceil(_price * that.rmb_point_proportion);
					if (_all_point < _has_point) {
						_available_point = _all_point;
					} else {
						_price = Math.floor((_has_point / that.rmb_point_proportion) * 100) / 100;
						_available_point = _has_point;
					}
					console.log(_price, vip_reduce_price)
					that.deductible_amount = (_price + vip_reduce_price).toFixed(2)
					that.available_one_coin = _available_point + vip_reduce_point
				} else {
					console.log(_price)
					that.deductible_amount = (_price * this.rebate).toFixed(2)
					that.available_one_coin = need_use_vipPoint_num
				}
				// 点击按钮计算价格
				if (userIntegral != null && userIntegral != undefined && parseInt(userIntegral) >= 0 && _price >= 0) {
					let coin_reduce_price = 0
					let vip_reduce_price = 0
					if (userIntegral > this.vipPoint) {
						vip_reduce_price = parseInt((this.vipPoint / that.rmb_point_proportion) * 100) / 100
						coin_reduce_price = parseInt(((userIntegral - this.vipPoint) / that.rmb_point_proportion) * 100) / 100
					} else {
						vip_reduce_price = parseInt((userIntegral / that.rmb_point_proportion) * 100) / 100
					}
					_price = (vip_reduce_price + coin_reduce_price).toFixed(2)
					console.log(_price);
					that.actual_deductible_amount = _price
				}
			},
			/**
			 * 积分输入框
			 */
			integralInput: function(e) {
				console.log(e);
				let that = this
				let inputVal = e.detail.value
				// if (inputVal > that.available_one_coin){
				//   inputVal = that.available_one_coin
				// }
				console.log(this.available_one_coin)
				// 判断输入的是否大于实际有的
				if (inputVal > this.available_one_coin) {
					that.userIntegral = parseInt(inputVal / 10)
				} else if (inputVal <= 0) {
					that.userIntegral = 0
				} else {
					that.userIntegral = parseInt(inputVal)
				}
				this.calculateONE(this.userIntegral);
				if (!this.use_point) {
					this.userIntegral = 0
				} else {
					console.log(this.actual_deductible_amount)
					this.allPrice = (Math.round((this.price * this.pCount - this.actual_deductible_amount) * 100) / 100)
				}
			},
			/**
			 * 使用积分
			 */
			userIntegralTap: function() {
				let that = this;
				let _userIntegral = that.userIntegral;
				if (_userIntegral != null && _userIntegral != '' && _userIntegral >= 0) {
					that.calculateONE(_userIntegral)
				}
			},
			/**
			 * 重置价格
			 */
			resetAmount: function() {
				let that = this;
				console.log(that.available_one_coin, that.deductible_amount);
				that.userIntegral = that.available_one_coin
				that.actual_deductible_amount = that.deductible_amount
			},
			// 去任务页
			toTask() {
				uni.navigateTo({
					url: '../gw/task/task',
				})
			}
		}
	}
</script>

<style>
	.order_box {
		width: 100%;
		height: auto;
		margin-bottom: 50rpx;
		background: #eeeeee;
		overflow-y: scroll;
		overflow-x: hidden;
	}

	.order_info {
		padding: 20rpx 5% 20rpx 5%;
		margin: 0 auto;
		position: relative;
		display: flex;
		background: #fff;
	}

	.order_product_img {
		width: 240rpx;
		height: 240rpx;
	}

	.order_product_info {
		flex: 1;
		margin-left: 10rpx;
		display: flex;
		flex-direction: column;
	}

	.order_product_title {
		font-size: 32rpx;
		height: 64rpx;
		line-height: 32rpx;
		font-family: PingFangSC-Regular;
		color: #000000;
		letter-spacing: -0.68rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		/* white-space:nowrap; */
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.order_product_price {
		text-align: right;
		font-family: PingFangSC-Regular;
		font-size: 40rpx;
		color: #FA584D;
		letter-spacing: -0.86rpx;
		padding-top: 10rpx;
	}

	.oldPrice {
		text-decoration: line-through;
		font-size: 26rpx;
		color: #666;
	}

	.order_product_counts {
		display: flex;
		margin-top: 30rpx;
		justify-content: flex-end;
		align-items: center;
		position: relative;
		align-self: flex-end;
	}

	.left_icon,
	.right_icon {
		display: inline-block;
		width: 50rpx;
		height: 50rpx;
		position: relative;
		border: 1px solid #ececec;
		border-radius: 50%;
	}

	.left_icon {
		margin-right: 10rpx;
	}

	.right_icon {
		margin-left: 10rpx;
	}

	.left_icon_wrap {
		position: absolute;
		width: 100rpx;
		height: 100rpx;
		top: -20rpx;
		left: -40rpx;
	}

	.right_icon_wrap {
		position: absolute;
		width: 100rpx;
		height: 100rpx;
		top: -20rpx;
		right: -40rpx;
	}

	.left_icon::before,
	.right_icon::before,
	.left_icon::after,
	.right_icon::after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #4a4a4a;
	}

	.left_icon::after,
	.right_icon::after {
		width: 20rpx;
		height: 1px;
	}

	.right_icon::before {
		width: 1px;
		height: 20rpx;
	}

	.counts {
		display: inline-block;
		color: #4a4a4a;
		font-size: 28rpx;
		box-sizing: border-box;
		width: 88rpx;
		height: 60rpx;
		background: #FFFFFF;
		border: 1px solid #ECECEC;
		text-align: center;
	}

	.order_product_stock {
		text-align: right;
		font-size: 32rpx;
	}

	.order_address {
		font-size: 32rpx;
		color: #333133;
		margin-top: 20rpx;
		background: #ffffff;
		padding: 0 5% 20rpx;
	}

	.order_address_title {
		padding: 10rpx 0;
	}

	.order_address_choice {
		border: 1rpx solid #e0e0e0;
		padding: 20rpx 35rpx;
		font-size: 28rpx;
		color: #000000;
		position: relative;
		height: auto;
		background: #f6f6f6;
	}

	.order_address_prompt {
		text-align: center;
		padding: 20rpx 35rpx;
	}

	.order_address_content {
		display: flex;
	}

	.order_address_content_left {
		flex: 1;
	}

	.order_address_content_right {
		display: flex;
		align-items: center;
	}

	.order_address_content_left_line {
		display: flex;
	}

	.order_address_name {}

	.order_address_phone {
		margin-left: 100rpx;
	}

	.order_address_area {
		height: auto;
		margin-top: 10rpx;
		white-space: nowrap;
	}

	.order_address_address {
		height: auto;
		margin-top: 10rpx;
	}

	.order_address_btn {
		width: 45rpx;
		height: 45rpx;
		margin-left: 50rpx;
	}

	.order_dec {
		font-size: 32rpx;
		color: #333133;
		/* margin-top:20rpx; */
		background-color: #ffffff;
		padding: 0 5% 20rpx 5%;
		box-sizing: border-box;
		/* height: 70rpx; */
	}

	.order_dec_title {
		padding: 10rpx 0;
	}

	.order_dec_content {
		border: 1rpx solid #e0e0e0;
		padding: 10rpx 35rpx;
		font-size: 28rpx;
		color: #000000;
		box-sizing: border-box;
		width: 100%;
		height: 179rpx;
		background: #f6f6f6;
		z-index: 10;
	}

	.memo_content {
		overflow: hidden;
		white-space: normal;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		word-break: break-all;
	}

	.order_pay {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background: #FA584D;
		color: #ffffff;
		text-align: center;
		position: fixed;
		bottom: 0;
		font-size: 32rpx;
		border-radius: 0;
		z-index: 11;
	}

	button::after {
		border: 0;
	}

	.oneBtn {
		background: #FFA83D;
	}

	.oneBtn[disabled]:not([type]) {
		background: #FFA83D;
		color: #ffffff;
	}

	.oneBtn[disabled]:not([type]):active {
		background: #FFA83D;
		color: #ffffff;
	}

	.order_pay_hover {
		background-color: #EE1111;
	}

	.specification {
		padding: 10rpx 5% 10rpx 5%;
		margin: 0 auto;
		margin-bottom: 20rpx;
		background: #fff;
	}

	.specification .line {
		display: flex;
	}

	.specification .line+.line {
		margin-top: 20rpx;
	}

	.specification .title {
		width: 120rpx;
		text-align: left;
		font-family: PingFangSC-Regular;
		font-size: 26rpx;
		color: #333133;
		line-height: 60rpx;
	}

	.specification .item {
		line-height: 60rpx;
		text-align: center;
		box-sizing: border-box;
		border: 1px solid #ECECEC;
		display: inline-block;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular;
		color: #4a4a4a;
		padding: 0 30rpx;
	}

	.specification .item.selected {
		border: 1px solid #FA584D;
		color: #FA584D;
	}

	.specification .item.locked {
		color: #9B9B9B;
		cursor: not-allowed;
		border-color: #ECECEC;
		background: #EBEBEB;
	}

	.order_flex {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.one_text {
		color: rgb(202, 199, 199);
	}

	/* 选择器 */
	.logistics-skip {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		margin-right: -20rpx;
	}

	.switch-box {
		transform: scale(0.8) !important;
	}

	.wx-switch-input::before {
		background-color: #3f3e44 !important;
	}

	.integral-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.deductible-drawer {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 40%;
	}

	.input-drawer {
		width: 60%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}

	.integral-input {
		border: 2rpx solid #9B9B9B;
		border-radius: 5%;
		width: 200rpx;
		padding: 0 6rpx;
	}

	/* 使用积分 */
	.use-btn {
		width: 100rpx;
		height: 50rpx;
		background: #FA584D;
		font-size: 28rpx;
		color: #fff;
		border-radius: 5%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-left: 10rpx;
		/* margin-right: 10rpx; */
	}

	/* 使用积分盒子*/
	.order-point {
		height: 70rpx;
		font-size: 32rpx;
		color: #333133;
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 2% 5%;
		margin-bottom: 20rpx;
	}

	.deductible-text {
		color: #FA584D;
	}

	.sendType {
		padding: 20rpx 0;
	}

	.typeBox {
		border: 1px solid #eee;
		border-radius: 20px;
		/* display: flex; */
		display: inline-block;
		font-size: 28rpx;
		padding: 8rpx 20rpx;
		position: relative;
	}

	.typeBox text {
		margin-right: 40rpx;
		position: relative;
		z-index: 999;
		text-align: center;
		transition: .1s;
	}

	.typeBox text:last-of-type {
		margin-right: 0;
	}

	.typeBox .typeBg {
		position: absolute;
		left: 0;
		top: 0;
		/* z-index: -1; */
		width: 54%;
		height: 100%;
		border-radius: 20px;
		background-color: #F85550;
		color: #fff;
		transition: .2s;
	}

	/* 提货信息 */
	.storeInfo .store-title {
		padding: 10rpx 0;
	}

	.storeInfo .store-content {
		border: 1rpx solid #e0e0e0;
		padding: 20rpx 35rpx;
		/* font-size: 28rpx; */
		color: #000000;
		position: relative;
		height: auto;
		background: #f6f6f6;
	}

	.store-content>view {
		display: flex;
		align-items: center;
		margin: 20rpx 0;
	}

	.store-content text {
		width: 20%;
	}

	.store-content input {
		width: 80%;
		height: 60rpx;
		line-height: 60rpx;
		border: 1px solid #eee;
		border-radius: 5rpx;
		background-color: #fff;
		padding: 0 20rpx;
		box-sizing: border-box;
		font-size: 28rpx;
	}
	.placeholder {
		font-size: 28rpx;
	}
</style>
