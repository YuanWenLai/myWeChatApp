import {config} from "../config";

class TokenMedol {
  //1.检验是否token存在且合法
  async verify(){
    const hasToken = wx.getStorageSync('token')
    if(!hasToken){
      await this.getTokenFormServer()
    }else {
      this._verifyFormServer(hasToken)
    }
  }

  _verifyFormServer(toekn){
    console.log('verify..')
    const that = this
    wx.request({
      url:config.api_base_url+'token/verify',
      method:"Post",
      data:{
        token:toekn
      },
      success:(ret)=>{
        const tokenStatus = ret.data.result
        if(!tokenStatus){
          that.getTokenFormServer()
        }
      },
    })
  }

  getTokenFormServer(callBack){
    wx.login({
      success(res) {
        wx.request({
          url:config.api_base_url+'token/',
          method:"Post",
          data:{
            account:res.code,
            type:100
          },
          success:(ret)=>{
            console.log('logining...')
            wx.setStorageSync('token',ret.data.token)
            callBack && callBack(ret.data.token)
          },
        })
      }
    })
  }
}

export {
  TokenMedol
}
