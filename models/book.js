import {Http} from "../utils/httpPromise";

class BookModel extends Http {
  //获取热门书籍
  getHotList = async function () {
    return await this.request({url: 'book/hot_list'})
  }
  getMyBookCount = async function(){
    return await this.request({url: 'book/favor/count'})
  }
}

export {
  BookModel
}