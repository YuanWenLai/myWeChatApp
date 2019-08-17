// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object
  },

  /**
   * 组件的初始数据
   */
  attached:function () {
    if (this.data.book.fav_nums == null){
      this.setData({
        hasFavNums:true
      })
    }
  },
  data: {
    hasFavNums:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //页面跳转
    onTap(e){
      const bid = this.data.book.id
      wx.navigateTo({
        url:`/pages/book-detail/book-detail?bid=${bid}`
      })
    }
  }
})
