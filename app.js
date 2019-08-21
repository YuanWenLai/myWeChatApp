import {TokenMedol} from "./models/token";

App({
  onLaunch: function () {
    const tokenMedol = new TokenMedol()
    tokenMedol.verify()
  },
  globalData: {
    userInfo: null,
    isPlaying:false
  }
})