class KeywordModel {
  key='q'
  max=10
  //设置缓存搜索关键字
  getHistory(){
    const words = wx.getStorageSync(this.key)
    if(!words){
      return []
    }
    return words
  }

  setHistory(keyword){
    let words = this.getHistory()
    const has = words.includes(keyword)
    if(!has){
      const length = words.length
      if (length >= this.max){
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}

export {
  KeywordModel
}