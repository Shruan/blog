/* 简单实现promise */

function Promise (fn) {
  var events = []
  var errorEvents = []
  this.then = function (f) {
    events.push(f)
    return this
  }
  this.catch = function (f) {
    errorEvents.push(f)
    return this
  }
  function resolve (value) {
    var f = events.shift()
    if (f) f(value, resolve, reject)
  }
  function reject (err) {
    var f = errorEvents.shift()
    if (f) {
      console.log(err)
      f(err)
    } else {
      return
    }
  }
  fn(resolve, reject)
}

Promise.prototype.then = (fn) => {
  if (typeof fn !== 'function') throw 'not a function!'
}

Promise.prototype.catch = (fn) => {
  if (typeof fn !== 'function') throw 'not a function!'
}

module.exports = Promise;

//
// function test () {
//   return new promise(function (resolve, reject) {
//     resolve(111)
//   })
// }
