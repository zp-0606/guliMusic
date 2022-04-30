// pages/video/video.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [], //导航栏标签数据
    navId: 0,
    videoList: [], //视频数据
    videoId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getNavGroupListData()
  },
  //获取视频数据
  async getVideoListData(navId) {
    let videoListData = await request('/video/group', {
      id: navId
    })
    wx.hideLoading()
    let index = 0
   let {list=[]}=videoListData.datas
    let videoList = list.map(item => {
      item.id = index++
        return item
    })
    this.setData({
      videoList: videoListData.datas
    })
  },
  //获取导航栏数据
  async getNavGroupListData() {
    let navList = await request('/video/group/list')
    this.setData({
      videoGroupList: navList.data.slice(0, 14),
      navId: navList.data[0].id
    })
    this.getVideoListData(this.data.navId)
  },
  // 切换导航
  changeNav(event) {
    let id = event.currentTarget.id
    this.setData({
      navId: id >>> 0,
      videoList: []
    })
    wx.showLoading({
      title: '正在加载中'
    })
    this.getVideoListData(this.data.navId)
  },
  //视频播放
  handlePlay(event){
    let vid=event.currentTarget.id
    this.setData({
      videoId:vid
    })
    // this.vid!==vid&&this.videoContext&&this.videoContext
    // this.vid=vid
    this.videoContext=wx.createVideoContext(vid)
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