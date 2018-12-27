/*  ********************  */
/*   扁平数组 构建 树结构    */
/*  ********************  */

// 数据源
const source = [
  { id: 3, parent: 1 },
  { id: 1, parent: null },
  { id: 4, parent: 1 },
  { id: 5, parent: 3 },
  { id: 8, parent: 1 },
  { id: 6, parent: 5 },
  { id: 7, parent: 4 }
]

// 树结构
const result = {
  id: 1,
  parent: null,
  childs: [
    {
      id: 3,
      parent: 1,
      childs: [
        {
          id: 7,
          parent: 3,
          childs: []
        }
      ]
    }
  ]
}

// 算法
function buildTree (source) {
  let tree = {}
  // 获取根节点
  source.forEach((item, index) => {
    if (item.parent === null) {
      tree.id = item.id
      tree.childs = []
      tree.parent = item.parent
      source.splice(index, 1)
    }
  })
  // 递归获取根子节点
  let getTreeItem = function (pid, child) {
    if (source.length === 0) return
    for (let i = 0; i < source.length; i++) {
      if (source[i].parent === pid) {
        let el = {
          id: source[i].id,
          parent: source[i].parent,
          childs: []
        }
        source.splice(i, 1)
        i-- // 修复splice位置错误
        getTreeItem(el.id, el.childs)
        child.push(el)
      }
    }
  }
  getTreeItem(tree.id, tree.childs)
  return tree
}

console.log(buildTree(source))
