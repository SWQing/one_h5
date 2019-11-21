<template>
	<view class="container">
	    <view class="counselorBox">
	        <view class="item" v-if="info">
	            <view class="banner">
	                <image :src="info.cover" mode="aspectFill" ></image>
	                <view class="headImg"><image :src="info.headImg" alt="headImg" mode="aspectFill"></image></view>
	            </view>
	            <view class="name">{{info.nickName}}</view>
	            <view class="motto">{{info.motto}}</view>
	            <view class="line">
					<view class="circle circle-left"></view>
					<image src="https://oneone.oneonelife.com/resources/wechat/images/line.png" mode="aspectFit"></image>
					<view class="circle circle-right"></view>
				</view>
	            <view class="qr"><image :src="info.qrcode" alt="qr" mode="aspectFit"></image></view>
	            <view class="message">长按识别二维码</view>
	        </view>
	    </view>
	</view>
</template>

<script>
	const util = require('../../utils/util.js')
	const product = require('../model/product-model')
	export default {
		data() {
			return {
				info: null,
				counselorId: ''
			}
		},
		onLoad(option) {
			this.counselorId = option.counselorId || ''
			this.getList()
		},
		methods: {
			getList() {
				const that = this;
				uni.showLoading({
					title: '正在加载...'
				})
				product.getList({counselorId: this.counselorId}, function(res) {
					uni.hideLoading()
					if(res.resultCode == 200) {
						that.info = res.resultContent
					} else {
						uni.showToast({
							title: '获取用户信息失败',
							icon: 'none'
						})
					}
				})
			},
		}
	}
</script>

<style>
	.container {
	    padding: 30rpx;
	    font-family: '黑体';
	    min-height: 100vh;
	    height: auto;
		background-color: #343338;
	}
	.back {
	    position: fixed;
	    left: 0;
	    bottom: 220rpx;
	    background-color: rgba(248, 85, 81, 0.95);
	    padding: 10rpx 15rpx 10rpx 10rpx;
	    border-top-right-radius: 20rpx;
	    border-bottom-right-radius: 20rpx;
	    z-index: 999;
	    font-size: 22rpx;
	    display: flex;
	    align-items: center;
	    color: #fff;
	}
	.back .backIcon {
	    width: 25rpx;
	    height: 25rpx;
	    margin-right: 8rpx;
	}
	.back .oneIcon {
	    width: 35rpx;
	    height: 35rpx;
	    border-radius: 50%;
	    margin-left: 10rpx;
	}
	.item {
	    background-color: #fff;
	    /* border-radius: 0.05rpx; */
	    border-top-left-radius: 5px;
	    border-top-right-radius: 5px;
	    text-align: center;
	    padding-bottom: 20rpx;
	    margin-bottom: 25rpx;
	}
	.banner {
	    height: 492rpx;
	    position: relative;
	}
	image {
	    width: 100%;
	    height: 100%;
	    object-fit: cover;
	    border-top-left-radius: 5px;
	    border-top-right-radius: 5px;
	}
	.headImg {
	    width: 140rpx;
	    height: 140rpx;
	    margin: 0 auto;
	    position: absolute;
	    left: calc(50% - 60rpx);
	    bottom: -60rpx;
	    z-index: 999;
	}
	.headImg image {
	    border-radius: 50%;
	    object-fit: cover;
	}
	.name {
	    font-size: 26rpx;
	    margin-top: 90rpx;
	}
	.motto {
	    width: 450rpx;
	    margin: 25rpx auto;
	    font-size: 28rpx;
	    min-height: 50rpx;
	}
	.qr {
	    width: 204rpx;
	    height: 204rpx;
	    margin: 20rpx auto;
	}
	.qr image {
	    object-fit: contain;
	}
	.message {
	    font-size: 20rpx;
	    color: #999;
	}
	.line {
	    position: relative;
	    display: flex;
	    align-items: center;
	    justify-content: center;
		height: 50rpx;
	}
	.line image {
	    width: 95%;
	}
	.line view {
	    position: absolute;
	    top: calc(50% - 28.5rpx);
	    width: 50rpx;
	    height: 50rpx;
	    background-color: #343338;
	    border-radius: 50%;
	}
	.line view:first-of-type {
	    left: -25rpx;
	}
	.line view:last-of-type {
	    right: -25rpx;
	}
</style>
