var auth = require('../../../utils/authority')
Page({

  /**
   * 页面的初始数据
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  needAuthOper(e){
    var authItem = this.selectComponent('#auth-item')
    authItem.processWxAuth({
      needUserInfoAuth: true,
      // needMobileAuth: 1,
      authSuccess:function(){
        wx.showToast({
          icon: 'none',
          title: "授权成功啦",
          duration: 2000
        })
        //do something
      },
      authFail:function(){
        wx.showToast({
          icon: 'none',
          title: "授权失败",
          duration: 2000
        })
        //do something
      }
    })
  }
})