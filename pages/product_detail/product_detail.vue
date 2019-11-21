<template>
	<view>
		<view class="container home-container" v-if="product">
			<view class="product_info">
				<!-- 商品主图标题 -->
				<view class="product_detail_info">
					<image class="product_top_img" :src="product.img" mode='aspectFill' @tap='previewImage(product.img)'></image>
					<view class="product_top_info">
						<view class='tags'>
							<view v-if="!product.isAllowReturn" style='background: #B4B4B4;'>不退换</view>
							<view v-for="(item, index) in product.productTags" :key='index' :style='{background: item.style}'>{{item.name}}</view>
						</view>
						<view class="product_top_info_title">{{product.name}}</view>
						<view class="product_top_info_content">{{product.goodsNo}}</view>
					</view>
				</view>
				<view class='line-between'></view>
				<!-- 搭配减 -->
				<block v-for="(item, index) in achieveReduceData" :key="index">
					<view class="product_group_info" @tap='toGroupOrder(item.id)'>
						<view class='product_group_content'>
							<view class='group-img'>
								<scroll-view scroll-x style='white-space: nowrap;width: 100%;background-color: #DDE2EA;'>
									<view class='scrollGroup' style='width: 100%;'>
										<view v-for="(imgItem, index) in item.newProductImages" :key="index" class="group-img-item" :class="[(index + 1) % 2 == 0 ? 'concatImg' : '']">
											<image :src='imgItem' mode='aspectFill'></image>
										</view>
									</view>
								</scroll-view>
							</view>
							<view class='group-right'>
								<view class='group-info'>
									<view class='group-info-title'>{{item.title}}</view>
									<view class='group-info-old-price'>￥{{item.oldPrice}}</view>
									<view class='group-info-price'>￥{{item.price}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class='line-between'></view>
				</block>

				<!-- 商品图片描述 -->
				<view class="product_buyer_info">
					<image class="product_buyer_img" :src="product.owner.avatar"></image>
					<view class="product_buyer_title">{{product.owner.nickName}}</view>
				</view>
				<view class='product_doyen_description'>
					<block v-for="(item, index) in product.description" :key="index">
						<view class="product_doyen_content">{{item.name}}</view>
						<image class="product_doyen_img_list_item" :src="item.img" mode='widthFix' @tap='previewImage(item.img)'></image>
					</block>
				</view>
			</view>
			<form v-if='enterType != "share_confirm"'>
				<view class="product_footer">
					<block v-if="product.isMarketable == true">
						<!-- 预售 -->
						<button @tap="onBuyTip(product.id)" class="product_footer_item2" v-if="(product.presellQuantity > 0 || product.stock > 0) && isPointsCommodity == false && product.isPresell">
							<image class="product_footer_item_icon" src="../../img/icon/package.png"></image>
							<view class="product_footer_item_price" v-if="product.presellQuantity + product.stock <= 5"> <text class="oldPrice"
								 v-if="product.originalPrice">￥{{product.originalPrice}}</text> ￥{{price}}（仅剩{{product.presellQuantity + product.stock}}件）</view>
							<view class="product_footer_item_price" v-else> <text class="oldPrice" v-if="product.originalPrice">￥{{product.originalPrice}}</text>
								￥{{price}}</view>
						</button>
						<button @tap="onBuyTip(product.id)" class="product_footer_item2 oneBtn" v-else-if="(product.presellQuantity > 0 || product.stock > 0) && isPointsCommodity == true && product.isPresell">
							<view class="product_footer_item_price">{{price}} ONE币</view>
						</button>
						<!-- 非预售 -->
						<button @tap="onBuyTip(product.id)" class="product_footer_item2" v-else-if="product.stock > 0 && isPointsCommodity == false && !product.isPresell">
							<image class="product_footer_item_icon" src="../../img/icon/package.png"></image>
							<view class="product_footer_item_price" v-if="product.stock <= 5"> <text class="oldPrice" v-if="product.originalPrice">￥{{product.originalPrice}}</text>
								￥{{price}}（仅剩{{product.stock}}件）</view>
							<view class="product_footer_item_price" v-else> <text class="oldPrice" v-if="product.originalPrice">￥{{product.originalPrice}}</text>
								￥{{price}}</view>
						</button>
						<button @tap="onBuyTip(product.id)" class="product_footer_item2 oneBtn" v-else-if="product.stock > 0 && isPointsCommodity == true && !product.isPresell">
							<view class="product_footer_item_price">{{price}} ONE币</view>
						</button>


						<button class="product_footer_item2" v-else>
							<image class="product_footer_item_icon" src="../../img/icon/package.png"></image>
							<view class="product_footer_item_price">库存不足</view>
						</button>
					</block>
					<block v-else-if="product.isMarketable == false">
						<button class="product_footer_item2">
							<image class="product_footer_item_icon" src="../../img/icon/package.png"></image>
							<view class="product_footer_item_price">已下架</view>
						</button>
					</block>
					<block v-else>
						<button class="product_footer_item2">
							<image class="product_footer_item_icon" src="../../img/icon/package.png"></image>
							<view class="product_footer_item_price"></view>
						</button>
					</block>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	const util = require('../../utils/util.js')
	const product = require('../model/product-model')
	export default {
		data() {
			return {
				product: null,
				price: 0.00,
				allPreviewImage: [], // 页面所有图片
				enterType: '', //判断是否是合并订单页进入的
				isPointsCommodity: false, // 判断是否是one币类型的商品
				memberId: '',
				discount: 1,
				storeId: '',
				storeName: '',
				achieveReduceData: []
			}
		},
		onLoad: function(option) {
			console.log(option);
			// option = {
			// 	discount: 1,
			// 	id: "167/355/9430",
			// 	isPointsCommodity: "false",
			// 	openId: 'o10ngjicQmggE8e2HY3UGydKOy8o'
			// }
			var that = this;
			var id = util.getQueryVariable('id'); // 产品分享参数(分享者id/话题id/产品id)
			// localStorage.setItem('openId', 'o10ngjicQmggE8e2HY3UGydKOy8o')
			// var id = '167/355/9430'; // 产品分享参数(分享者id/话题id/产品id)
			console.log(id)
			var arr = id.split("/");
			this.id = id, // 分享者id/话题id/产品id
			this.fromMemberId = arr[0]
			this.topicId = arr[1]
			this.productId = arr[2]
			this.openId = localStorage.getItem('openId')
			console.log(this.openId)
			this.getUserInfo()
			
		},
		methods: {
			getUserInfo() {
				const that = this;
				uni.showLoading({
					title: '正在加载...'
				})
				product.getUserInfo({openId: this.openId}, function(res) {
					uni.hideLoading()
					if(res.resultCode == 200) {
						that.userInfo = res.resultContent.info
						uni.setStorageSync('userInfo', res.resultContent.info)
						that._loadData();
					} else {
						uni.showToast({
							title: '获取用户信息失败',
							icon: 'none'
						})
						setTimeout(() => {
							location.href = './start.html'
						}, 500)
					}
				})
			},
			/*加载所有数据*/
			_loadData: function(callback) {
				uni.showLoading({
					title: '正在加载...',
					mask: true,
				})
				var that = this;

				var json = {
					productId: that.productId,
					fromMemberId: '',
					openId: that.openId
				}
				if (this.storeId) {
					json.storeId = this.storeId
				}
				/*产品详情*/
				product.getProduct(json, (data) => {
					uni.hideLoading();
					console.log(data);
					that.isPointsCommodity = data.goods.isPointsCommodity || false

					if (that.isPointsCommodity) {
						data.defaultProductSku.price = Math.ceil(data.defaultProductSku.price * 125);
					} else {
						console.log(this.discount)
						data.defaultProductSku.price = (this.discount * data.defaultProductSku.price).toFixed(2)
					}

					uni.setStorageSync("productInfo", data)
					data.achieveReduceData.forEach(item => {
						item.oldPrice = (parseInt(item.oldPrice * 100) / 100).toFixed(2)
						item.price = (parseInt(item.price * 100) / 100).toFixed(2)
						item.newProductImages = []
						item.productImages.forEach(imgItem => {
							item.newProductImages.push(imgItem)
							item.newProductImages.push('../../img/bg/group_add.png')
						})
						item.newProductImages.pop()
					})
					that.product = that._setGoods(data.goods)
					that.fromMember = data.goods.fromMember || ''
					that.price = data.defaultProductSku.price
					that.isWish = data.isWish || false
					that.achieveReduceData = data.achieveReduceData
					/* 将图片放入所有图片数组 */
					var allPreviewImage = that.allPreviewImage;
					var img = data.goods.img;
					allPreviewImage.push(img);
					var description = data.goods.description;
					for (var i in description) {
						if (description[i].img != undefined) {
							allPreviewImage.push(description[i].img);
						}
					}
					that.allPreviewImage = allPreviewImage
				});
			},
			/********************************逻辑业务***********************************/
			/**************转化产品数据*************/
			_setGoods: function(goods) {
				if (goods != null) {
					goods.price = goods.price.toFixed(2);
				}
				return goods;
			},
			/**************下订单*************/
			onBuyTip: function(e) {
				console.log('toOrder')
				var that = this;
				// 判断是不是会员以及当前商品是否为会员专属商品
				const userInfo = uni.getStorageSync('userInfo');
				console.log(userInfo)
				if (!userInfo.isVip && this.product.isVip) {
					uni.showModal({
						title: '提示',
						content: '此商品为会员专属商品，请开通会员后再购买',
						confirmText: '开通会员',
						success(res) {
							if (res.confirm) {
								that.createVipOrder()
							}
						}
					})
					return
				}
				if (this.storeId) {
					console.log('111')
					uni.navigateTo({
						url: '../order/order?id=' + that.id + '&share_user_id=' + (this.memberId || '') + '&storeId=' + this.storeId + '&storeName=' + this.storeName
					})
				} else {
					uni.navigateTo({
						url: '../order/order?id=' + that.id + '&share_user_id=' + this.memberId || ''
					})
				}
			},
			/**************加入愿望清单*************/
			onWantTip: function(event) {
				var that = this;
				var id = product.getDataSet(event, 'id');
				product.addWish(id, (data) => {
					this.isWish = true
					uni.showToast({
						title: '成功加入清单!',
						icon: 'success',
						duration: 2000
					})
					setTimeout(function() {}, 2000);
				});
			},
			previewImage: function(src) {
				var that = this;
				var currentUrl = src
				var allPreviewImage = that.allPreviewImage;
				uni.previewImage({
					current: currentUrl, // 当前显示图片的http链接
					urls: allPreviewImage // 需要预览的图片http链接列表
				})
			},
			// 去组合购买页面
			toGroupOrder(id) {
				uni.navigateTo({
					url: '../product_group/product_group?id=' + id,
				})
			},
			// 开通会员（创建订单）
			createVipOrder() {
				const that = this;
				const params = {
					fromMemberId: this.fromMemberId
				}
				uni.showLoading({
					title: '正在支付...',
					mask: true
				})
				product.vipOrder(params, res => {
					if (res.resultCode == 200) {
						that.vipPay(res.resultContent.sn)
					} else {
						uni.showToast({
							title: res.resultMsg,
							icon: 'none'
						})
					}
				})
			},
			// 开通vip调起支付
			vipPay(sn) {
				const that = this;
				product.vipPay({
					sn: sn
				}, res => {
					if (res.resultCode == 200) {
						that.payment(res.parameterMap)
					} else {
						uni.showToast({
							title: res.resultMsg,
							icon: 'none'
						})
					}
				})
			},
			/*微信支付*/
			payment: function(wechatData) {
				const that = this;
				uni.hideLoading();
				uni.requestPayment({
					'appId': wechatData.appId,
					'timeStamp': wechatData.timeStamp,
					'nonceStr': wechatData.nonceStr,
					'package': wechatData.package,
					'signType': wechatData.signType,
					'paySign': wechatData.paySign,
					success: function(res) {
						console.log("success");
						if (res.errMsg == "requestPayment:cancel") {
							uni.showToast({
								title: '用户取消支付',
								icon: 'loading',
								mask: true,
								duration: 1500
							})
						} else if (res.errMsg == "requestPayment:ok") {
							const userInfo = uni.getStorageSync('userInfo')
							userInfo.isVip = true
							uni.setStorageSync('userInfo', userInfo)
							uni.showToast({
								title: '开通成功',
								icon: 'success',
								mask: true,
								duration: 1500
							})
						}
					},
					'fail': function(res) {
						console.log("fail");
						uni.showToast({
							title: '支付失败',
							icon: 'loading',
							mask: true,
							duration: 1500
						})
					},
					complete: function(res) {
						// complete
						console.log("complete");
						console.log(res)
					}
				});
			},
		}
	}
</script>

<style>
	.container {
		padding-bottom: 100rpx;
	}

	.topic_doyen_info {
		width: 100%;
		height: 136rpx;
		position: relative;
	}

	.topic_doyen_info_img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		margin-top: 18rpx;
		margin-left: 26rpx;
		float: left;
	}

	.topic_doyen_info_nickname {
		float: left;
		margin-top: 40rpx;
		margin-left: 30rpx;
		font-family: PingFangSC-Semibold;
		font-size: 32rpx;
		color: #4a4a4a;
		letter-spacing: -0.68rpx;
		text-align: center;
	}

	.topic_doyen_info_dec {
		color: #3b393b;
		font-size: 28rpx;
		float: left;
		width: 560rpx;
		margin-left: 30rpx;
		margin-top: 5rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.msg_success {
		width: 310rpx;
		height: 150rpx;
		position: fixed;
		top: 35%;
		left: 30%;
		border-radius: 10rpx;
		background: #666266;
		z-index: 99;
		opacity: 0.5;
	}

	.msg_icon {
		position: absolute;
		top: 30rpx;
		left: 40rpx;
		z-index: 99;
		background: #666266;
		color: #fff;
		width: 90rpx;
		height: 90rpx;
	}

	.msg_title {
		position: absolute;
		top: 60rpx;
		left: 140rpx;
		font-size: 28rpx;
		color: #fff;
	}

	.topic_doyen_info {
		width: 100%;
		height: 136rpx;
		position: relative;
	}

	.topic_doyen_info_img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		margin-top: 18rpx;
		margin-left: 26rpx;
		float: left;
	}

	.topic_doyen_info_nickname {
		float: left;
		margin-top: 40rpx;
		margin-left: 30rpx;
		font-family: PingFangSC-Semibold;
		font-size: 32rpx;
		color: #4a4a4a;
		letter-spacing: -0.68rpx;
		text-align: center;
	}

	.product_info {
		height: auto;
		background: #fff;
	}

	.product_detail_info {
		width: 100%;
		font-size: 0;
	}

	.product_top_img {
		width: 100vw;
		height: 100vw;
	}

	.product_top_info {
		width: 98%;
		position: relative;
	}

	.tags {
		position: absolute;
		right: 0;
		top: -60rpx;
		display: flex;
		justify-content: flex-end;
		padding: 10rpx 0;
	}

	.tags view {
		background-color: #FFA83D;
		color: #fff;
		font-size: 16rpx;
		border-radius: 3rpx;
		padding: 5rpx 10rpx;
		margin-left: 10rpx;
	}

	.product_top_info_title {
		margin-top: 10rpx;
		font-family: PingFangSC-Semibold;
		font-size: 32rpx;
		color: #4a4a4a;
		letter-spacing: -0.68rpx;
		text-align: center;
	}

	.product_top_info_content {
		margin-top: 10rpx;
		color: #7f7e80;
		font-size: 28rpx;
		font-family: PingFangSC-Light;
		text-align: center;
	}

	.line-between {
		height: 20rpx;
		background: #eee;
	}

	.product_doyen_info {
		width: 100%;
		margin: 0 auto;
		margin-top: 90rpx;
		border-top: 1rpx dashed #7f7e80;
		text-align: center;
	}

	.product_doyen_content {
		color: #000;
		font-size: 30rpx;
		text-align: center;
	}

	.product_doyen_img_list {
		width: 100%;
		margin: 0 auto;
		margin-top: 20rpx;
		text-align: center;
	}

	.product_doyen_img_list_item {
		width: 100%;
		margin-bottom: 20rpx;
	}

	.product_buyer_info {
		margin: 0 auto;
		display: flex;
		align-items: center;
		height: 150rpx;
		padding: 0 26rpx;
	}

	.product_buyer_img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		box-shadow: 0 2rpx 8rpx 0 rgba(0, 0, 0, 0.50);
	}

	.product_buyer_title {
		flex: 1;
		font-family: PingFangSC-Semibold;
		font-size: 32rpx;
		color: #000;
		letter-spacing: -0.68rpx;
		margin-left: 16rpx;
	}

	.product_doyen_description {
		padding: 0 26rpx;
	}

	.product_buyer_img_list {
		width: 100%;
		margin: 0 auto;
		margin-top: 20rpx;
		text-align: center;
	}

	.product_buyer_img_list_item {
		width: 100%;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
	}

	.product_buyer_content {
		color: #000;
		font-size: 28rpx;
		text-align: left;
		margin-top: 20rpx;
	}

	.product_footer {
		position: fixed;
		bottom: 0;
		height: 94rpx;
		line-height: 94rpx;
		width: 100%;
		/* border-top: 1rpx solid #e3e3e3; */
		display: flex;
	}

	.product_footer_item1 {
		background: #fff;
		color: #757575;
		font-size: 28rpx;
		text-align: center;
		flex: 1;
	}

	.product_footer_item2 {
		background: #fa584d;
		color: #fff;
		text-align: center;
		font-size: 30rpx;
		margin: 0 auto;
		flex: 1;
		line-height: inherit;
		border-radius: 0;
	}

	button::after {
		border: none;
	}

	.product_footer_item_icon {
		width: 50rpx;
		height: 56rpx;
		display: inline-block;
		vertical-align: middle;
	}

	.product_footer_item_price {
		font-size: 30rpx;
		color: #fff;
		margin-left: 20rpx;
		display: inline-block;
	}

	.oneBtn {
		background: #FFA83D;
		font-size: 36rpx;
	}

	.oldPrice {
		text-decoration: line-through;
	}

	.product_group_info {
		height: 226rpx;
		background-color: #fff;
		padding: 14rpx 26rpx;
		box-sizing: border-box;
	}

	.product_group_content {
		height: 100%;
		background-color: #F5F5F5;
		display: flex;
		align-items: center;
		padding: 8rpx 10rpx;
		box-sizing: border-box;
	}

	.group-img {
		width: 422rpx;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.product_group_content .group-img-item {
		width: 168rpx;
		height: 168rpx;
		/* background-color: #fff; */
	}

	.product_group_content .group-img-to {
		width: 30rpx;
		height: 30rpx;
		margin: 0 5rpx;
	}

	.product_group_content image {
		width: 100%;
		height: 100%;
		vertical-align: bottom;
	}

	.group-right {
		width: calc(100% - 422rpx);
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.product_group_content .group-right .group-img-item {
		height: 100%;
	}

	.group-info {
		width: 216rpx;
		padding-left: 30rpx;
	}

	.group-info-title {
		font-size: 26rpx;
		/* padding-right: 10rpx; */
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.group-info-old-price {
		font-size: 20rpx;
		color: #BFBFBF;
		text-decoration: line-through;
		margin-top: 22rpx;
	}

	.group-info-price {
		color: #DF5044;
		font-size: 26rpx;
		font-weight: bold;
	}

	.scrollGroup {
		padding: 8rpx;
		box-sizing: border-box;
	}

	.scrollGroup .group-img-item {
		display: inline-block;
		/* margin-right: 10rpx; */
	}

	.product_group_content .concatImg {
		width: 30rpx;
		height: 30rpx;
		margin: 0 20rpx;
		position: relative;
		bottom: 76rpx;
	}
</style>
