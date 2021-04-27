// home.js
const db = wx.cloud.database();
const recommend = db.collection('recommend');
const book = db.collection('book');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播栏
    banners: [],
    //图书栏
    books: [
      { header: {name: "精品图书"}, books: [] },
      { header: {name: "随便看看"}, books: [] },
      { header: {name: "最新上架"}, books: [] },
    ],
    //菜单栏
    menus: [
      { "imgUrl": "/images/home/menu/rank.png", "name": "榜单" },
      { "imgUrl": "/images/home/menu/category.png", "name": "分类" },
      { "imgUrl": "/images/home/menu/list.png", "name": "书单" },
      { "imgUrl": "/images/home/menu/active.png", "name": "活动" }
    ]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bannersData();
    this.contentData();
  },
  //加载轮播图
  bannersData: function () {
    recommend.get({
      //成功获取数据库recommend，并赋予banners数组
      success:res=>{
        var that = this;
        //可自行定义局部数组，再将局部数组传值全句数组
        var banners=[];
        for (var i = 0; i < res.data[0].pictureList.picUrl.length; i++){
          var banner={};
          banner["picUrl"]=res.data[0].pictureList.picUrl[i];
          banners.push(banner);
        };
        that.setData({
          banners: banners
        })
      },
    })
  },
  //加载图书
  contentData: function () {
    recommend.get({
      //成功获取数据库recommend，并赋予goodBookList、hotBookList、newBookList数组
      success:res=>{
        var that = this;
        //可自行定义局部数组，再将局部数组传值全句数组
        var goodBookList=[];
        var hotBookList=[];
        var newBookList=[];
        for (var i = 0; i < res.data[0].goodBookList2.length; i++){
          var book={};
          book["_id"]=res.data[i+1]._id;
          book["imgUrl"]=res.data[0].goodBookList2[i].imgUrl;
          book["name"]=res.data[0].goodBookList2[i].name;
          goodBookList.push(book);
        };
        for (var i = 0; i < res.data[0].hotBookList2.length; i++){
          var book={};
          book["_id"]=res.data[i+4]._id;
          book["imgUrl"]=res.data[0].hotBookList2[i].imgUrl;
          book["name"]=res.data[0].hotBookList2[i].name;
          hotBookList.push(book);
        };
        for (var i = 0; i < res.data[0].newBookList2.length; i++){
          var book={};
          book["_id"]=res.data[i+7]._id;
          book["imgUrl"]=res.data[0].newBookList2[i].imgUrl;
          book["name"]=res.data[0].newBookList2[i].name;
          newBookList.push(book);
        };
        that.setData({
          'books[0].books': goodBookList,
          'books[1].books': hotBookList,
          'books[2].books': newBookList,
        })
      },
    })
  },
  // 跳转图书详情
  toDetail:function(event){
    var books = event.currentTarget.dataset.book;
    //通过将book数据序列化（即json），一并传给新页面
    console.log('/pages/bookDetail/bookDetail?book='+JSON.stringify(books));
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?book='+JSON.stringify(books),
    })
  },
  //菜单栏跳转对应页面
  toPush: function(event){
    var index=event.currentTarget.dataset.index;
    if (index == 0){
      wx.navigateTo({
        url: '/pages/hotPush/hotPush',
      })
    }else if(index == 1){
      wx.switchTab({
        url: '/pages/bookMall/bookMall'
      })
    }else if(index == 2){
      wx.switchTab({
        url: '/pages/bookShop/bookShop',
      })
    }else{
      wx.showToast({
        title: '暂无此功能!',
        duration: 1000,
      })
    }
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