import {BookModel} from "../../models/book";
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    book:null,
    likeStatus:false,
    likeCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const id = options.bid
    const book_detail = await bookModel.getBookDetail(id)
    const comments = await bookModel.getComments(id)
    this.setData({
      book:book_detail,
      comments:comments
    })
    console.log(this.data.comments)
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