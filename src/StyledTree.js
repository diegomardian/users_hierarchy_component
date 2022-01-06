import React, {useState} from "react";
import {Tree, TreeNode} from "react-organizational-chart";
import "./index.css";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteDialog from "./components/dialogs/DeleteDialog";

const StyledTree = ({users, data, setData, organizationName, setOrganizationName, loggedInUser}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const findNode = (id) => {
    if (id === 'root') {
      return data;
    }
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

  const findParentNode = (id) =>  {
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

  const addNode = (name) => {
    if (name) {
      const newNode = {
        _id: new Date().getTime(),
        name: name,
        users: [],
      };
      if (selectedId === 'root') {
        setData([...data, newNode]);
        return;
      }
      let node = findNode(selectedId)
      if("children" in node) {
        node.children.push(newNode)
      } else{
        node.children = [newNode]
      }
      setData([...data]);
    }
  }

  const editNode = (name, users) => {
    if (name || users) {
      let node = findNode(selectedId)
      if (name) {
        if (selectedId === 'root') {
          setOrganizationName(name);
          return;
        }
        node.name = name;
      }
      if (users) {
        node.users = users;
      }
      setData([...data]);
    }
  }

  const deleteNode = (id) => {
    setSelectedId(null);
    let parentNode = findParentNode(id);
    if(parentNode) {
      let index = parentNode.children.findIndex(item => item._id === id)
      parentNode.children.splice(index, 1);
      setData([ ...data]);
    }
    else {
      let index = data.findIndex(item => item._id === id);
      data.splice(index, 1);
      setData([ ...data]);
    }
  }

  const handleDeleteDialogClose = (confirm) => {
    if (confirm) {
      deleteNode(selectedId);
    }
    setOpenDeleteDialog(false);
  };

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  const displayNode = (position, id) => {
    return (
      <div style={{display: "inline-flex", alignItems: "center"}}>
        <h3 className="my-0"><i style={{ cursor: "pointer" }} onClick={() => {setSelectedId(id);handleDeleteDialogOpen()}} className="bi bi-x-circle"></i></h3>
        <button className="btn btn-primary" onClick={() => {setSelectedId(id);setOpenEdit(true)}}>
          {position}
        </button>
        <h3 className="my-0"><i style={{ cursor: "pointer" }} onClick={() => {setSelectedId(id);setOpenAdd(true)}} className="bi bi-plus-circle"></i></h3>
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
  };

  const renderNodeTree = (data) => {
    let result = null;
    if (data.length > 0) {
      return recursiveDisplayNodes(data);
    }
    return result;
  };

  const rootNode = () => {
    return (<div style={{display: "inline-flex", alignItems: "center"}}>
      <button className="btn btn-primary" onClick={() => {setSelectedId('root');setOpenEdit(true)}}>
        {organizationName}
      </button>
      <h3 className="my-0"><i style={{ cursor: "pointer" }} onClick={() => {setSelectedId("root");setOpenAdd(true)}} className="bi bi-plus-circle"></i></h3>
    </div>)
  }

  return (
    <div id="styledTree">
      <Tree
        lineWidth={"2px"}
        lineColor={"green"}
        lineBorderRadius={"10px"}
        label={rootNode()}
      >
        {renderNodeTree(data)}
      </Tree>
      <AddModal
        open={openAdd}
        setOpen={setOpenAdd}
        addNode={addNode}
      />
      <EditModal
        open={openEdit}
        setOpen={setOpenEdit}
        users={users}
        editNode={editNode}
        selectedId={selectedId}
        findNode={findNode}
        loggedInUser={loggedInUser}
      />

      <DeleteDialog
        open={openDeleteDialog}
        handleClose={handleDeleteDialogClose}
      />
    </div>
  );
}

export default StyledTree;
