var defaultUserToken = {
  hasUserInfoAuth: false,
  hasUserMobile: false,
  mobile: null,
  nickName: null,
  headPortrait: null,
  openid: null,
  isAppLogin //表示app应用登录成功，获取到用户信息
}

/**
 * 登录信息
 * 后台换取 openId, sessionKey, unionId;
 * 此步骤应该获取到的openid或unionid能对应的app自己的用户信息比如mobile，userid等
 */
async function getLoginAsync() {
  var sucessRes = await wx.pro.login().catch(function (err) {
    console.log("login fail===" + JSON.stringify(err))
    wx.showModal({
      title: '',
      content: err,
    })
  })

  let userToken = wx.getStorageSync("userToken")

  if(sucessRes){
    //获取最新微信用户信息
    await getUserInfoAuthResultAsync()

    console.log("login===" + JSON.stringify(sucessRes))
    if (sucessRes.code) {
      //发送后台请求，根据code获取微信openid；
      //同时此用户如果已经注册过，还会返回账号唯一键e.g. userid,mobile等
      userToken.openid = 'testopenid'

      var mobile = '123123'
      if (mobile != null) {
        userToken.mobile = mobile
        userToken.hasUserMobile = true
        userToken.isAppLogin = true
        wx.setStorageSync("userToken", userToken)
      }else{
        userToken.mobile = null
        userToken.hasUserMobile = false
        userToken.isAppLogin = false
        wx.setStorageSync("userToken", userToken)
      }

      //由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      //所以此处加入 callback 以防止这种情况
      if (getApp().userInfoReadyCallback) {
        getApp().userInfoReadyCallback(userToken)
      }  
    }
  }
}

/**
 * 获取微信用户基本信息(昵称、头像)
 * 返回认证是否成功
 */
async function getUserInfoAuthResultAsync() {
  var result = false;

  var settingRes = await wx.pro.getSetting().catch(function (err) {
      console.log("getsetting fail===")
  })

  if (settingRes.authSetting['scope.userInfo']) {
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    var userinfoRes = await wx.pro.getUserInfo().catch(function (err){
      console.log("getUserInfo fail======" + JSON.stringify(err))
      let userToken = wx.getStorageSync("userToken")
      console.log(userToken)
      userToken.nickName = null
      userToken.headPortrait = null
      userToken.hasUserInfoAuth = false
      wx.setStorageSync("userToken", userToken)
    })

    console.log("getUserInfo success======" + JSON.stringify(userinfoRes))
    let userToken = wx.getStorageSync("userToken")
    var userInfo = userinfoRes.userInfo
    userToken.nickName = userInfo.nickName
    userToken.headPortrait = userInfo.avatarUrl
    userToken.hasUserInfoAuth = true
    result = true;
    wx.setStorageSync("userToken", userToken)
  }else{
    console.log("没有微信用户信息权限======")
    let userToken = wx.getStorageSync("userToken")
    console.log(userToken)
    userToken.nickName = null
    userToken.headPortrait = null
    userToken.hasUserInfoAuth = false
    wx.setStorageSync("userToken", userToken)
  }

  console.log("getuserinfo auth result==="+result)
  return result;
}

/**
 * 手机号授权获取
 */
async function getPhoneNumberAuthResultAsync(e) {
  console.log("微信手机号授权===" + JSON.stringify(e))
  if (!e.detail.iv) {
    console.log("微信手机号授权失败")
    let userToken = wx.getStorageSync("userToken")
    userToken.hasUserMobile = false
    userToken.mobile = null
    wx.setStorageSync("userToken", userToken)
    return result;
  }

  //根据e.detail.encryData数据，服务端解密数据获取手机号
  console.log("微信手机号授权===" + JSON.stringify(e))
  let userToken = wx.getStorageSync("userToken")
  console.log(userToken)
  var userInfo = e.userInfo
  userToken.hasUserMobile = true
  userToken.mobile = "159***630"
  wx.setStorageSync("userToken", userToken)
  result = true;

  return result;
}

/**
 * 是否有微信用户信息权限
 */
function isAuthUserInfo() {
  var userToken = wx.getStorageSync("userToken")
  return userToken.hasUserInfoAuth
}

function isAppLogin(){
  return userToken.isAppLogin
}

/**
 * 是否有微信手机号权限
 * 微信没有提供查看是否有手机号权限的接口
 */
// function isAuthUserMobile(){
//   var userToken = wx.getStorageSync("userToken")
//   return userToken.hasUserMobileAuth
// }

/**
 * 是否有手机号
 */
function hasUserMobile(){
  let userToken = wx.getStorageSync("userToken")
  return userToken.mobile == null?false:true;
}

/**
 * usertoken 初始化；用于app.js中
 */
function initUserToken() {
  var userToken = wx.getStorageSync("userToken")

  if (userToken || userToken == '') {
    userToken = defaultUserToken
  }

  if (isAuthUserInfo()) {
    userToken.hasUserInfoAuth = true
  }

  wx.setStorageSync("userToken", userToken)

  getLoginAsync()
}

/**
 * 获取userToken
 */
function getUserToken() {
  return wx.getStorageSync("userToken")
}

module.exports = {
  initUserToken,
  getLoginAsync,
  getPhoneNumberAuthResultAsync,
  getUserInfoAuthResultAsync,
  isAuthUserInfo,
  hasUserMobile,
  getUserToken
}