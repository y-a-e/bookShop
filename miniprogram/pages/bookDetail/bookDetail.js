// bookDetail.js
const db = wx.cloud.database();
const book = db.collection('book');
const collection = db.collection('collection');
const bookShop = db.collection('bookShop');
var app = getApp()
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
    var book=JSON.parse(options.book);//获取传到该页面的book序列化
    // console.log(book);
    var title = book.name;
    this.content(book._id);
    wx.setNavigationBarTitle({
      title: title,
    })
  },
  content: function(bookid){
    book.get({
      // 成功获取book数据库，并加载
      success:res=>{
        var that = this;
        var book = {};
        // .where方法调用失败，怀疑是不能在.get方法使用，
        // 因此用for循环阅遍，若id与传给来的序列化中id相等，则输出该书详情
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
  //判断用户是否授权
  islogin:function(){
    if(app.globalData.canIUseOpenData) {  //根据全局变量才判断用户是否登录
      return true;
    }else{
      wx.showModal({
        title: '提示',
        content: '你还未登录',
        cancelText: '取消',
        confirmText: '去登录',
        success: function(res) {
          if(res.confirm){
            //这里是右边按钮的跳转链接
            wx.switchTab({
              url:  '../mine/mine'
            })
          }else{
            return false;
          }
        }
      })
    }
  },
  //收藏事件
  addcollection:function(event){
    if(!this.islogin()) return;  // 为真则已经登录，为假则未登录
    var bookdetail = event.currentTarget.dataset.bookdetail;
    // console.log(bookdetail);
    // 若数据库中无，则添加数据。若有，则提醒用户“已收藏”
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
  //购物车事件
  addbookShop:function(event){
    var bookdetail = event.currentTarget.dataset.bookdetail; 
    // 若数据库中无，则添加数据。若有，则提醒用户“已加入购物车”，并设置num、minusStatuses、selected默认值
    bookdetail.num = 1; // 购物书的数量
    bookdetail.minusStatuses = "normal";  // 购物车最小购物数量是否正常
    bookdetail.selected = false;  // 是否选中结算
    // console.log(bookdetail);
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