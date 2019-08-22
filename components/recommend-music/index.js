import {HandlePlay} from '../../models/handlePlay'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    music:Object
  },

  attached:function(){

  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMusicPlay:function (event) {
      const handlePlay = new HandlePlay(this)
      handlePlay.handleDispatchPlay()
    }
  }
})
