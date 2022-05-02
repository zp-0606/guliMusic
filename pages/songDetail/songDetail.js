// pages/songDetail/songDetail.js


import request from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,
    song:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let musicId=options.musicId
    this.getSongInfo(musicId)
  },
  //获取歌曲数据的回调
 async getSongInfo(musicId){
    let musicData=await request('/song/detail',{ids:musicId})
   this.setData({
     song:musicData.songs[0]
   })
     wx.setNavigationBarTitle({
         title:this.data.song.ar[0].name
     })
  },
  // 点击播放/暂停的回调
  handleMusicPlay(){
    let isPlay=!this.data.isPlay
    this.setData({
      isPlay
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