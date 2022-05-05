// pages/search/search.js
import request from "../../utils/request";
let isSend=null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords:'',
    hotList:[],
    searchContent:'',
    searchList:[],
    historyList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.searchInit()
    this.getHistoryList()
  },
  //获取搜索历史
  getHistoryList(){
    let historyList=wx.getStorageSync('searchList')
    if(historyList){
      this.setData({
        historyList
      })
    }
  },
  //初始化数据
  async searchInit(){
    let wordsData=await request('/search/default')
    let hotListData=await request('/search/hot/detail')
    this.setData({
      keywords:wordsData.data.showKeyword,
      hotList:hotListData.data
    })
  },
  //处理搜索内容
  handleInputChange(event){
    if(isSend){
      clearTimeout(isSend)
    }
    isSend=setTimeout(()=>{
      this.setData({
        searchContent:event.detail.value.trim()
      })
      this.getSearchList()
    },300)
  },
  //获取搜索数据
  async getSearchList() {
    let {searchContent, historyList} = this.data
    if (!searchContent) {
      this.setData({
        searchList: []
      })
      return;
    }
    let searchListData = await request('/search', {keywords: searchContent, limit: 10})
    if(historyList.indexOf(searchContent)!=-1){
      historyList.splice(historyList.indexOf(searchContent),1)
    }
    historyList.unshift(searchContent)
    this.setData({
      searchList: searchListData.result.songs,
      historyList
    })
    wx.setStorageSync('searchList', historyList)
  },
  //清空搜索内容
  clearSearchContent(){
    this.setData({
      searchContent:'',
      searchList:[]
    })
  },
  //删除搜索记录
  deleteSearchHistory(){
    wx.showModal({
      content:'确定删除吗？',
      success:(res)=>{
        if(res.confirm){
          this.setData({
            historyList:[]
          })
          wx.removeStorageSync('searchList')
      }
    }
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