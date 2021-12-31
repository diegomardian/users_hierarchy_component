import React from "react";
import {Tree, TreeNode} from "react-organizational-chart";
import "./index.css";

const StyledTree = ({data, setData, organizationName, setOrganizationName}) => {

  const findNode = (id) => {
    let stack = [...data], node, ii;
    while (stack.length > 0) {
      node = stack.pop();
      if (node._id === id) {
        return node;
      } else if (node.children && node.children.length) {
        for (ii = 0; ii < node.children.length; ii += 1) {
          stack.push(node.children[ii]);
        }
      }
    }
    return null;
  }

  const findParentNode = (id) => {
    let stack = [...data], node, ii;

    while (stack.length > 0) {
      node = stack.pop();
      if (node.children && node.children.length) {
        for (ii = 0; ii < node.children.length; ii += 1) {
          if (node.children[ii]._id === id) {
            return node;
          } else {
            stack.push(node.children[ii]);
          }
        }
      }
    }
    return null;
  }

  const addNode = (id) => {
    let name = prompt("Enter new data");
    if (name) {
      let node = findNode(id)
      if("children" in node) {
        node.children.push({
          _id: new Date().getTime(),
          name: name
        })
      } else{
        node.children = [{
          _id: new Date().getTime(),
          name: name
        }]
      }
      setData([...data])
    }
  }

  const editNode = (id) => {
    let name = prompt("Enter new data");
    if (name) {
      let node = findNode(id)
      node.name = name
      setData([...data])
    }
  }

  const deleteNode = (id) => {
    let parentNode = findParentNode(id)
    if(parentNode) {
      let index = parentNode.children.findIndex(item => item._id === id)
      parentNode.children.splice(index, 1)
      setData([ ...data])
    }
    else {
      let index = data.findIndex(item => item._id === id)
      data.splice(index, 1)
      setData([ ...data])
    }
  }

  const displayNode = (position, id) => {
    return (
      <div style={{display: "inline-flex", alignItems: "center"}}>
        <h3 className="my-0"><i style={{ cursor: "pointer" }} onClick={() => deleteNode(id)} className="bi bi-x-circle"></i></h3>
        <button className="btn btn-primary" onClick={() => editNode(id)}>
          {position}
        </button>
        <h3 className="my-0"><i style={{ cursor: "pointer" }} onClick={() => addNode(id)} className="bi bi-plus-circle"></i></h3>
      </div>
    );
  }

  const recursiveDisplayNodes = (data) => {
    return data.map((node, index) => {
      return (
        <TreeNode
          key={index}
          label={displayNode(node.name, node._id)}
        >
          {node.children && recursiveDisplayNodes(node.children)}
        </TreeNode>
      );
    });
  }

  const renderNodeTree = (data) => {
    let result = null;
    if (data.length > 0) {
      return recursiveDisplayNodes(data)
    }
    return result;
  };

  const editRootNode = () => {
    let name = prompt("Enter new data");
    if (name) {
      setOrganizationName(name)
    }
  }

  const addToRootNode = () => {
    let name = prompt("Enter new data");
    if (name) {
      setData([...data, {
        _id: new Date().getTime(),
        name: name
      }])
    }
  }

  const rootNode = () => {
    return (<div style={{display: "inline-flex", alignItems: "center"}}>
      <button className="btn btn-primary" onClick={() => editRootNode()}>
        {organizationName}
      </button>
      <h3 className="my-0"><i style={{ cursor: "pointer" }} onClick={() => addToRootNode()} className="bi bi-plus-circle"></i></h3>
    </div>)
  }

  return (
    <Tree
      lineWidth={"2px"}
      lineColor={"green"}
      lineBorderRadius={"10px"}
      label={rootNode()}
    >
      {renderNodeTree(data)}
    </Tree>
  );
}

export default StyledTree;
