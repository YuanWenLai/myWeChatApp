import {BookModel} from "../../models/book";
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatartUrl:'',
    userName:'',
    authorized:false,
    count:0
  },

  //用戶登陆授权
  onGetUserInfo(event){
    if(event.detail.cloudID){
      this.setData({
        avatarUrl:event.detail.userInfo.avatarUrl,
        userName:event.detail.userInfo.nickName,
        authorized:true
      })
    }
  },

  //跳转个人介绍
  onJumpToAbout(){
    wx.navigateTo({
      url:`/pages/about/about`
    })
  },

  //跳转个人学习
  onStudy(){
    wx.navigateTo({
      url:`/pages/study/study`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    //只要授权过才能触发getUserInfo
    wx.getUserInfo({
      success: res =>  {
        if(res.cloudID){
          this.setData({
            avatarUrl:res.userInfo.avatarUrl,
            userName:res.userInfo.nickName,
            authorized:true
          })
        }
      }
    })
    this.setData({
      count: await bookModel.getFavorCount()
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