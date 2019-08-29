Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content:String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 上拉加载
    onReachBottom: function () {
      console.log("goods onReachBottom2===")
    },
    //下拉刷新
    onPullDownRefresh: function () {
      console.log("goods onPullDownRefresh2===")
    },

    onLoad: function (options) {
      console.log("goods onLoad2===")
    }
  },

  lifetimes:{
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log("goods attached===")
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      console.log("goods detached===")
    },
  },
})
