
import {ClassicModel} from "../../models/classic";
import {LikeModel} from "../../models/like";

const classicModel = new ClassicModel()
const likeModel = new LikeModel()
Page({
  /**
   * 页面的初始数据
   */

 /* properties: {
    cid: Number,
    type: Number,
    needNavi:{
      type:Boolean,
      value:true
    }
  },*/
  
  data: {
    classicData:null,
    latest:true,
    first:false,
    likeStatus:false,
    likeCount:0,
    needNavi:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(){
    //一开始就加载最新期刊
    const res = await classicModel.getLatest()
    this.setData({
      classicData : res,
      likeStatus:res.like_status,
      likeCount:res.fav_nums
    })
  },
  onLike:async function(event){
    const behavior = event.detail.behavior
    await likeModel.like(behavior,this.data.classicData.id,this.data.classicData.type)
  },

  onNext:function(){
    this._updateClassic('next')
  },
  onPrev:function(){
    this._updateClassic('prev')
  },

  //更新期刊状态
  _updateClassic:async function(nextOrPrev){
    const result = await classicModel.getClassic(this.data.classicData.index,nextOrPrev)
    this._getClassicStatus(result.id,result.type)
    this.setData({
      classicData : result,
      latest:classicModel.isLatest(result.index),
      first:classicModel.isFirst(result.index)
    })
  },

  //获取点赞信息
  _getClassicStatus:async function(artId,category){
    const result = await likeModel.getClassicLikeStatus(artId,category)
    this.setData({
      likeStatus:result.like_status,
      likeCount:result.fav_nums
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
    console.log(111)
  }
})