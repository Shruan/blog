/* 简单实现promise */

function Pm (fn) {
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

export default Pm


function test (isTrue = true) {
  return new Pm(function (resolve, reject) {
    console.log("get...")
    setTimeout(function () {
      console.log("get data")
      if (isTrue) {
        return resolve('success')
      } else {
        return reject('error')
      }
    }, 1000)
  })
}

test().then(function (value, resolve) {
  console.log(value)
  console.log("get...")
  setTimeout(function () {
    console.log("get 2")
    resolve(2)
  }, 1000)
}).then(function (value, resolve) {
  console.log(value)
})

// ——————————————————————————————————————————
// var pro = new P(function (resolve) {
//   console.log("get...")
//   setTimeout(function () {
//     console.log("get 1")
//     return resolve(1)
//   }, 1000)
// })
// ——————————————————————————————————————————
