<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.container {
	  height: 100%;
	  flex-direction: column;
	  align-items: center;
	  justify-content: space-between;
	  box-sizing: border-box;
	  background-color: #fff;
	  font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Microsoft Yahei",  Arial, Helvetica, sans-serif;
	}
	.clear{
	  clear: both;
	}
	view{
	  font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Microsoft Yahei",  Arial, Helvetica, sans-serif;
	}
	.marign-top-60{
	  margin-top: 60rpx;
	}
	.marign-left-40{
	  margin-left: 40rpx;
	}
	
	.marign-bottom-10{
	  margin-bottom: 10rpx;
	}
	.float-left{
	  float: left;
	}
	input{
	font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Microsoft Yahei",  Arial, Helvetica, sans-serif;
	}
	
	.hidden {
	  display: none;
	}
	.loading-bar {
	  visibility: hidden;
	}
	
	.loading-bar.active {
	  visibility: visible;
	}
	
	.no-data-tip {
	  padding: 40rpx 0;
	  text-align: center;
	  color: #888;
	  font-size: 32rpx;
	}
</style>
