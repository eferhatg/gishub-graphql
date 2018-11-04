import React, { Component } from 'react';
import {Tree,Icon} from 'antd';
import PropTypes from 'prop-types';
const TreeNode = Tree.TreeNode;

class LayerTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      checkedLayers: []
    };
  }
  
  onExpand = (expandedKeys) => {
    this.setState({expandedKeys, autoExpandParent: true});
  }

  renderTreeNodes = (data) => {
    if(!data) return null;
    var self=this;
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item} selectable={false}
          icon={() => (<Icon type={self.state.expandedKeys.includes(item.key)?'folder-open':'folder'} />)}>          
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} icon={() => (<Icon type={'environment'} />)}/>;
    });
  }

  onCheck = (checkedKeys) => {
    this.props.onNodeCheck(checkedKeys);
    this.setState({checkedKeys});
  }

  render() {
    return (    
         <Tree
          disabled={this.props.loading}
          showIcon
          checkable
          onExpand={this.onExpand}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          selectedKeys={this.state.selectedKeys}>
          {this.renderTreeNodes(this.props.nodes)}
        </Tree>
  
    );
  }
}

LayerTree.propTypes={
  nodes:PropTypes.arrayOf(PropTypes.object),
  onNodeCheck:PropTypes.func,
  loading:PropTypes.bool
}
export {LayerTree};