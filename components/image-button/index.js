// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  //允许使用插槽
  options:{
    multipleSlots:true
  },
  properties: {
    openType:{
      type:String
    }
  },

  attached:function(){
    /*console.log(11)
    console.log(this.data.openType)*/
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
    onGetUserInfo(event){
      console.log(323)
      this.triggerEvent('getuserinfo',event.detail,{})
    }
  }
})
