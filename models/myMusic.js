import {Http} from "../utils/httpPromise";

class MyMusicModel extends Http{

  //获取热门歌单
  getMusicHotList = async function(){
    return await this.request({
      url:'music/getHotList'
    })
  }

  //获取推荐歌单
  getRecommendList = async function(){
    return await this.request({
      url:'music/recommendMusic'
    })
  }

  //获取单个专辑的歌单
  getMusicAlbum = async function (type) {
    return await this.request({
      url:`music/musicList/${type}`
    })
  }
}

export {
  MyMusicModel
}