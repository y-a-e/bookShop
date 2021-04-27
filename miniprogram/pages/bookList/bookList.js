// bookList.js
const db = wx.cloud.database();
const collection = db.collection('collection');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.collectionData();
  },
  // 加载全部的收藏图书
  collectionData: function () {
    collection.get({
      success:res=>{
        var that = this;
        //console.log(res.data);
        that.setData({
          bookList: res.data
        })
      }
    })
  },
  // 跳转图书详情
  toDetail:function(event){
    // console.log(event);
    var book = event.currentTarget.dataset.book;
    // 通过将book数据序列化（即json），一并传给新页面
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?book='+JSON.stringify(book),
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