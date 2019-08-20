// components/music-playing/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    music:Object
  },

  attached:function(){
    console.log(this.data.music)
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

  }
})
