/**
 * Created by jimmy-jiang on 2016/11/21.
 */
import { Config } from './config.js';

class Base {
  constructor() {
    "use strict";
    this.baseRestUrl = Config.restUrl;
    this.onPay = Config.onPay;
  }

  //http 请求类, 当noRefech为true时，不做未授权重试机制
  request(params, noRefetch) {
    var that = this,
      url = this.baseRestUrl + params.url;
    if (!params.type) {
      params.type = 'get';
    }
    /*不需要再次组装地址*/
    if (params.setUpUrl == false) {
      url = params.url;
    }

    var contentType = 'application/json';
    if (params.type.toLowerCase() == 'post') {
      contentType = 'application/x-www-form-urlencoded';
    }

    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'content-type': contentType,
        'Accept': 'application/json'
      },
      success: function (res) {
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        var code = res.statusCode.toString();
        console.log("request返回数据成功code: " + code);
        var startChar = code.charAt(0);
        if (startChar == '2') {
          if (res.data.resultCode == '401') {
            // wx.removeStorageSync("token");
            // getApp().login();
            if (!getApp().globalData.logining) {
              wx.removeStorageSync("token");
              getApp().login();
            }
          } else {
            params.sCallback && params.sCallback(res.data);
          }
        } else {
          if (code == '401') {
            if (!noRefetch) {
              that._refetch(params);
            }
          }
          that._processError(res);
          params.eCallback && params.eCallback(res.data);
        }
      },
      fail: function (err) {
        //wx.hideNavigationBarLoading();
        that._processError(err);
        // params.eCallback && params.eCallback(err);
        wx.hideLoading();
        wx.showModal({
          title: "网络请求出错",
          content: err.errMsg,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {

            }
          }
        });
        let urlArr = url.split('/');
        if (urlArr[urlArr.length - 1] == 'getParameterMap') {
          console.log('fail');
          // params.eCallback && params.eCallback(err);
          let token = wx.getStorageSync('token');
          wx.request({
            url: Config.restUrl + 'groupBookingItem/payFail',
            method: 'get',
            data: { token: token, sn: params.data.sn },
            success: (res) => {
              console.log(res);
            }
          })
        }
      }
    });
  }

  _processError(err) {
    console.log(err);
  }

  _refetch(param) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      // console.log(this)
      this.request(param, true);
    });
  }

  /*获得元素上的绑定的值*/
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  };

};

export { Base };