// pages/recommendSong/recommendSong.js
import request from "../../utils/request";
import PubSub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:'',
    month:'',
    recommendList:[],
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断用户是否登录
    let userInfo=wx.getStorageSync('userInfo')
    if(!userInfo){
      wx.showToast({
        title:'请先登录',
        icon:'none',
        success:()=>{
          wx.reLaunch({
            url:'/pages/login/login'
          })
        }
      })
    }
    //更新日期
    this.setData({
      day:new Date().getDate(),
      month:new Date().getMonth()+1
    })
    this.getRecommendSong()
    //订阅切换歌曲
    PubSub.subscribe('switchType',(msg,type)=>{
      let {recommendList,index}=this.data
      if(type==='pre'){
        (index===0) && (index=recommendList.length)
        index-=1
      }else{
        (index===recommendList.length-1)&&(index=-1)
        index+=1
      }
      this.setData({
        index
      })
      PubSub.publish('getMusicId',recommendList[index].id)
    })

  },

  //获取每日推荐数据
  async getRecommendSong(){
    let recommendSongData=await request('/recommend/songs')
    this.setData({
      recommendList:recommendSongData.recommend
    })
  },
  //跳转歌曲详情页的回调
  toSongDetail(event){
    let {song,index}=event.currentTarget.dataset
    this.setData({
      index
    })
    wx.navigateTo({
      url:'/pages/songDetail/songDetail?musicId='+song.id
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