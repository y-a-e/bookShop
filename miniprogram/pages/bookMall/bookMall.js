// bookMall.js
const db = wx.cloud.database();
const categoty = db.collection('categoty');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData();
  },
  requestData:function(){
    // 成功获取数据库categoty，并赋予categories数组
    categoty.get({
      success:res=>{
        var that = this;
        //可自行定义局部数组，再将局部数组传值全句数组
        var categories=[];
        for (var i = 0; i < res.data[0].name.length; i++){
          var category={};
          category["name"]=res.data[0].name[i];
          var imgUrl = "/images/store/"+(i+1) +"_112x112_@3x.png";
          category["imgUrl"]=imgUrl;
          categories.push(category);
        };
        that.setData({
          categories: categories,
        })
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  // 跳转图书分类详情
  toBookList: function(event){
    var categoryId = event.currentTarget.dataset.categoryid;
    var categoryName = event.currentTarget.dataset.categoryname;
    // 通过将category数据序列化（即json），一并传给新页面
    wx.navigateTo({
      url: '/pages/allBook/allBook?category={"categoryId":"' + categoryId + '","categoryName":"' + categoryName+'"}',
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