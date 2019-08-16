// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  //获取外部样式
  externalClasses: ['tag-class'],
  properties: {
    text:String,
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
    onPost(event){
      this.triggerEvent('trigger',{text:this.data.text},{})
    }
  }
})
