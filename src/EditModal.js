import React, {useEffect, useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input} from "@mui/material";
import Button from "@mui/material/Button";
import UserRoleAssigner from "./components/UserRoleAssigner";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '95%',
  overflowY: 'scroll',
};

//  an edit modal like the add modal
function EditModal({editNode, setOpen, open, users, selectedId, findNode, loggedInUser}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState('');
  const [nodeUsers, setNodeUsers] = useState([]);
  useEffect(( )=> {
    if (selectedId) {
      const node = findNode(selectedId);
      setNodeUsers(node.users);
    }
  }, [findNode, selectedId])
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box sx={style}>
          <Typography id="edit-modal-title" variant="h6" component="h2">
            Edit a node
          </Typography>
          <FormControl sx={{ my: 2 }}>
            <Input placeholder="Name" onChange={(e) => setName(e.target.value)}  autoFocus/>
          </FormControl>
          {selectedId !== 'root' && <UserRoleAssigner users={users} nodeUsers={nodeUsers} setNodeUsers={setNodeUsers} loggedInUser={loggedInUser}/>}
          <Button sx={{ mt: 1, fontSize: 17, width: '100%'}} onClick={() => {
            editNode(name, nodeUsers);
            handleClose();
          }}>Edit</Button></Box>
      </Modal>
    </div>
  );
}

export default EditModal;