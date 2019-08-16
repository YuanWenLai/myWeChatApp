import {BookModel} from '../../models/book'
import {KeywordModel} from '../../models/keyword'

const bookModel = new BookModel()
const keywordModel = new KeywordModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotArray:Array,
    historyArray:Array,
  },
  attached: async function(){
    const result = await bookModel.getHotBookTap()
    const historyWords = keywordModel.getHistory()
    this.setData({
      hotArray:result.hot,
      historyArray:historyWords,
      hasHistory:historyWords.length > 0 ? true : false
    })
  },
  /**
   * 组件的初始数据
   */
  data: {
    isSearching:false,
    hasHistory:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancle(e){
      this.triggerEvent('cancleSearch',{},{})
    },
    onConfirm(event){
      console.log(event.detail.value)
      const inputValue = event.detail.value
      keywordModel.setHistory(inputValue)
    }
  }
})
