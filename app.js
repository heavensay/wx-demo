//app.js
import './utils/wxPromise.min.js'
// var wxPromise = require("/utils/wxPromise.min")

var auth = require('utils/authority')

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //userInfoReadyCallback用户认证完成之后后调
    auth.initUserToken(this.userInfoReadyCallback)
  },

  globalData: {
    userInfo: null
  },

  userInfoReadyCallback:function(){
    console.log("app userInfoReadyCallback init")
  }
})