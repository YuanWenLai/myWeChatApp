import {KeywordModel} from '../../models/keyword'
import {BookModel} from '../../models/book'

const bookModel = new BookModel()
const keywordModel = new KeywordModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    historyArray:Array,
    hotArray:Array,
    dataArray:Array,
    inputValue:null
  },
  attached: async function(){
    const historyWords = keywordModel.getHistory()
    this.setData({
      historyArray:historyWords,
      hasHistory:historyWords.length > 0 ? true : false
    })

  },
  /**
   * 组件的初始数据
   */
  data: {
    isSearching:false,
    hasHistory:false,
    noResult:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //取消搜索框
    onCancle(e){
      this.triggerEvent('cancleSearch',{},{})
    },

    //清除搜索内容，返回搜索框
    onClean(e){
      this.setData({
        isSearching:false,
        inputValue:''
      })
    },

    //点击确认搜索书籍
    onConfirm:async function(event){
      const inputValue = event.detail.value || event.detail.text
      this.setData({
        isSearching:true,
        inputValue
      })
      wx.showLoading({title:'努力加载中...'})
      await bookModel.search(0,inputValue)
        .then(res=>{
          this.setData({
            dataArray:res.books,
          })
          keywordModel.setHistory(inputValue)
        })
        .catch(err=>{
          wx.showToast({
            title:'抱歉，无法连接'
          })
        })
      this.setData({
        noResult:this.data.dataArray.length == 0 ? true : false
      })
      wx.hideLoading()
    }
  }
})
