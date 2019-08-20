
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
      const content = this.data.musicList.content
      const image = this.data.musicList.image
      const fav_nums = this.data.musicList.fav_nums
      wx.navigateTo({
        url:`/pages/music-album/music-album?type=${type}&image=${image}&content=${content}&fav_nums=${fav_nums}`,
      })
    }
  }
})
