// pages/classic/classic.js
import { Base64 } from 'js-base64'
import {ClassicModel} from "../../models/classic";
const classicModel = new ClassicModel()
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
    first:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res)=>{
      this.setData({
        classicData : res
      })
      console.log(this.data.classicData)
    })
    //一开始就加载最新期刊
  },

  onNext:function(){
    classicModel.getNext(this.data.classicData.index,(res)=>{
      this.setData({
        classicData : res,
        latest:classicModel.isLatest(res.index),
        first:classicModel.isFirst(res.index)
      })
    })
  },
  onPrev:function(){
    classicModel.getPrev(this.data.classicData.index,(res)=>{
    /*  let latest = res.index< 8 ? false : true
      let first = res.index === 1 ? true :false*/
      this.setData({
        classicData : res,
        latest:classicModel.isLatest(res.index),
        first:classicModel.isFirst(res.index)
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