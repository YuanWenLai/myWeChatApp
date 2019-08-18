import { Base64 } from 'js-base64'
import {config} from '../config.js'
import {TokenMedol} from "../models/token";

const tips = {
  1:'抱歉，出现了错误',
  1001:'找不到资源',
  2001:'点赞错误',
  3001:'期刊不存在'
}
class Http {
  async request({url, data={}, method="Get"}){
    return await new Promise((resolve,reject)=>{
        this._request(url,data,method,resolve,reject)
    })
  }

  //检查令牌失效，二次重发
  _refresh(url,data,method,resolve,reject){
    //二次重发机制，再次重发后，hadRefresh设置true，证明已经刷新过，防止无限循环
    const tokenMedol = new TokenMedol()
    tokenMedol.getTokenFormServer((token)=>{
      this._request(url,data,method,resolve,reject,true)
    })
  }

  //封装请求函数
  _request(url,data,method,resolve,reject,hadRefresh=false){
    wx.request({
      url:config.api_base_url+url,
      method:method,
      data:data,
      header: {
        Authorization: this._encode()
      },
      success:(res)=>{
        const code = res.statusCode
        if(code.toString().startsWith('2')){
          resolve(res.data)
        }else {
          if(res.statusCode === 403){
            if(!hadRefresh){
              this._refresh(url,data,method,resolve)
            }
          }else {
            reject()
            this._show_error(res.data.errCodee)
          }
        }
      },
      fail(err) {
        reject()
        this._show_error(1)
      }
    })
  }


  //将token再次编译，用于Authorization检测
  _encode() {
    const token = wx.getStorageSync('token')
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