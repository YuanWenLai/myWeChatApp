import {BookModel} from "../../models/book";
import {LikeModel} from "../../models/like";

const likeModel = new LikeModel()
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    book:null,
    likeStatus:false,
    likeCount:0,
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const id = options.bid
    const book_detail = await bookModel.getBookDetail(id)
    const comments = await bookModel.getComments(id)
    const likeStatus = await likeModel.getBookLikeStatus(id)
    this.setData({
      book:book_detail,
      comments:comments,
      likeStatus:likeStatus.like_status,
      likeCount:likeStatus.fav_nums
    })
  },

  //点赞操作
  onLike:async function(event){
    const behavior = event.detail.behavior
    const id = this.data.book.id
    await likeModel.like(behavior,id,400)
  },

  //输入框点击
  onFakePost:async function(event){
    this.setData({
      posting:true
    })
  },

  onPostCancle:function(){
    this.setData({
      posting:false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})