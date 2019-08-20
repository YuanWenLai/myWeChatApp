
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
attached:function(){
},
  /**
   * 组件的方法列表
   */
  methods: {
    onMusicList:function () {
      const type = this.data.musicList.type
      const image = this.data.musicList.image
      wx.navigateTo({
        url:`/pages/music-album/music-album?type=${type}&image=${image}`,
      })
    }
  }
})
