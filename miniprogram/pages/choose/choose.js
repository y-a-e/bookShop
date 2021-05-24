// miniprogram/pages/choose/choose.js
const db = wx.cloud.database();
const addre = db.collection('addre');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.allAddreData();
  },

  allAddreData: function () {
    addre.get({
      success:res=>{
        var that = this;
        that.setData({
          list: res.data,
        });
      }
    })
  },

  //newaddre
  addAddre:function(e){
  	wx.navigateTo({
       url: '../newAddre/newAddre'
    })
  },

  //ModifyAddre 修改
  toModifyAddre:function(event){
    // console.log(event);
    var id = event.currentTarget.dataset.id;
    var addre = event.currentTarget.dataset.addre;
    // console.log('../modifyAddre/modifyAddre?id='+ id+'&addre='+addre);
    wx.navigateTo({
     url: '../modifyAddre/modifyAddre?id='+ id+'&addre='+addre
    })
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
    this.onLoad();
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