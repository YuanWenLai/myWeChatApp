import {BookModel} from "../../models/book";
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList:[],
    searching:false,
    hotBookArray:[]
  },

  //点击打开搜索
  onSearch:function(e){
    this.setData({
      searching : true
    })
  },

  //点击取消关闭搜索
  onCancle:function(){
    this.setData({
      searching : false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    const result = await bookModel.getHotBookTap()
    //一开始就加载热门书籍
    this.setData({
      bookList: await bookModel.getHotList(),
      hotBookArray:result.hot
    })
    console.log(this.data.hotBookArray)
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