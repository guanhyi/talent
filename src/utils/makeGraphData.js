export function makeGraphData (src) {
  var root = {}
  var nodes = src.data.filter(it => {
    return it.oClass === 'Expert' || it.oClass === 'Organization'
  })
  nodes = nodes.map(it => {
    return {
      rid: '#' + it.rid.cluster + ':' + it.rid.position,
      name: it.oData.Name,
      altName: it.oData.AltName,
      organization: it.oData.Organization,
      email: it.oData.Email,
      id: it.oData.Id
    }
  })
  var lines = src.data.filter(it => {
    return it.oClass === 'ExpertOrganization'
  })
  lines = lines.map(it => {
    return {
      pid: '#' + it.oData.in.cluster + ':' + it.oData.in.position,
      id: '#' + it.oData.out.cluster + ':' + it.oData.out.position
    }
  })
  function buildTree (lines) {
    for (let line of lines) {
      root = deepFind(root, line)
    }
    return root
  }
  function getNode (id) {
    for (let node of nodes) {
      if (node.rid === id) {
        return { id: id, name: node.name, children: [] }
      }
    }
  }

  function deepFind (root, line) {
    if (root.id && root.id === line.id) {
      var newRoot = getNode(line.pid)
      newRoot.children.push(root)
      root = newRoot
      return root
    }
    if (!root.id) {
      root = getNode(line.pid)
      root.children.push(getNode(line.id))
    //   found = true
    } else if (root.id === line.pid) {
      root.children.push(getNode(line.id))
    //   found = true
    } else {
      for (let child of root.children) {
        deepFind(child, line)
      }
    }
    return root
  }
  return buildTree(lines)
}