/*
* 使用方法
* import { shy_unique } from '@/coMethods/utils.js'
* shy_unique.simpleArr(arr)
*/

export const shy_unique {
  /* 简单数组去重 */
  // 方法 1
  simpleArr: function (arr) {
    return Array.from(new Set(arr))
  },
  // 方法 2
  simpleArr2: function (arr) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
      if (newArr.indexOf(arr[i]) === -1) {
        newArr.push(arr[i])
      }
    }
    return newArr
  },
  /* 复杂数组根据唯一值比较去重 */
  complexArr: function (arr1, arr2, key) {
    let keyArr = arr1.map(item => item[key])
    let newArr = arr2.filter(item => {
      return keyArr.indexOf(item[key]) !== -1
    })
    return newArr
  },
  /* 复杂数组比较去重 */
  // 简单数组 isContained([1, 2, 3], [1,2])
  isContained: function (a, b) {
    if (!(a instanceof Array) || !(b instanceof Array)) return false
    if (a.length < b.length) return false
    var aStr = a.toString()
    for (var i = 0, len = b.length; i < len; i++) {
      if (aStr.indexOf(b[i]) === -1) return false
    }
    return true
  }
}
