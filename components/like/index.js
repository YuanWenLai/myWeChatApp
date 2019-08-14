// components/like/index.js


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean,
    },
    count:{
      type: Number,
      value:233
    },
    art_id:{
      type:Number
    },
    type:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc:'images/like.png',
    noSrc:'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(e){
      let like = !this.data.like
      let count = like?this.data.count+1 : this.data.count-1
      this.setData({
        count:count,
        like:like,
      })
      //激活点赞事件
      let behavior = this.data.like ? 'like':'cancle'
      this.triggerEvent('like',{behavior:behavior},{})
    },
  }
})
