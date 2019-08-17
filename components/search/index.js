import {KeywordModel} from '../../models/keyword'
import {BookModel} from '../../models/book'
import {paginationBev} from "../behaviors/pagination";

const bookModel = new BookModel()
const keywordModel = new KeywordModel()
Component({
  /**
   * 组件的属性列表
   */

  //用behavior来定义属性
  behaviors:[paginationBev],

  properties: {
    historyArray:Array,
    hotArray:Array,
    //dataArray:Array,
    more:{
      type:String,
      observer:'loadMore'
    }
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
    noResult:false,
    inputValue:'',
    loading:false,
    total:0
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


    loadMore:async function(){
      //用loading来控制，一次只加载一条请求，锁的思想,total来控制没有更多数据请求
      if(this.hasMore()){
        this.myShowLoading('努力中...')
        this.isLocked(true)
        await bookModel.search(this.getArrarLenght(),this.data.inputValue)
          .then(ret=>{
            this.setMoreData(ret.books)
          })
          .catch(err=>{
            this.myShowToast('抱歉，无法连接')
          })
        this.isLocked(false)
        wx.hideLoading()
        return
      }
      if(this.getArrarLenght() === 11){
        this.myShowToast('没有更多')
      }
    },


    //点击确认搜索书籍
    onConfirm:async function(event){
      const inputValue = event.detail.value || event.detail.text
      if (!inputValue) {
        this.myShowToast('输入不能为空')
        return
      }
      this.setSearching(inputValue)
      this.myShowLoading('努力中...')
      await bookModel.search(0,inputValue)
        .then(res=>{
          this.setMoreData(res.books)
          this.setTotal(res.total)
          keywordModel.setHistory(inputValue)
        })
        .catch(err=>{
          this.myShowToast('抱歉，无法连接')
        })
      this.cheackResult()
      wx.hideLoading()
    }
  }
})
