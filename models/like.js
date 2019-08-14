import {Http} from "../utils/http";

class LikeModel extends Http{
  like(behavior,artId,category){
    let url = behavior == 'like' ? 'like' : "like/cancle"
    this.request({
      url:url,
      method:'Post',
      data: {
        art_id:artId,
        type:category
      }
    })
  }
  getClassicLikeStatus(artId,category,callback){
    this.request({
      url: 'classic/'+category+'/'+artId+'/favor',
      success:callback
    })
  }
}

export {LikeModel}