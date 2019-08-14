// pages/classic/classic.js
import { Base64 } from 'js-base64'
import {ClassicModel} from "../../models/classic";
import {LikeModel} from "../../models/like";

const classicModel = new ClassicModel()
const likeModel = new LikeModel()
Page({
  // 用于校验token
  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInNjb3BlIjo4LCJpYXQiOjE1NjUwNzg4OTQsImV4cCI6MTU2NzY3MDg5NH0.RSC0fxDeIKcT2VYK1rK1ouviT0wAzW6ZNj2L7061sRA' + ':')
    return "Basic " + base64
  },
  /**
   * 页面的初始数据
   */
  
  data: {
    classicData:null,
    latest:true,
    first:false,
    likeStatus:false,
    likeCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res)=>{
      this.setData({
        classicData : res,
        likeStatus:res.like_status,
        likeCount:res.fav_nums
      })
    })
    //一开始就加载最新期刊
  },
  onLike:function(event){
    const behavior = event.detail.behavior
    likeModel.like(behavior,this.data.classicData.id,this.data.classicData.type)
  },

  onNext:function(){
    this._updateClassic('next')
  },
  onPrev:function(){
    this._updateClassic('prev')
  },

  //更新期刊状态
  _updateClassic(nextOrPrev){
    classicModel.getClassic(this.data.classicData.index,nextOrPrev,(res)=>{
      this._getClassicStatus(res.id,res.type)
      this.setData({
        classicData : res,
        latest:classicModel.isLatest(res.index),
        first:classicModel.isFirst(res.index)
      })
    })
  },

  //获取点赞信息
  _getClassicStatus(artId,category){
    likeModel.getClassicLikeStatus(artId,category,(res)=>{
      this.setData({
        likeStatus:res.like_status,
        likeCount:res.fav_nums
      })
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