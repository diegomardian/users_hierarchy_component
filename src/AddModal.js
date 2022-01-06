import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {FormControl, Input, InputLabel, TextField} from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '300px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddModal({addNode, setOpen, open}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState('');
  

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-modal-title"
        aria-describedby="add-modal-description"
      >
        <Box sx={style}>
          <Typography id="add-modal-title" variant="h6" component="h2">
            Add a node
          </Typography>
          <FormControl>
            <Input placeholder="Name" onChange={(e) => setName(e.target.value)}  autoFocus/>
            <Button sx={{ mt: 1 }} onClick={() => {
              addNode(name);
              handleClose();
            }}>Add</Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}


export default AddModal;