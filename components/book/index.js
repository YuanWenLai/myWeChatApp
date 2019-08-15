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
    //console.log(this.data.book)
  },
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e){
      const bid = this.data.book.id
      wx.navigateTo({
        url:`/pages/book-detail/book-detail?bid=${bid}`
      })
    }
  }
})
