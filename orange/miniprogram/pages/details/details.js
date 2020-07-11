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
    comment: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    wx.cloud.callFunction({
      name: 'add',
      data: {
        articleId: this.data.articleDetail.id,
        comment: this.data.comment
      }
    }).then(res => {
      console.log('----', res);
    }).catch(err => {
      console.log('error', err);
    })
  }
})