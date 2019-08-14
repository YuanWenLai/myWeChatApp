import { Base64 } from 'js-base64'
import {config} from '../config.js'

const tips = {
  1:'抱歉，出现了错误',
  1001:'找不到资源',
  2001:'点赞错误',
  3001:'期刊不存在'
}
class Http {
  request({url, data={}, method="Get"}){
    return new Promise((resolve,reject)=>{
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

  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInNjb3BlIjo4LCJpYXQiOjE1NjUwNzg4OTQsImV4cCI6MTU2NzY3MDg5NH0.RSC0fxDeIKcT2VYK1rK1ouviT0wAzW6ZNj2L7061sRA' + ':')
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