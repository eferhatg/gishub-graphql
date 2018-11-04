import * as _c from 'lodash/collection'
import * as _l from 'lodash/lang'


// Fetched data is flatten. We are creating unflatten tree json.
const unflatten = function (array, parent, tree) {

  tree = typeof tree !== 'undefined' ? tree : [];
  parent = typeof parent !== 'undefined' ? parent : {
    key: "0"
  };


  var children = _c.filter(array, function (child) {

    // eslint-disable-next-line 
    return child.parentId == parent.key; 
  });

  if (!_l.isEmpty(children)) {
    if (parent.key === "0") {
      tree = children;
    } else {
      parent['children'] = children;
    }
    _c.forEach(children, function (child) {
      unflatten(array, child)
    });
  }


  return tree;
}


export const UnflattenCatsAndBrief = (data) => {
if(!data) return null;
  var nodes = []
  const cats = data.categories;
  const briefs = data.layerBrief;
  cats.forEach(c => {
    nodes.push({
      key: c.id.toString(),
      title: c.name,
      parentId: c.parentId,
      type: "cat"
    })
  });


  briefs.forEach(b => {
    nodes.push({
      key: b.id.toString() + "_" + b.categoryId.toString(),
      title: b.name,
      parentId: b.categoryId,
      type: "layer"
    })
  });

  var root = {
    key: "0",
    title: "Katmanlar"

  }
  return unflatten(nodes, root);
}