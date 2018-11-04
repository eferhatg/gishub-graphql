import React, { Component } from 'react';
import { shallow } from 'enzyme';
import {LayerTree} from './LayerTree'
import {Tree} from 'antd';
const TreeNode = Tree.TreeNode;

let mockNodes,emptyNodes;

beforeAll(() => {
  mockNodes=[{"key":"1","title":"Bölgeler","parentId":0,"type":"cat","children":[{"key":"1_1","title":"Ülkeler","parentId":1,"type":"layer"},{"key":"3_1","title":"Güzellikler","parentId":1,"type":"layer"},{"key":"4_1","title":"Küçük adalar","parentId":1,"type":"layer"}]},{"key":"2","title":"Binalar","parentId":0,"type":"cat","children":[{"key":"3","title":"Üniversiteler","parentId":2,"type":"cat"},{"key":"4","title":"Camiler","parentId":2,"type":"cat","children":[{"key":"5","title":"İstanbldaki camiler","parentId":4,"type":"cat","children":[{"key":"6","title":"Deepest Node","parentId":5,"type":"cat"}]}]},{"key":"2_2","title":"Üniversiteler","parentId":2,"type":"layer"}]}];
  emptyNodes=[];

});


describe('LayerTree Component',()=>{

  it('Should render deepest node properly',()=>{
    const wrapper = shallow(<LayerTree nodes={mockNodes} />); 
    expect(wrapper.find(TreeNode).at(8)
            .props().title).toEqual("Deepest Node");
  });

  it('Shouldnt render child nodes with null props',()=>{
    const wrapper = shallow(<LayerTree  />); 
    expect(wrapper.children().length).toEqual(0);        
  });
  
});


