import {Http} from "../utils/httpPromise";

class LikeModel extends Http{
  like =async function(behavior,artId,category){
    let url = behavior == 'like' ? 'like' : "like/cancle"
    const result = await this.request({
      url:url,
      method:'Post',
      data: {
        art_id:artId,
        type:category
      }
    })
    return result
  }
  getClassicLikeStatus = async function(artId,category){
    const result = await this.request({
      url: 'classic/'+category+'/'+artId+'/favor',
    })
    return result
  }
}

export {LikeModel}