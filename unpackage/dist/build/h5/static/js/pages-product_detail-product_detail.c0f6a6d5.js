(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-product_detail-product_detail"],{"21be":function(t,e,i){"use strict";i.r(e);var o=i("23e6"),n=i("6a9f");for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);i("a269");var r=i("2877"),s=Object(r["a"])(n["default"],o["a"],o["b"],!1,null,"d9f7ae22",null);e["default"]=s.exports},"23e6":function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[t.product?i("v-uni-view",{staticClass:"container home-container"},[i("v-uni-view",{staticClass:"product_info"},[i("v-uni-view",{staticClass:"product_detail_info"},[i("v-uni-image",{staticClass:"product_top_img",attrs:{src:t.product.img,mode:"aspectFill"},on:{click:function(e){e=t.$handleEvent(e),t.previewImage(t.product.img)}}}),i("v-uni-view",{staticClass:"product_top_info"},[i("v-uni-view",{staticClass:"tags"},[t.product.isAllowReturn?t._e():i("v-uni-view",{staticStyle:{background:"#B4B4B4"}},[t._v("不退换")]),t._l(t.product.productTags,function(e,o){return i("v-uni-view",{key:o,style:{background:e.style}},[t._v(t._s(e.name))])})],2),i("v-uni-view",{staticClass:"product_top_info_title"},[t._v(t._s(t.product.name))]),i("v-uni-view",{staticClass:"product_top_info_content"},[t._v(t._s(t.product.goodsNo))])],1)],1),i("v-uni-view",{staticClass:"line-between"}),t._l(t.achieveReduceData,function(e,o){return[i("v-uni-view",{key:o+"_0",staticClass:"product_group_info",on:{click:function(i){i=t.$handleEvent(i),t.toGroupOrder(e.id)}}},[i("v-uni-view",{staticClass:"product_group_content"},[i("v-uni-view",{staticClass:"group-img"},[i("v-uni-scroll-view",{staticStyle:{"white-space":"nowrap",width:"100%","background-color":"#DDE2EA"},attrs:{"scroll-x":""}},[i("v-uni-view",{staticClass:"scrollGroup",staticStyle:{width:"100%"}},t._l(e.newProductImages,function(t,e){return i("v-uni-view",{key:e,staticClass:"group-img-item",class:[(e+1)%2==0?"concatImg":""]},[i("v-uni-image",{attrs:{src:t,mode:"aspectFill"}})],1)}),1)],1)],1),i("v-uni-view",{staticClass:"group-right"},[i("v-uni-view",{staticClass:"group-info"},[i("v-uni-view",{staticClass:"group-info-title"},[t._v(t._s(e.title))]),i("v-uni-view",{staticClass:"group-info-old-price"},[t._v("￥"+t._s(e.oldPrice))]),i("v-uni-view",{staticClass:"group-info-price"},[t._v("￥"+t._s(e.price))])],1)],1)],1)],1),i("v-uni-view",{key:o+"_1",staticClass:"line-between"})]}),i("v-uni-view",{staticClass:"product_buyer_info"},[i("v-uni-image",{staticClass:"product_buyer_img",attrs:{src:t.product.owner.avatar}}),i("v-uni-view",{staticClass:"product_buyer_title"},[t._v(t._s(t.product.owner.nickName))])],1),i("v-uni-view",{staticClass:"product_doyen_description"},[t._l(t.product.description,function(e,o){return[i("v-uni-view",{key:o+"_0",staticClass:"product_doyen_content"},[t._v(t._s(e.name))]),i("v-uni-image",{key:o+"_1",staticClass:"product_doyen_img_list_item",attrs:{src:e.img,mode:"widthFix"},on:{click:function(i){i=t.$handleEvent(i),t.previewImage(e.img)}}})]})],2)],2),"share_confirm"!=t.enterType?i("v-uni-form",[i("v-uni-view",{staticClass:"product_footer"},[1==t.product.isMarketable?[(t.product.presellQuantity>0||t.product.stock>0)&&0==t.isPointsCommodity&&t.product.isPresell?i("v-uni-button",{staticClass:"product_footer_item2",on:{click:function(e){e=t.$handleEvent(e),t.onBuyTip(t.product.id)}}},[i("v-uni-image",{staticClass:"product_footer_item_icon",attrs:{src:"../../img/icon/package.png"}}),t.product.presellQuantity+t.product.stock<=5?i("v-uni-view",{staticClass:"product_footer_item_price"},[t.product.originalPrice?i("v-uni-text",{staticClass:"oldPrice"},[t._v("￥"+t._s(t.product.originalPrice))]):t._e(),t._v("￥"+t._s(t.price)+"（仅剩"+t._s(t.product.presellQuantity+t.product.stock)+"件）")],1):i("v-uni-view",{staticClass:"product_footer_item_price"},[t.product.originalPrice?i("v-uni-text",{staticClass:"oldPrice"},[t._v("￥"+t._s(t.product.originalPrice))]):t._e(),t._v("￥"+t._s(t.price))],1)],1):(t.product.presellQuantity>0||t.product.stock>0)&&1==t.isPointsCommodity&&t.product.isPresell?i("v-uni-button",{staticClass:"product_footer_item2 oneBtn",on:{click:function(e){e=t.$handleEvent(e),t.onBuyTip(t.product.id)}}},[i("v-uni-view",{staticClass:"product_footer_item_price"},[t._v(t._s(t.price)+" ONE币")])],1):t.product.stock>0&&0==t.isPointsCommodity&&!t.product.isPresell?i("v-uni-button",{staticClass:"product_footer_item2",on:{click:function(e){e=t.$handleEvent(e),t.onBuyTip(t.product.id)}}},[i("v-uni-image",{staticClass:"product_footer_item_icon",attrs:{src:"../../img/icon/package.png"}}),t.product.stock<=5?i("v-uni-view",{staticClass:"product_footer_item_price"},[t.product.originalPrice?i("v-uni-text",{staticClass:"oldPrice"},[t._v("￥"+t._s(t.product.originalPrice))]):t._e(),t._v("￥"+t._s(t.price)+"（仅剩"+t._s(t.product.stock)+"件）")],1):i("v-uni-view",{staticClass:"product_footer_item_price"},[t.product.originalPrice?i("v-uni-text",{staticClass:"oldPrice"},[t._v("￥"+t._s(t.product.originalPrice))]):t._e(),t._v("￥"+t._s(t.price))],1)],1):t.product.stock>0&&1==t.isPointsCommodity&&!t.product.isPresell?i("v-uni-button",{staticClass:"product_footer_item2 oneBtn",on:{click:function(e){e=t.$handleEvent(e),t.onBuyTip(t.product.id)}}},[i("v-uni-view",{staticClass:"product_footer_item_price"},[t._v(t._s(t.price)+" ONE币")])],1):i("v-uni-button",{staticClass:"product_footer_item2"},[i("v-uni-image",{staticClass:"product_footer_item_icon",attrs:{src:"../../img/icon/package.png"}}),i("v-uni-view",{staticClass:"product_footer_item_price"},[t._v("库存不足")])],1)]:0==t.product.isMarketable?[i("v-uni-button",{staticClass:"product_footer_item2"},[i("v-uni-image",{staticClass:"product_footer_item_icon",attrs:{src:"../../img/icon/package.png"}}),i("v-uni-view",{staticClass:"product_footer_item_price"},[t._v("已下架")])],1)]:[i("v-uni-button",{staticClass:"product_footer_item2"},[i("v-uni-image",{staticClass:"product_footer_item_icon",attrs:{src:"../../img/icon/package.png"}}),i("v-uni-view",{staticClass:"product_footer_item_price"})],1)]],2)],1):t._e()],1):t._e()],1)},n=[];i.d(e,"a",function(){return o}),i.d(e,"b",function(){return n})},3541:function(t,e,i){var o=i("eced");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var n=i("4f06").default;n("f77a1f8a",o,!0,{sourceMap:!1,shadowMode:!1})},"5fd5":function(t,e,i){"use strict";var o=i("c14d");function n(t,e){o.get("/order/product/detail",t,function(t){return e(t)})}function a(t,e){o.get("/order/member/profile",t,function(t){return e(t)})}function r(t,e){o.post("/order/order/create",t,function(t){return e(t)})}function s(t,e){o.post("/order/order/getParameterMap",t,function(t){return e(t)})}function c(t,e){o.get("/common/getJSCfg",t,function(t){return e(t)})}function d(t,e){o.get("/order/member/counselor",t,function(t){return e(t)})}t.exports={getProduct:n,getUserInfo:a,createOrder:r,payfor:s,jsConfig:c,getList:d}},"629e":function(t,e,i){"use strict";var o=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(i("e814"));i("ac6a"),i("28a5");var a=i("c14d"),r=i("5fd5"),s={data:function(){return{product:null,price:0,allPreviewImage:[],enterType:"",isPointsCommodity:!1,memberId:"",discount:1,storeId:"",storeName:"",achieveReduceData:[]}},onLoad:function(t){console.log(t);var e=a.getQueryVariable("id");console.log(e);var i=e.split("/");this.id=e,this.fromMemberId=i[0],this.topicId=i[1],this.productId=i[2],this.openId=localStorage.getItem("openId"),console.log(this.openId),this.getUserInfo()},methods:{getUserInfo:function(){var t=this;uni.showLoading({title:"正在加载..."}),r.getUserInfo({openId:this.openId},function(e){uni.hideLoading(),200==e.resultCode?(t.userInfo=e.resultContent.info,uni.setStorageSync("userInfo",e.resultContent.info),t._loadData()):(uni.showToast({title:"获取用户信息失败",icon:"none"}),setTimeout(function(){location.href="./start.html"},500))})},_loadData:function(t){var e=this;uni.showLoading({title:"正在加载...",mask:!0});var i=this,o={productId:i.productId,fromMemberId:"",openId:i.openId};this.storeId&&(o.storeId=this.storeId),r.getProduct(o,function(t){uni.hideLoading(),console.log(t),i.isPointsCommodity=t.goods.isPointsCommodity||!1,i.isPointsCommodity?t.defaultProductSku.price=Math.ceil(125*t.defaultProductSku.price):(console.log(e.discount),t.defaultProductSku.price=(e.discount*t.defaultProductSku.price).toFixed(2)),uni.setStorageSync("productInfo",t),t.achieveReduceData.forEach(function(t){t.oldPrice=((0,n.default)(100*t.oldPrice)/100).toFixed(2),t.price=((0,n.default)(100*t.price)/100).toFixed(2),t.newProductImages=[],t.productImages.forEach(function(e){t.newProductImages.push(e),t.newProductImages.push("../../img/bg/group_add.png")}),t.newProductImages.pop()}),i.product=i._setGoods(t.goods),i.fromMember=t.goods.fromMember||"",i.price=t.defaultProductSku.price,i.isWish=t.isWish||!1,i.achieveReduceData=t.achieveReduceData;var o=i.allPreviewImage,a=t.goods.img;o.push(a);var r=t.goods.description;for(var s in r)void 0!=r[s].img&&o.push(r[s].img);i.allPreviewImage=o})},_setGoods:function(t){return null!=t&&(t.price=t.price.toFixed(2)),t},onBuyTip:function(t){console.log("toOrder");var e=this,i=uni.getStorageSync("userInfo");console.log(i),i.isVip||!this.product.isVip?this.storeId?(console.log("111"),uni.navigateTo({url:"../order/order?id="+e.id+"&share_user_id="+(this.memberId||"")+"&storeId="+this.storeId+"&storeName="+this.storeName})):uni.navigateTo({url:"../order/order?id="+e.id+"&share_user_id="+this.memberId||!1}):uni.showModal({title:"提示",content:"此商品为会员专属商品，请开通会员后再购买",confirmText:"开通会员",success:function(t){t.confirm&&e.createVipOrder()}})},onWantTip:function(t){var e=this,i=r.getDataSet(t,"id");r.addWish(i,function(t){e.isWish=!0,uni.showToast({title:"成功加入清单!",icon:"success",duration:2e3}),setTimeout(function(){},2e3)})},previewImage:function(t){var e=this,i=t,o=e.allPreviewImage;uni.previewImage({current:i,urls:o})},toGroupOrder:function(t){uni.navigateTo({url:"../product_group/product_group?id="+t})},createVipOrder:function(){var t=this,e={fromMemberId:this.fromMemberId};uni.showLoading({title:"正在支付...",mask:!0}),r.vipOrder(e,function(e){200==e.resultCode?t.vipPay(e.resultContent.sn):uni.showToast({title:e.resultMsg,icon:"none"})})},vipPay:function(t){var e=this;r.vipPay({sn:t},function(t){200==t.resultCode?e.payment(t.parameterMap):uni.showToast({title:t.resultMsg,icon:"none"})})},payment:function(t){uni.hideLoading(),uni.requestPayment({appId:t.appId,timeStamp:t.timeStamp,nonceStr:t.nonceStr,package:t.package,signType:t.signType,paySign:t.paySign,success:function(t){if(console.log("success"),"requestPayment:cancel"==t.errMsg)uni.showToast({title:"用户取消支付",icon:"loading",mask:!0,duration:1500});else if("requestPayment:ok"==t.errMsg){var e=uni.getStorageSync("userInfo");e.isVip=!0,uni.setStorageSync("userInfo",e),uni.showToast({title:"开通成功",icon:"success",mask:!0,duration:1500})}},fail:function(t){console.log("fail"),uni.showToast({title:"支付失败",icon:"loading",mask:!0,duration:1500})},complete:function(t){console.log("complete"),console.log(t)}})}}};e.default=s},"6a9f":function(t,e,i){"use strict";i.r(e);var o=i("629e"),n=i.n(o);for(var a in o)"default"!==a&&function(t){i.d(e,t,function(){return o[t]})}(a);e["default"]=n.a},a269:function(t,e,i){"use strict";var o=i("3541"),n=i.n(o);n.a},c14d:function(t,e,i){"use strict";function o(t){for(var e=window.location.search.substring(1),i=e.split("&"),o=0;o<i.length;o++){var n=i[o].split("=");if(n[0]==t)return n[1]}return!1}i("6762"),i("2fdb"),i("28a5"),i("386d");var n="";function a(t,e,i){wx.request({url:n+t,data:e,method:"post",header:{"Content-Type":"application/x-www-form-urlencoded"},success:function(t){return"function"==typeof i&&i(t.data)},fail:function(t){console.log(t),"request:fail timeout"==t.errMsg?wx.showToast({title:"请求超时！",icon:"none"}):"request:fail "==t.errMsg&&wx.showToast({title:"请求地址出错！",icon:"none"})}})}function r(t,e,i){wx.request({url:n+t,data:e,method:"get",header:{"Content-Type":"application/x-www-form-urlencoded"},success:function(t){return"function"==typeof i&&i(t.data)},fail:function(){return"function"==typeof i&&i(!1)}})}n=location.href.includes("oneone.oneonelife")?"https://oneone.oneonelife.com/wechat/":"https://wenxi.51vip.biz/wechat",t.exports={post:a,get:r,rootDocment:n,getQueryVariable:o}},eced:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".container[data-v-d9f7ae22]{padding-bottom:%?100?%}.topic_doyen_info[data-v-d9f7ae22]{width:100%;height:%?136?%;position:relative}.topic_doyen_info_img[data-v-d9f7ae22]{width:%?100?%;height:%?100?%;border-radius:%?100?%;margin-top:%?18?%;margin-left:%?26?%;float:left}.topic_doyen_info_nickname[data-v-d9f7ae22]{float:left;margin-top:%?40?%;margin-left:%?30?%;font-family:PingFangSC-Semibold;font-size:%?32?%;color:#4a4a4a;letter-spacing:%?-0.68?%;text-align:center}.topic_doyen_info_dec[data-v-d9f7ae22]{color:#3b393b;font-size:%?28?%;float:left;width:%?560?%;margin-left:%?30?%;margin-top:%?5?%;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.msg_success[data-v-d9f7ae22]{width:%?310?%;height:%?150?%;position:fixed;top:35%;left:30%;border-radius:%?10?%;background:#666266;z-index:99;opacity:.5}.msg_icon[data-v-d9f7ae22]{position:absolute;top:%?30?%;left:%?40?%;z-index:99;background:#666266;color:#fff;width:%?90?%;height:%?90?%}.msg_title[data-v-d9f7ae22]{position:absolute;top:%?60?%;left:%?140?%;font-size:%?28?%;color:#fff}.topic_doyen_info[data-v-d9f7ae22]{width:100%;height:%?136?%;position:relative}.topic_doyen_info_img[data-v-d9f7ae22]{width:%?100?%;height:%?100?%;border-radius:%?100?%;margin-top:%?18?%;margin-left:%?26?%;float:left}.topic_doyen_info_nickname[data-v-d9f7ae22]{float:left;margin-top:%?40?%;margin-left:%?30?%;font-family:PingFangSC-Semibold;font-size:%?32?%;color:#4a4a4a;letter-spacing:%?-0.68?%;text-align:center}.product_info[data-v-d9f7ae22]{height:auto;background:#fff}.product_detail_info[data-v-d9f7ae22]{width:100%;font-size:0}.product_top_img[data-v-d9f7ae22]{width:100vw;height:100vw}.product_top_info[data-v-d9f7ae22]{width:98%;position:relative}.tags[data-v-d9f7ae22]{position:absolute;right:0;top:%?-60?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;padding:%?10?% 0}.tags uni-view[data-v-d9f7ae22]{background-color:#ffa83d;color:#fff;font-size:%?16?%;border-radius:%?3?%;padding:%?5?% %?10?%;margin-left:%?10?%}.product_top_info_title[data-v-d9f7ae22]{margin-top:%?10?%;font-family:PingFangSC-Semibold;font-size:%?32?%;color:#4a4a4a;letter-spacing:%?-0.68?%;text-align:center}.product_top_info_content[data-v-d9f7ae22]{margin-top:%?10?%;color:#7f7e80;font-size:%?28?%;font-family:PingFangSC-Light;text-align:center}.line-between[data-v-d9f7ae22]{height:%?20?%;background:#eee}.product_doyen_info[data-v-d9f7ae22]{width:100%;margin:0 auto;margin-top:%?90?%;border-top:%?1?% dashed #7f7e80;text-align:center}.product_doyen_content[data-v-d9f7ae22]{color:#000;font-size:%?30?%;text-align:center}.product_doyen_img_list[data-v-d9f7ae22]{width:100%;margin:0 auto;margin-top:%?20?%;text-align:center}.product_doyen_img_list_item[data-v-d9f7ae22]{width:100%;margin-bottom:%?20?%}.product_buyer_info[data-v-d9f7ae22]{margin:0 auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:%?150?%;padding:0 %?26?%}.product_buyer_img[data-v-d9f7ae22]{width:%?100?%;height:%?100?%;border-radius:50%;-webkit-box-shadow:0 %?2?% %?8?% 0 rgba(0,0,0,.5);box-shadow:0 %?2?% %?8?% 0 rgba(0,0,0,.5)}.product_buyer_title[data-v-d9f7ae22]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;font-family:PingFangSC-Semibold;font-size:%?32?%;color:#000;letter-spacing:%?-0.68?%;margin-left:%?16?%}.product_doyen_description[data-v-d9f7ae22]{padding:0 %?26?%}.product_buyer_img_list[data-v-d9f7ae22]{width:100%;margin:0 auto;margin-top:%?20?%;text-align:center}.product_buyer_img_list_item[data-v-d9f7ae22]{width:100%;border-radius:%?10?%;margin-bottom:%?20?%}.product_buyer_content[data-v-d9f7ae22]{color:#000;font-size:%?28?%;text-align:left;margin-top:%?20?%}.product_footer[data-v-d9f7ae22]{position:fixed;bottom:0;height:%?94?%;line-height:%?94?%;width:100%;\n\t/* border-top: 1rpx solid #e3e3e3; */display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.product_footer_item1[data-v-d9f7ae22]{background:#fff;color:#757575;font-size:%?28?%;text-align:center;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.product_footer_item2[data-v-d9f7ae22]{background:#fa584d;color:#fff;text-align:center;font-size:%?30?%;margin:0 auto;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;line-height:inherit;border-radius:0}uni-button[data-v-d9f7ae22]:after{border:none}.product_footer_item_icon[data-v-d9f7ae22]{width:%?50?%;height:%?56?%;display:inline-block;vertical-align:middle}.product_footer_item_price[data-v-d9f7ae22]{font-size:%?30?%;color:#fff;margin-left:%?20?%;display:inline-block}.oneBtn[data-v-d9f7ae22]{background:#ffa83d;font-size:%?36?%}.oldPrice[data-v-d9f7ae22]{text-decoration:line-through}.product_group_info[data-v-d9f7ae22]{height:%?226?%;background-color:#fff;padding:%?14?% %?26?%;-webkit-box-sizing:border-box;box-sizing:border-box}.product_group_content[data-v-d9f7ae22]{height:100%;background-color:#f5f5f5;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:%?8?% %?10?%;-webkit-box-sizing:border-box;box-sizing:border-box}.group-img[data-v-d9f7ae22]{width:%?422?%;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.product_group_content .group-img-item[data-v-d9f7ae22]{width:%?168?%;height:%?168?%\n\t/* background-color: #fff; */}.product_group_content .group-img-to[data-v-d9f7ae22]{width:%?30?%;height:%?30?%;margin:0 %?5?%}.product_group_content uni-image[data-v-d9f7ae22]{width:100%;height:100%;vertical-align:bottom}.group-right[data-v-d9f7ae22]{width:calc(100% - %?422?%);height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.product_group_content .group-right .group-img-item[data-v-d9f7ae22]{height:100%}.group-info[data-v-d9f7ae22]{width:%?216?%;padding-left:%?30?%}.group-info-title[data-v-d9f7ae22]{font-size:%?26?%;\n\t/* padding-right: 10rpx; */display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}.group-info-old-price[data-v-d9f7ae22]{font-size:%?20?%;color:#bfbfbf;text-decoration:line-through;margin-top:%?22?%}.group-info-price[data-v-d9f7ae22]{color:#df5044;font-size:%?26?%;font-weight:700}.scrollGroup[data-v-d9f7ae22]{padding:%?8?%;-webkit-box-sizing:border-box;box-sizing:border-box}.scrollGroup .group-img-item[data-v-d9f7ae22]{display:inline-block\n\t/* margin-right: 10rpx; */}.product_group_content .concatImg[data-v-d9f7ae22]{width:%?30?%;height:%?30?%;margin:0 %?20?%;position:relative;bottom:%?76?%}",""])}}]);