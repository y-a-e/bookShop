// bookShop.js
const db = wx.cloud.database();
const bookShop = db.collection('bookShop');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookShop: [],
    selectedAllStatus: false,
    total:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bookShopData();
    this.sum();
  },
  //加载数据
  bookShopData: function () {
    //获取bookShop集合
    bookShop.get({
      success:res=>{
        var that = this;
        that.setData({
          bookShop: res.data
        })
      }
    })
  },
  //减法
  bindMinus: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.bookShop[index].num;
		// 如果只有1件了，就不允许再减了
		if (num > 1) {
			num --;
		}
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		// 购物车数据
		var bookShop = this.data.bookShop;
		bookShop[index].num = num;
		// 按钮可用状态
		var minusStatuses = bookShop[index].minusStatuses;
		minusStatuses = minusStatus;
		// 将数值与状态写回
		this.setData({
			bookShop: bookShop,
			minusStatuses: minusStatuses
    });
    this.sum();
  },
  //加法
	bindPlus: function(e) {
		var index = parseInt(e.currentTarget.dataset.index);
		var num = this.data.bookShop[index].num;
		// 自增
		num ++;
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		// 购物车数据
		var bookShop = this.data.bookShop;
		bookShop[index].num = num;
		// 按钮可用状态
		var minusStatuses = bookShop[index].minusStatuses;
		minusStatuses = minusStatus;
		// 将数值与状态写回
		this.setData({
			bookShop: bookShop,
			minusStatuses: minusStatuses
		});
    this.sum();
  },
  bindCheckbox: function(e) {
		/*绑定点击事件，将checkbox样式改变为选中与非选中*/
    //拿到下标值，以在carts作遍历指示用
		var index = parseInt(e.currentTarget.dataset.index);
		//原始的icon状态
		var selected = this.data.bookShop[index].selected;
		var bookShop = this.data.bookShop;
		 //对勾选状态取反
     bookShop[index].selected = !selected;
		// 写回经点击修改后的数组
		this.setData({
			bookShop: bookShop
		});
    this.sum();
  },
  bindSelectAll: function() {
		// 环境中目前已选状态
		var selectedAllStatus = this.data.selectedAllStatus;
		// 取反操作
		selectedAllStatus = !selectedAllStatus;
		// 购物车数据，关键是处理selected值
		var bookShop = this.data.bookShop;
		// 遍历
		for (var i = 0; i < bookShop.length; i++) {
			bookShop[i].selected = selectedAllStatus;
		}
		this.setData({
			selectedAllStatus: selectedAllStatus,
			bookShop: bookShop
		});
    this.sum();
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
            console.log("app.globalData.canIUseOpenData="+app.globalData.canIUseOpenData);
            //这里是右边按钮的跳转链接
            wx.switchTab({
              url:  '../mine/mine'
            })
          }else{
            console.log("app.globalData.canIUseOpenData="+app.globalData.canIUseOpenData);
            return false;
          }
        }
      })
    }
  },
  //结算
  bindCheckout: function() {
    if(!this.islogin()) return;  // 为真则已经登录，为假则未登录
    // 初始化toastStr字符串
    var toastStr = '_id:';
    var nameStr = '结算书籍:';
    // 遍历取出已勾选的id
    for (var i = 0; i < this.data.bookShop.length; i++) {
      if (this.data.bookShop[i].selected) {
        toastStr += this.data.bookShop[i]._id;
        nameStr += this.data.bookShop[i].name;
        toastStr += ' ';
        nameStr += ' ';
        console.log("已勾选项_id："+toastStr);
        console.log("已勾选项书名："+nameStr);
      }
    }
    //存回data
    this.setData({
      toastStr: toastStr
    });
    wx.showModal({
      content: nameStr,
      confirmText:'确定',
      showCancel:false,
    })
    this.sum();
  },
  //汇总金额
  sum: function() {
    var bookShop = this.data.bookShop;
    // 计算总金额
    var total = 0;
    for (var i = 0; i < bookShop.length; i++) {
      if (bookShop[i].selected) {
        total += bookShop[i].num * bookShop[i].price;
      }
    }
    // 写回经点击修改后的数组
    this.setData({
      bookShop: bookShop,
      total: '￥' + total.toFixed(2)
    });
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