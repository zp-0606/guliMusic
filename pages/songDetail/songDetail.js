// pages/songDetail/songDetail.js


import request from "../../utils/request";
const appInstance=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,
    song:{},
      musicId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let musicId=options.musicId
    this.getSongInfo(musicId)
      this.setData({
          musicId
      })
      if(appInstance.globalData.isMusicPlay&&appInstance.globalData.musicId===musicId){
          this.setData({
              isPlay:true
          })
      }
      this.backgroundAudioManager=wx.getBackgroundAudioManager()
      this.backgroundAudioManager.onPlay(()=>{
          this.changePlayState(true)
          appInstance.globalData.musicId=musicId
      })
      this.backgroundAudioManager.onPause(()=>{
          this.changePlayState(false)
      })
      this.backgroundAudioManager.onStop(()=>{
          this.changePlayState(false)
      })
  },
    //修改播放状态
    changePlayState(isPlay){
        this.setData({
            isPlay
        })
        appInstance.globalData.isMusicPlay=isPlay
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
      this.musicControl(isPlay,this.data.musicId)
  },
  //歌曲播放/暂停的回调
  async musicControl(isPlay,musicId){
      if(isPlay){
         let musicLinkData=await request('/song/url',{id:musicId});
         let musicLink=musicLinkData.data[0].url
          this.backgroundAudioManager.src=musicLink
          this.backgroundAudioManager.title=this.data.song.name
      }else{
          this.backgroundAudioManager.pause()
      }
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