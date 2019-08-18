import { Base64 } from 'js-base64'
import {config} from '../config.js'

const tips = {
  1:'抱歉，出现了错误',
  1001:'找不到资源',
  2001:'点赞错误',
  3001:'期刊不存在'
}
class Http {
  async request({url, data={}, method="Get"}){
    /*
    * 1.
    * */
    const hasToken = wx.getStorageSync('token')
    if(!hasToken){
      await this._autoLogin()
    }
    /*else if(hasToken){
      console.log('checkToken')
      wx.request({
        url:config.api_base_url+'token/verify',
        method:"Post",
        data:{
          token:hasToken
        },
        success:(ret)=>{
          const tokenStatus = ret.data.result
          if(!tokenStatus){
            console.log('expire!')
            this._autoLogin()
            this.request({url})
          }
          //wx.setStorageSync('token',ret.data.token)
        },
      })
    }*/
    return await new Promise((resolve,reject)=>{
        wx.request({
        url:config.api_base_url+url,
        method:method,
        data:data,
        header: {
          Authorization: this._encode()
        },
        success:(res)=>{
          /*if(res.data.statusCode === 403){
            this._autoLogin()
            return
          }*/
          const code = res.statusCode
          if(code.toString().startsWith('2')){
            resolve(res.data)
          }else {
            reject()
            this._show_error(res.data.errCodee)
          }
        },
        fail(err) {
          reject()
          this._show_error(1)
        }
      })
    })
  }

  _autoLogin(){
    console.log(233)
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
          },
          fail(err) {
            this._show_error(1)
          }
        })
      }
    })
  }
  _encode() {
    const token = wx.getStorageSync('token')
    console.log(wx.getStorageSync('token'))
    const base64 = Base64.encode(token+ ':')
    return "Basic " + base64
  }

  _show_error(errCode) {
    if (!errCode) {
      errCode = 1
    }
    const tip = tips[errCode]
    wx.showToast({
      title: tip ? tip :tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}


export {Http}