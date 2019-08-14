import {Http} from "../utils/http";

class ClassicModel extends Http{
  //获取最新一期
  getLatest(callBack){
    this.request({
      method:'Get',
      url:'classic/latest',
      success:(res)=>{
        this._setLatestIndes(res.index)
        callBack(res)
      }
    })
  }
  //获取上一期
  getPrev(index,callback){
    this.request({
      method:'Get',
      url:'classic/'+index+'/prev',
      success:(res)=>{
        callback(res)
      }
    })
  }
  //获取下一期
  getNext(index,callback){
    this.request({
      method:'Get',
      url:'classic/'+index+'/next',
      success:(res)=>{
        callback(res)
      }
    })
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
}

export {ClassicModel}