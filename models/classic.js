import {Http} from "../utils/http";

class ClassicModel extends Http{
  //获取最新一期
  getLatest(callBack){
    this.request({
      method:'Get',
      url:'classic/latest',
      success:(res)=>{
        //成功后，缓存index和res
        this._setLatestIndes(res.index)
        wx.setStorageSync(this._getKey(res.index),res)
        callBack(res)
      }
    })
  }
  //获取上一期获取下一期
  getClassic(index,nextOrPrev,callback){
    //先确定key是下期还是上期
    let key = nextOrPrev == 'next' ?this._getKey(index+1) :this._getKey(index-1)
    //通过这个key向缓存询问,如果没有再请求一次
    let classic = wx.getStorageSync(key)
    if(!classic){
      this.request({
        method:'Get',
        url:'classic/'+index+'/'+nextOrPrev,
        success:(res)=>{
          wx.setStorageSync(this._getKey(res.index),res)
          callback(res)
        }
      })
    }else {
      callback(classic)
    }
  }


  isFirst(index){
    return index === 1?true:false
  }

  isLatest(index){
    let latestIndex = this._getLatestIndex()
    return latestIndex ==index ? true:false
  }

  _setLatestIndes(index){
    wx.setStorageSync('latest',index)
  }

  _getLatestIndex(){
    let index = wx.getStorageSync('latest')
    return index
  }

  //设置存放缓存的key
  _getKey(index){
    return 'classic-'+index
  }
}

export {ClassicModel}