import {Http} from "../utils/http";

class ClassicModel extends Http{
  getLatest(callBack){
    this.request({
      method:'Get',
      url:'classic/latest',
      success:(res)=>{
        callBack(res)
      }
    })
  }
}

export {ClassicModel}