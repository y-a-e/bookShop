// bookList.js
const db = wx.cloud.database();
const book = db.collection('book');
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
    var category = JSON.parse(options.category);
    this.isData(category.categoryName);
    wx.setNavigationBarTitle({
      title: category.categoryName,
    })
  },
  isData:function(categoryName){
    if(categoryName == "全部"){
      this.allBookData();
    }else{
      this.BookData(categoryName);
    }
  },
  BookData: function (categoryName) {
    book.get({
      success:res=>{
        var that = this;
        var bookList = [];
        for(var i = 0; i < res.data.length; i++){
          var book = {};
          if(categoryName == res.data[i].tags){
            book["_id"] = res.data[i]._id;
            book["author"] = res.data[i].author;
            book["content"] = res.data[i].content;
            book["imgUrl"] = res.data[i].imgUrl;
            book["name"] = res.data[i].name;
            bookList.push(book);
          }
        }
        that.setData({
          bookList: bookList,
        });
      }
    })
  },
  allBookData: function () {
    book.get({
      success:res=>{
        var that = this;
        that.setData({
          bookList: res.data,
        });
      }
    })
  },

  toDetail:function(event){
    var book = event.currentTarget.dataset.book;
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