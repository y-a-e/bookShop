// hotPush.js
const db = wx.cloud.database();
const recommend = db.collection('recommend');
const ranking = db.collection('ranking');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotPush: { 
      'month': [
      ],
      'week': [
      ]
  },
    titles: { 'month': '月推榜', 'week': '周推榜' }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.contentData();
  },
  // 加载榜单数据
  contentData: function () {
    ranking.get({
      //成功获取数据库ranking，并赋予weekhotPush、monthhotPush数组
      success:res=>{
        var that = this;
        //可自行定义局部数组，再将局部数组传值全句数组
        var weekhotPush=[];
        var monthhotPush=[];
        for (var i = 0; i < res.data[0].month.length; i++){
          var month={};
          month["_id"]=res.data[0].month[i]._id;
          month["name"]=res.data[0].month[i].name;
          month["author"]=res.data[0].month[i].author;
          monthhotPush.push(month);
        };
        for (var i = 0; i < res.data[0].week.length; i++){
          var week={};
          week["_id"]=res.data[0].week[i]._id;
          week["name"]=res.data[0].week[i].name;
          week["author"]=res.data[0].week[i].author;
          weekhotPush.push(week);
        };
        that.setData({
          'hotPush.month': monthhotPush,
          'hotPush.week': weekhotPush,
        })
      },
    })
  },
  // 跳转图书详情
  toDetail: function (event) {
    var book = event.currentTarget.dataset.book;
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?book=' + JSON.stringify(book),
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