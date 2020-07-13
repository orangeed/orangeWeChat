// pages/details/details.js
var WxParse = require('../../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleDetail: {},
    content: '',
    modalName: '',
    InputBottom: 0,
    comment: '',
    commentList: [],
    talks: [],
    touchStart: 0,
    inputValue: '',
    inputBiaoqing: '',
    faces: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535727304160&di=0cc9d01a4ae2deca5634c3136d5c01f6&imgtype=0&src=http%3A%2F%2Fimg5q.duitang.com%2Fuploads%2Fitem%2F201406%2F12%2F20140612202753_u4nG5.jpeg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535727304159&di=da2c1c4e868ee95f3cd65ffc6e24a456&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201505%2F01%2F20150501083603_yuTQc.jpeg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535727304156&di=7d46a1482a8e798a70d8d52320285b02&imgtype=0&src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F7b%2Ff9%2F01%2F7bf901db9091dff00a20d474c83afc45.jpg'],
    names: ['贝贝', '晶晶', '欢欢', '妮妮'],
    isShow: false, //控制emoji表情是否显示 
    isLoad: true, //解决初试加载时emoji动画执行一次
    cfBg: false,
    emojiChar: "☺-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-✈-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?-?",
    //0x1f---
    emoji: [
      "60a", "60b", "60c", "60d", "60f",
      "61b", "61d", "61e", "61f",
      "62a", "62c", "62e",
      "602", "603", "605", "606", "608",
      "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
      "63a", "63b", "63c", "63d", "63e", "63f",
      "64a", "64b", "64f", "681",
      "68a", "68b", "68c",
      "344", "345", "346", "347", "348", "349", "351", "352", "353",
      "414", "415", "416",
      "466", "467", "468", "469", "470", "471", "472", "473",
      "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
    ],
    emojis: [], //qq、微信原始表情
    alipayEmoji: [], //支付宝表情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var em = {},
      that = this,
      emChar = that.data.emojiChar.split("-");
    var emojis = []
    that.data.emoji.forEach(function (v, i) {
      em = {
        char: emChar[i],
        emoji: "0x1f" + v
      };
      emojis.push(em)
    });
    that.setData({
      emojis: emojis
    })

    const _this = this
    wx.getStorage({
      key: 'articleDetail',
      success(res) {
        console.log('res', res);
        _this.setData({
          articleDetail: {
            ...res.data[0]
          }
        })
        const content = res.data[0].content.replace(/data-src/gi, 'src')
        WxParse.wxParse('content', 'html', content, _this, 5)
        const db = wx.cloud.database();
        const orange = db.collection('orange')
        orange.get({
          data: {
            articleId: _this.data.articleDetail.id,
          }
        }).then(res => {
          console.log(res);
          _this.setData({
            commentList: res.data
          })
        })
      }
    })
    // console.log('articleDetail', _this.data.articleDetail);
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

  },

  //点击作者跳转
  toAuthor(e) {
    //模态框
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
    // wx.navigateTo({
    //   url: '../web/web?url=' + encodeURIComponent('http://mp.weixin.qq.com/mp/homepage?__biz=MzUxMTk4NjIzNw==&hid=1&sn=0dba6663f8903af2fa1b50796291c53f&scene=18#wechat_redirect'),
    // })
  },

  //隐藏弹出框
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  //输入框
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  //评论
  comment() {
    console.log('comment', this.data.comment);
    const db = wx.cloud.database();
    const orange = db.collection('orange')
    orange.add({
      data: {
        articleId: this.data.articleDetail.id,
        comment: this.data.comment
      }
    }).then(res => {
      console.log(res);
    })
    // wx.cloud.callFunction({
    //   name: 'comment',
    //   // data: {
    //   //   articleId: this.data.articleDetail.id,
    //   //   comment: this.data.comment
    //   // }
    // }).then(res => {
    //   console.log('----', res);
    // }).catch(err => {
    //   console.log('error', err);
    // })
  },
})