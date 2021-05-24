
const db = wx.cloud.database();
const addre = db.collection('addre');
//var index = 0;
Page({
  data:{
    name:"请填写您的姓名",
    tel:"请填写您的联系方式",
    addreValue:0,
    addreRange:['　　　　　　　　　　','广州市从化区','广州市天河区','广州市花都区','广州市开福区','广州市海珠区','广州市黄埔区'],
    door:"街道门牌信息",
  },

  //addreRange下标
  addrePickerBindchange:function(e){
    this.setData({
      addreValue:e.detail.value
    })
  },

  //保存地址事件
  formSubmit: function(e) {
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
      // console.log(addres);
      addres.addre = this.data.addreRange[addres.addre];
      addres.image = "/images/address/uncheck.png";
      addre.add({
        data: addres,
        success:function(){
          wx.showModal({
            content: '保存成功',
            confirmText:'确定',
            showCancel:false,
            success: function(res) {
              if(res.confirm){
                wx.redirectTo({
                  url: '../choose/choose'
                });
              }
            }
          })
        }
      })
    }
    if(flag==false){
      wx.showModal({
        title: '提示',
        content:warn
      })
    }
  },
})