// 冒泡排序
function bubbleSort(arr) {
  let low = 0
  let high = arr.length - 1 // 设置变量的初始值
  let tmp, j
  console.time('冒泡排序耗时')
  while (low < high) {
    let pos1 = 0
    let pos2 = 0
    for (let i = low; i < high; i++) { // 正向冒泡,找到最大者
      if (arr[i] > arr[i + 1]) {
        tmp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = tmp
        pos1 = i  // 最后一次交换的位置
      }
    }
    high = pos1 // 记录上次位置
    for (let j = high; j > low; j--) { // 反向冒泡,找到最小者
      if (arr[j] < arr[j - 1]) {
        tmp = arr[j]
        arr[j] = arr[j - 1]
        arr[j - 1] = tmp
        pos2 = j // 最后一次交换的位置
      }
    }
    low = pos2 //修改low值
  }
  console.timeEnd('冒泡排序耗时')
  return arr
}

// 快速排序
function quickSort(arr) {　　
  let len = arr.length　
  let minIndex, temp　
  console.time('选择排序耗时')　
  for (let i = 0; i < len - 1; i++) {　　　　
    minIndex = i　　　
    for (let j = i + 1; j < len; j++) {　　　　　　
      if (arr[j] < arr[minIndex]) { // 寻找最小的数
        minIndex = j // 将最小数的索引保存
      }　　　　
    }　　　　
    temp = arr[i]　　　
    arr[i] = arr[minIndex]　　　
    arr[minIndex] = temp　
  }　　
  console.timeEnd('选择排序耗时')　
  return arr
}
