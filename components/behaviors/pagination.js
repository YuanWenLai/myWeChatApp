const paginationBev = Behavior({
  properties: {
    dataArray:Array,
    more:{
      type:String,
      observer:'_load_more'
    }
  },
  data:{
    noResult:false,
    inputValue:'',
    loading:false,
    total:0
  },
  methods:{
    //设置搜索的数据
    setMoreData(data){
      const tempArray = [...this.data.dataArray,...data]
      this.setData({
        dataArray:tempArray
      })

    },
    //设置书籍的总数
    setTotal(total){
      this.setData({
        total:total
      })
    },
    //检查搜索是否有结果
    cheackResult(){
      this.setData({
        noResult:this.data.dataArray.length == 0 ? true : false
      })
    },
    //显示消息提示框
    myShowToast(title,icon='none'){
      wx.showToast({
        title:title,
        icon
      })
    },
    //设置搜索状态
    setSearching(inputValue){
      this.setData({
        isSearching:true,
        inputValue
      })
    },
    //显示加载loading
    myShowLoading(title){
      wx.showLoading({
        title:title
      })
    },
    //设置请求锁
    isLocked(status){
      this.setData({
        loading:status
      })
    },
    hasMore(){
      const lenght = this.getArrarLenght()
      return lenght !== 0 && this.data.loading === false && lenght<this.data.total
    },
    getArrarLenght(){
      return this.data.dataArray.length
    }
  }

})

export {
  paginationBev
}