// pages/tabbar/tabbar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PageCur: 'share',
    accessToken: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAccess_Token()
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
    return {
      title: 'ColorUI-高颜值的小程序UI组件库',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  },

  /**
   * 自己的method函数
   */
  //导航栏点击事件
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    console.log('PageCur', this.data.PageCur);
    switch (this.data.PageCur) {
      case 'share':
        this.getAccess_Token()
        break;

      default:
        break;
    }

  },
  //获取accessToken
  getAccess_Token() {
    let _this = this
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx3fab55f96db280c1&secret=92a0d432d69b4105b30d0e66ce9c4dc0',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log('res', res);
        _this.setData({
          accessToken: res.data.access_token
        })
        _this.getList()
      },
      fail(res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      },
      complete(res) {}
    })
  },
  //通过获取的accessToken获取文章列表
  getList() {
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=' + this.data.accessToken,
      data: {
        "type": 'news',
        "offset": 0,
        "count": 20
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log('微信素材列表', res)
        wx.setStorage({
          key: 'article',
          data: res.data,
          success: (res) => {
            console.log('数据缓存成功!',res);
          }
        })
      },
      fail(res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      },
    })
  }
})