import {Http} from "../utils/httpPromise";

class MyMusicMedol extends Http{

  getMusicIndex=async function(){
    return  await this.request({
      method:'Get',
      url:'music',
    })
  }

  getMusicHotList = async function(){
    return await this.request({
      url:'music/getHotList'
    })
  }
}

export {
  MyMusicMedol
}