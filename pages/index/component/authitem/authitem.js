var auth = require('../../../../utils/authority')
var app = getApp()

/**
 * 进行微信用户信息授权和微信手机号授权；提供给外部page或component使用，需要调用processWxAuth方法
 * 步骤：1先授权微信用户信息，2再授权微信手机号
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    needUserInfoAuth: {
      type: Boolean,
      value: false,
    },
    needMobileAuth: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showUserInfo: false,
    showPhoneNumber: false,

    authSuccess: function() {
      wx.showToast({
        icon: 'none',
        title: '授权成功',
        duration: 2000
      })
    },
    authFail: function() {
      wx.showToast({
        icon: 'none',
        title: '授权失败',
        duration: 2000
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getuserinfo: async function(e) {
      console.log("authitem getuserinfo===0" + JSON.stringify(e))
      var tmp = await auth.getUserInfoAuthResultAsync()
      console.log(tmp)
      if (tmp == true) {
        console.log("authitem getuserinfo===1")
        this.setData({
          showUserInfo: false,
        })
        console.log("ddddd：" + JSON.stringify(this.data))
        //微信用户信息认证完成之后，再进行微信手机号认证
        if (this.data.needMobileAuth && !auth.hasUserMobile()) {
          //需要微信用户权限和手机权限的同时认证；在微信手机号权限的时候再执行回调函数；
          return;
        } else {
          this.data.authSuccess()
        }
      } else {
        console.log("authitem getuserinfo===2")
        this.setData({
          showUserInfo: false,
          showPhoneNumber: false,
        })
        this.data.authFail()
      }
      console.log("authitem getuserinfo===3")
    },

    async getPhoneNumber(e) {
      var tmp = await auth.getPhoneNumberAuthResultAsync(e)
      console.log(JSON.stringify("getphonenumber===" + tmp))
      if (tmp) {
        this.setData({
          showPhoneNumber: false,
        })
        console.log("ddddd=====")
        console.log(this.data)
        this.data.authSuccess()
      } else {
        this.setData({
          showUserInfo: false,
          showPhoneNumber: false,
        })
        this.data.authFail()
      }
    },

    /**
     * 进行微信用户信息授权和微信手机号授权；
     * 步骤：1先授权微信用户信息，2再授权微信手机号
     * params参数；needUserInfoAuth：是否需要授权用户信息，needMobileAuth：是否需要授权手机号；authSuccess：授权成功后的回调函数，默认不做处理，调用者通常需要实现此函数；authFail授权失败后的回调函数，默认提示授权失败；
     * 
     */
    processWxAuth(params) {
      const that = this
      //app登录完成
      if (auth.getUserToken().isAppLogin) {
        _processWxAuth(params)
      } else {
        //app登录还没完成，需要在回调用中进行操作
        app.userInfoReadyCallback = (function(userToken) {
          _processWxAuth(params)
        })
      }
    },

    async _processWxAuth(params) {
      const that = this
      var {
        needUserInfoAuth = true,
          needMobileAuth = true,
          authSuccess = this.data.authSuccess,
          authFail = this.data.authFail
      } = params

      if (needUserInfoAuth && !auth.isAuthUserInfo()) {
        this.data.showUserInfo = true
      }

      if (needMobileAuth && !auth.hasUserMobile()) {
        this.data.showPhoneNumber = true
      }

      this.setData({
        needUserInfoAuth: needMobileAuth,
        showPhoneNumber: that.data.showPhoneNumber,
        showUserInfo: that.data.showUserInfo,
        authSuccess,
        authFail
      })
    }
  }
})