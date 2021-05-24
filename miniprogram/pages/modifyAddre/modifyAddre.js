// miniprogram/pages/modifyAddre/modifyAddre.js
const db = wx.cloud.database();
const addre = db.collection('addre');
Page({
  data:{
    // name:"请填写您的姓名",
    // tel:"请填写您的联系方式",
    // addreValue:2,
    addreRange:['　　　　　　　　　　','广州市从化区','广州市天河区','广州市花都区','广州市开福区','广州市海珠区','广州市黄埔区'],
    // door:"街道门牌信息",
    // index:"0"
    id : null,
  },

  onLoad: function(options) {
    var _id = options.id;
    var addre = options.addre;
    this.data.id = _id;
    this.modify(_id , addre);
  },

  //判断所在地址的选项
  isaddreValue:function(addre){
    for(var i =0 ;i  < this.data.addreRange.length ; i++){
      if(this.data.addreRange[i] == addre){
        return i;
      }
    }
  },

  //加载所传参的详情内容
  modify:function(_id, add){
    addre.where({_id:_id})
    .get({
      success:res=>{
        var that = this;
        that.setData({
          name:res.data[0].name,
          tel:res.data[0].tel,
          door:res.data[0].door,
          addreValue:this.isaddreValue(add)
        });
      }
    })
  },

  //加载所在地址的选项
  addrePickerBindchange:function(e){
    this.setData({
      addreValue:e.detail.value
    }) 
  },

  //点击保存
  formSubmit: function(e) {
    var id = this.data.id;  //获取id值
    var warn ="";
    var flag = false;   // 判断是否为空
    if(e.detail.value.name==""){
      warn = "请填写您的姓名！";
    }else if(e.detail.value.tel==""){
      warn = "请填写您的手机号！";
    }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.tel))){  //正则运算
      warn = "手机号格式不正确";
    }else if(e.detail.value.addre=='0'){
      warn = "请选择您的所在区域";
    }else if(e.detail.value.door==""){
      warn = "请输入您的具体地址";
    }else{
      flag = true;
      var addres = e.detail.value;
      addres.addre = this.data.addreRange[addres.addre];
      addres.image = "/images/address/uncheck.png";
      //addres._openid = "oBcC55APuzex24fnIgh5as_eSvrk";//不必要加_openid，报错,_openid属于系统自加，不嫩人为修改
      addre.where({_id:id})
        .update({
        data: addres,
        success:function(res){
          console.log(res);
          wx.redirectTo({
            url: '../choose/choose'
          });
        },
      })
    }
    if(flag==false){
      wx.showModal({
        title: '提示',
        content:warn
      })
    }
  },

  //点击删除
  delete:function(){
    var id = this.data.id;  //获取id值
    wx.showModal({
     title: '提示',
      content: '确认删除该地址信息吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          addre.where({_id:id})
          .remove()
          console.log('删除成功')
          wx.redirectTo({
           url: '../choose/choose'
           }); 
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //点击取消，返回上个页面
  cancel:function(){
    wx.navigateBack({
      delta: 1
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
