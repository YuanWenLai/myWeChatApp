const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music:null,
    playUrl:'/images/icon/play.png',
    pauseUrl:'/images/icon/pause.png',
    isPlaying:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const that = this
    //先接受数据，在监听音乐
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('sendData', function(data) {
      that.setData({
        music:data.data
      })
    })
    if(!this.data.isPlaying){
      this.onPlay()
    }
    const url = this.data.music.url
    this._recoverStatus(url)
    this._monitorSwitch()

  },
  //点击播放暂停
  onPlay:function (event) {
    if(!this.data.isPlaying){
      this.setData({
        isPlaying:true
      })
      backgroundAudioManager.title = this.data.music.title
      backgroundAudioManager.src = this.data.music.url
    }else {
      this.setData({
        isPlaying:false
      })
      backgroundAudioManager.pause()
    }
  },
  //检查是否播放状态
  _recoverStatus:function (url) {
    if(backgroundAudioManager.paused){
      this.setData({
        isPlaying:false
      })
      return
    }
    if(backgroundAudioManager.src == url){
      this.setData({
        isPlaying:true
      })
    }
  },
  //播放器监听事件
  _monitorSwitch:function () {
    backgroundAudioManager.onPlay(()=>{
      this._recoverStatus()
    })
    backgroundAudioManager.onPause(()=>{
      this._recoverStatus()
    })
    backgroundAudioManager.onStop(()=>{
      this._recoverStatus()
    })
    backgroundAudioManager.onEnded(()=>{
      this._recoverStatus()
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