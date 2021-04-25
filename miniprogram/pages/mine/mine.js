// mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: [
      [
        { "name": "我的收藏" },
        { "name": "结算记录" },
      ],
      [
        { "name": "使用帮助" },
        { "name": "关于我们" }
      ]
    ]
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  login: function (event) {
    console.log(event);
    wx.navigateTo({
      url: 'login/login',
    })
  },
  toMine: function(event){
    var item=event.currentTarget.dataset.item.name;
    if (item == "我的收藏"){
      wx.navigateTo({
        url: '/pages/bookList/bookList',
      })
    }else if(item == "结算记录"){
      wx.switchTab({
        url: '/pages/bookMall/bookMall'
      })
    }else if(item == "使用帮助"){
      wx.showToast({
        title: '暂无此功能!',
        duration: 1000,
      })
    }else{
      wx.showModal({
        content: '方全荣、孔灿荣',
        confirmText:'确定',
        showCancel:false,
      })
    }
  },
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

  }
})