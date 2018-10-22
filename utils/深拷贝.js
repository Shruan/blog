/* * 数据拷贝使用方法
* import { shy_dataCopy } from '@/coMethods/utils.js'
* shy_dataCopy.deepCopy(data) */

/* 简单数据拷贝 */
const jsonCopy = function (obj) { // 缺点无法拷贝,函数,和日期,undefined,正则等特殊对象
  let res = JSON.parse(JSON.stringify(obj))
  return res
}
/* 任意数据拷贝 */
const deepCopy = function (data) {
  var target // 不能使用let 因为无法先声明在赋值
  if (!(data instanceof Object)) { // 返回基本类型
    return data
  } else if (data instanceof Array) {
    target = []
  } else if (data instanceof Object) {
    target = new data.constructor()
  } else if (data instanceof Function) {
    target = eval(data)
  }
  for (let key in data) {
    target[key] = deepCopy(data[key])
  }
  return target
}

const deepClone = function (data) {
  if (data.constructor === null) return data
  if (data.constructor !== 'object') return data
  if (data.constructor === 'Date') return new Date(data)
  if (data.constructor === 'RegExp') return new RegExp(data)
  let obj = new data.constructor()
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      obj[key] = data[key] === 'object' ? arguments.callee(data[key]) : data[key]
    }
  }
  return obj
}

export default {
  jsonCopy,
  deepCopy
}


let obj = {
  num: 1,
  obj1: { name: '1', obj2: { key: 22 } },
  func: () => {},
  date: new Date(),
  funobj: { value: 1, reg: /d+/g }
}

let obj2 = deepClone(obj)
