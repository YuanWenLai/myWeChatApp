import {myBehavior} from "../classic-behavior";
const backgroundAudioManager = wx.getBackgroundAudioManager()
Component({

  behaviors: [myBehavior],
  properties:{
    //音乐播放地址
    src:String,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc:'images/player@pause.png',
    playSrc:'images/player@play.png',
    playing:false
  },
  attached:function(){
    this._recoverStatus()
    this._monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function (event) {
      if(!this.data.playing){
        this.setData({
          playing:!this.data.playing
        })
        backgroundAudioManager.title = this.data.title
        backgroundAudioManager.src = this.data.src
      }else {
        this.setData({
          playing:!this.data.playing
        })
        backgroundAudioManager.pause()
      }
    },
    _recoverStatus:function () {
      if(backgroundAudioManager.paused){
        this.setData({
          playing:false
        })
        return
      }
      if(backgroundAudioManager.src == this.data.src){
        this.setData({
          playing:true
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
    }
  }
})
