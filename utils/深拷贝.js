/*
* 数据拷贝使用方法
* import { shy_dataCopy } from '@/coMethods/utils.js'
* shy_dataCopy.deepCopy(data)
*/

/* 简单数据拷贝 */
const jsonCopy = function (obj) { // 缺点无法拷贝,函数,和日期,undefined,正则等特殊对象
 let res  = JSON.parse(JSON.stringify(obj))
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
    target = {}
  } else if( data instanceof Function) {
    target = eval(data)
  }
  for (let key in data) {
    target[key] = deepCopy(data[key])
  }
  return target
}

export const shy_dataCopy {
  jsonCopy,
  deepCopy
}
