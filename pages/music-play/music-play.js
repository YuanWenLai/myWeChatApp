import {HandlePlay} from "../../models/handlePlay";

const backgroundAudioManager = wx.getBackgroundAudioManager()
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    music:null,
    playUrl:'/images/icon/play.png',
    pauseUrl:'/images/icon/pause.png',
    isPlaying:false,
    begin:false,
    test:123
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const that = this
    const handlePlay = new HandlePlay(that)
    //先接受数据，在监听音乐
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('sendData', function(data) {
      that.setData({
        music:data.data,
      })
    })
    const isMusic = this.data.music.id == wx.getStorageSync('music').id
    if(!app.globalData.isPlaying || !isMusic){
      this.onPlay(isMusic)
    }
    handlePlay._recoverStatus()
    handlePlay._monitorSwitch()
  },
  //点击播放暂停
  onPlay:function (isMusic) {
    const handlePlay = new HandlePlay(this)
    handlePlay.onPlay(isMusic)
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
    console.log('myMusicPlaying')
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