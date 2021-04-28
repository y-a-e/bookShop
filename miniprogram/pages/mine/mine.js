// mine.js
var app = getApp()
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
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseOpenData:app.globalData.canIUseOpenData, //获取用户信息，默认为false
    //canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
    //canIUseGetUserProfile: false,
  },
  //菜单栏实现功能
  toMine: function(event){
    var item=event.currentTarget.dataset.item.name;
    if (item == "我的收藏"){  //点击“我的收藏”跳转/pages/bookList/bookList
      wx.navigateTo({
        url: '/pages/bookList/bookList',
      })
    }else if(item == "结算记录"){ //点击“结算记录”跳转/pages/bookShop/bookShop
      wx.switchTab({
        url: '/pages/bookShop/bookShop'
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
  //用户退出事件处理
  exit(){
    this.setData({
      canIUseOpenData:false,
    })
    app.globalData.canIUseOpenData = false; //将用户信息注销
  },
  //用户登录事件处理
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {   
        //设置用户信息
        this.setData({
          userInfo: res.userInfo,
          canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
          hasUserInfo: true,
        })
        //全局声明用户已登录
        app.globalData.canIUseOpenData = wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'); 
      }
    })
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