// pages/personal/personal.js
import request from '../../utils/request.js'
let startY = 0
let moveY = 0
let moveDistance = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransForm: 'translateY(0)',
    coverTransition: '',
    userInfo: {},
    recentPlayList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let info = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: JSON.parse(info)
    })
    this.getUserRecentPlayList(this.data.userInfo.userId)
  },
  //获取用户最近播放列表
  async getUserRecentPlayList(userId) {
    let playList = await request('/user/record', {
      uid: userId,
      type: 0
    })
    let recentPlayList=playList.allData.splice(0,10).map(item=>{
      item.id=item.song.id
      return item
    })
    this.setData({
      recentPlayList
    })
  },
  handleTouchStart(event) {
    this.setData({
      coverTransition: ''
    })
    startY = event.touches[0].clientY
  },
  handleTouchMove(event) {
    moveY = event.touches[0].clientY
    moveDistance = moveY - startY
    if (moveDistance <= 0) {
      return
    }
    if (moveDistance >= 80) {
      moveDistance = 80
    }
    this.setData({
      coverTransForm: `translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd() {
    this.setData({
      coverTransForm: 'translateY(0)',
      coverTransition: 'transform 1s linear'
    })
  },
  //跳转登录界面的回调
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})