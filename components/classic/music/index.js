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
    }
  }
})
