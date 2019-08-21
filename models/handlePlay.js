const backgroundAudioManager = wx.getBackgroundAudioManager()
const app = getApp();

class HandlePlay {
  constructor(that){
    this.that = that
  }
  //控制跳转页面并播放
  handleDispatchPlay(){
    const _that = this.that
    wx.navigateTo({
      url: '/pages/music-play/music-play',
      events: {},
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('sendData', { data:_that.data.music })
      }
    })
  }
  //控制播放
  onPlay(Status){
    if (!Status || !app.globalData.isPlaying) {
      app.globalData.isPlaying = true
      this.that.setData({
        isPlaying:true
      })
      backgroundAudioManager.title = this.that.data.music.title
      backgroundAudioManager.singer = this.that.data.music.singer
      backgroundAudioManager.coverImgUrl = this.that.data.music.image
      backgroundAudioManager.src = this.that.data.music.url
      wx.setStorageSync('music',this.that.data.music)
    }else {
      app.globalData.isPlaying = false
      this.that.setData({
        isPlaying:false
      })
      backgroundAudioManager.pause()
    }
  }
  //检查是否播放状态
  _recoverStatus() {

    if(backgroundAudioManager.paused){
      app.globalData.isPlaying = false
      this.that.setData({
        isPlaying:false
      })
      return
    }
    if (backgroundAudioManager.play){
      app.globalData.isPlaying = true
      this.that.setData({
        isPlaying:true
      })
      return
    }
  }
  //播放器监听事件
  _monitorSwitch () {
    backgroundAudioManager.onPlay(()=>{
     this._recoverStatus()
    })
    backgroundAudioManager.onPause(()=>{
      this._recoverStatus()
    })
    backgroundAudioManager.onStop(()=>{
      console.log('isStop')
      this._recoverStatus()
    })
    backgroundAudioManager.onEnded(()=>{
      console.log('isEnded')
      this._recoverStatus()
    })
  }
}

module.exports = {
  HandlePlay
}