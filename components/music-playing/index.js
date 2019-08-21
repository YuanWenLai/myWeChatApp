import {HandlePlay} from '../../models/handlePlay'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    music:Object,
    isPlaying:Boolean,
    begin:Boolean
  },

  attached:function(){

  },
  //主页面传的数据，组件在生命周期的ready拿到
  ready:function(){

  },
  /**
   * 组件的初始数据
   */
  data: {
    playUrl:'/images/icon/play@.png',
    pauseUrl:'/images/icon/pause@.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlePlay:function () {
      console.log(this.data.isPlaying)
      const stop = this.data.isPlaying
      this.triggerEvent('playStatus',{stop:stop},{})
    },
    handleDispatch:function () {
      const handlePlay = new HandlePlay(this)
      handlePlay.handleDispatchPlay()
    }
  }
})
