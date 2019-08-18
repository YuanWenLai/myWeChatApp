import {Http} from "../utils/httpPromise";

class MyMusicMedol extends Http{
  //获取用户收藏期刊
  getMusicIndex=async function(){
    return  await this.request({
      method:'Get',
      url:'music',
    })
  }
}

export {
  MyMusicMedol
}