import {MyMusicModel} from "../../models/myMusic";
import {HandlePlay} from "../../models/handlePlay";
const app = getApp();
const myMusicModel = new MyMusicModel()

const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicLists:[],
    recommendList:[],
    isPlaying:false,
    music:{},
    begin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    this.setData({
      musicLists:await myMusicModel.getMusicHotList(),
      recommendList:await myMusicModel.getRecommendList()
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
    const handlePlay = new HandlePlay(this)
    this.setData({
      isPlaying:app.globalData.isPlaying,
      music:wx.getStorageSync('music'),
      begin:wx.getStorageSync('music') ? true : false
    })
    handlePlay._monitorSwitch()
  },

  onPlay:function(event){
    const handlePlay = new HandlePlay(this)
    const stop = event.detail.stop
    handlePlay.onPlay(stop)
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