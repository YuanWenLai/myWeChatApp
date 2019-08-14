// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    first:Boolean,
    latest:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc:'images/triangle.dis@left.png',
    disRightSrc:'images/triangle.dis@right.png',
    leftSrc:'images/triangle@left.png',
    rightSrc:'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onLeft:function (event) {
      //如果不是最新一期，才触发向左
      if(!this.data.latest){
        this.triggerEvent('left',{},{})
      }
    },
    onRight:function (event) {
      if(!this.data.first){
        this.triggerEvent('right',{},{})
      }
    }
  }
})
