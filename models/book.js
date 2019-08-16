import {Http} from "../utils/httpPromise";

class BookModel extends Http {
  //获取热门书籍
  getHotList = async function () {
    return await this.request({url: 'book/hot_list'})
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

  //提交评论
  postComment = async function(bid,content){
    return await this.request({
      url:'book/add/short_comment',
      data:{
        book_id:bid,
        content
      },
      method:'Post'
    })
  }

  //获取热门搜索书籍标签
  getHotBookTap = async function(){
    return await this.request({url:'book/hot_keyword'})
  }

  //搜索书籍
  search = async function(start,q){
    return await this.request({
      url:'book/search',
      data:{
        q,
        start
      }
    })
  }
}

export {
  BookModel
}