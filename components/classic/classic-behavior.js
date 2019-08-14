//behaviors 是用于组件间代码共享的特性，类似于一些编程语言中的“mixins”或“traits”
let myBehavior =  Behavior({
  properties: {
    img:String,
    content:String
  }
})

export {myBehavior}