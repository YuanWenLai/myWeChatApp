import {Http} from "../utils/httpPromise";

class ClassicModel extends Http{
  //获取最新一期
    getLatest= async function(){

   const ret = await this.request({
      method:'Get',
      url:'classic/latest',
    })
    //成功后，缓存index和res
    this._setLatestIndes(ret.index)
    wx.setStorageSync(this._getKey(ret.index),ret)

    return ret
  }
  //获取上一期获取下一期
   getClassic(index,nextOrPrev){
    //先确定key是下期还是上期
    let key = nextOrPrev == 'next' ?this._getKey(index+1) :this._getKey(index-1)
    //通过这个key向缓存询问,如果没有再请求一次
    let classic = wx.getStorageSync(key)
    if(!classic){
      //classic是一个Promise的对象
       classic =  this.request({
        method:'Get',
        url:'classic/'+index+'/'+nextOrPrev,
      })
      //缓存期刊
      classic.then(res=>{
        wx.setStorageSync(this._getKey(res.index),res)
       })
    }
    return Promise.resolve(classic)
  }

  //获取用户收藏期刊
  getMyClassFavor=async function(){
    return  await this.request({
      method:'Get',
      url:'classic/favor',
    })
  }

  //获得某一期的详情信息
  getClassDetail=async function(type,id){
    return  await this.request({
      method:'Get',
      url:`classic/${type}/${id}`,
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

  //设置存放缓存的key
  _getKey(index){
    return 'classic-'+index
  }
}

export {ClassicModel}