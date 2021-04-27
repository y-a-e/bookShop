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
    var category = JSON.parse(options.category);  // 获取传到该页面的category序列化
    this.isData(category.categoryName); // 点击全部图书，或者某分类图书
    wx.setNavigationBarTitle({
      title: category.categoryName,
    })
  },
  // 全部图书，或者某分类图书
  isData:function(categoryName){
    if(categoryName == "全部"){
      this.allBookData();
    }else{
      this.BookData(categoryName);
    }
  },
  // 加载某分类的全部图书
  BookData: function (categoryName) {
    book.get({
      // 成功获取数据库book，并赋予book数组
      success:res=>{
        var that = this;
        //可自行定义局部数组，再将局部数组传值全句数组
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
  // 加载全部图书
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
  // 跳转图书分类详情
  toDetail:function(event){
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