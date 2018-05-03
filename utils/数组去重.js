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
  /* 复杂数组比较去重 */
  complexArr: function (arr1, arr2) {
    let idArr = []
    let newArr = []
    for (let val of arr1) {
      idArr.push(val.id)
    }
    newArr = arr2.filter(item => {
      return idArr.indexOf(item.id) !== -1
    })
    return newArr
  }
}
