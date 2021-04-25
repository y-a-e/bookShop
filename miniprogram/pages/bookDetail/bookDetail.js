// bookDetail.js
const db = wx.cloud.database();
const book = db.collection('book');
const collection = db.collection('collection');
const bookShop = db.collection('bookShop');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      bookDetail: {},
      tags: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var book=JSON.parse(options.book);
    var title = book.name;
    this.content(book._id);
    wx.setNavigationBarTitle({
      title: title,
    })
  },
  content: function(bookid){
    book.get({
      success:res=>{
        var that = this;
        var book = {};
        for(var i = 0; i <res.data.length;i++){
          if(bookid == res.data[i]._id){
            book["_id"] = res.data[i]._id;
            book["imgUrl"] = res.data[i].imgUrl;
            book["name"] = res.data[i].name;
            book["author"] = res.data[i].author;
            book["content"] = res.data[i].content;
            book["doubanScore"] = res.data[i].doubanScore;
            book["price"] = res.data[i].price;
            book["tags"] = res.data[i].tags;
            var tagsStr = res.data[i].tags;
            var tags=tagsStr.replace('[', '').replace(']', '').split(',');
          }
        }
        that.setData({
          bookDetail: book,
          tags:tags
        });
      },
    })
  },
  addcollection:function(event){
    var bookdetail = event.currentTarget.dataset.bookdetail;
    //console.log(bookdetail);
    collection.add({
      data: bookdetail,
      success:function(){
        wx.showModal({
          content: '收藏成功',
          confirmText:'确定',
          showCancel:false,
        })
      },
      fail:function(){
        wx.showModal({
          content: '已收藏',
          confirmText:'确定',
          showCancel:false,
        })
      }
    })
  },
  addbookShop:function(event){
    //console.log(event);
    var bookdetail = event.currentTarget.dataset.bookdetail;
    bookdetail.num = 1;
    bookdetail.minusStatuses = "normal";
    bookdetail.selected = false;
    console.log(bookdetail);
    bookShop.add({
      data: bookdetail,
      success:function(){
        wx.showModal({
          content: '加入购物车成功',
          confirmText:'确定',
          showCancel:false,
        })
      },
      fail:function(){
        wx.showModal({
          content: '已加入购物车',
          confirmText:'确定',
          showCancel:false,
        })
      }
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