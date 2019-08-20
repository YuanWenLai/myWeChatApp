
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicList:Object
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
     const that = this
      wx.navigateTo({
        url: '/pages/music-play/music-play',
        events: {},
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('sendData', { data:that.data.musicList })
        }
      })
    }
  }
})
