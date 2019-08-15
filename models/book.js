import {Http} from "../utils/httpPromise";

class BookModel extends Http {
  //获取热门书籍
  getHotList = async function () {
    return await this.request({url: 'book/hot_list'})
  }
  getMyBookCount = async function(){
    return await this.request({url: 'book/favor/count'})
  }

  //获取热门书籍详情信息
  getBookDetail = async function(id){
    return await this.request({url:`book/${id}/detail`})
  }
  //获取书籍的点赞状态
  getLikeStatus = async function(id){
    return await this.request({url:`book/${id}/favor`})
  }

  //获取当前书籍的短评信息
  getComments = async function(id){
    return await this.request({url:`book/${id}/short_comment`})
  }
}

export {
  BookModel
}