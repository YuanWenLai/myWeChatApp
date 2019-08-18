import {BookModel} from "../../models/book";
import {ClassicModel} from "../../models/classic";

const bookModel = new BookModel()
const classModel = new ClassicModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatartUrl:'',
    userName:'',
    authorized:false,
    count:0,
    classics:null
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

  //点击个人喜欢周刊跳转
  onPriview:async function(event){
    const id = event.detail.id
    const type = event.detail.type
    const result = await classModel.getClassDetail(type,id)
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail`,
      events: {
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: result })
      }
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
    //获取用户喜欢的
    this.setData({
      count: await bookModel.getFavorCount(),
      classics:await classModel.getMyClassFavor()
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