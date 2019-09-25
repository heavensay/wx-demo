//index.js
//获取应用实例
var auth = require('../../utils/authority')
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentData: 0,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //如果只需要获取用户userToken，不需要进行授权；可按下面这种写法
    //app登录完成
    if (auth.getUserToken().isAppLogin) {
      //用户已经在小程序初始化时候，已经登录完成，userToken已经生成，可能
      console.log("auth isapplogin====:" + JSON.stringify(auth.getUserToken()))
    } else {
      console.log("auth userInfoReadyCallback====222:")
      //app登录还没完成，需要在回调用中进行操作
      app.userInfoReadyCallback = (function (userToken) {
        console.log("auth userInfoReadyCallback====3333:" + JSON.stringify(userToken))
      })
    }


  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current,
        content:"custom content",
      })
    }
  },

  scrollViewBottom:function(e){
    console.log("scrollViewBottoms")
  },

  gotoLayout:function(e){
    wx.navigateTo({
      url: '/pages/index/layout/layout',
    })
  },

  gotoCustomComponent: function (e) {
    wx.navigateTo({
      url: '/pages/index/componentview/componentview',
    })
  },

  gotoCustomAuth:function(){
    wx.navigateTo({
      url: '/pages/index/auth/auth',
    })
  },
  gotoViewList(){
    wx.navigateTo({
      url: '/pages/index/viewlist/viewlist',
    })
  },
})
