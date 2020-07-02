const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [{
      id: 0,
      name: '软件介绍'
    }, {
      id: 1,
      name: "装机分享"
    }],
    load: true,
    accessToken: ''
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let list = [{}];
    for (let i = 0; i < 26; i++) {
      list[i] = {};
      list[i].name = String.fromCharCode(65 + i);
      list[i].id = i;
    }
    this.setData({
      list: list,
      listCur: list[0]
    })
    this.getAccess_Token()
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        console.log('view', view);
        view.fields({
          size: true
        }, data => {
          console.log('data', data);
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  getAccess_Token() {
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx3fab55f96db280c1&secret=92a0d432d69b4105b30d0e66ce9c4dc0',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log('res', res);
        this.setData({
          accessToken: res.data.access_token
        })
      },
      fail(res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      },
      complete(res) {
        this.getList()
      }
    })
  },
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