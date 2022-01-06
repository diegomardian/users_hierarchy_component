import {useEffect, useState} from 'react';
import QuickSearchToolbar from "./QuickSearchToolbar";
import Box from '@mui/material/Box';
import {DataGrid,} from '@mui/x-data-grid';
import SearchableDataGrid from "./SearchableDataGrid";
import Button from "@mui/material/Button";
import {Grid, styled} from "@mui/material";



const columns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
  },

];

const ButtonStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'inline-grid',
  [theme.breakpoints.down('md')]: {
    display: 'inline'
  },
}));


function  UserRoleAssigner({ users, nodeUsers, setNodeUsers, loggedInUser }) {
  const [selectedUsers, setSelectedUsers] = useState({
    users: [],
    nodeUsers: [],
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(loggedInUser.role === 'admin');
  }, [loggedInUser]);

  const handleLeftTransfer = () => {
    if (selectedUsers.nodeUsers) {
      const newUsers = nodeUsers.filter(user => !selectedUsers.nodeUsers.includes(user));
      setNodeUsers(newUsers);
      setSelectedUsers({
        users: [],
        nodeUsers: [],
      });
    }
  }

  const handleRightTransfer = () => {
    if (selectedUsers.users) {
      if (selectedUsers.users.some(user => nodeUsers.includes(user))) {
        alert('You cannot assign a user that is already assigned to this role');
        return;
      }
      const newNodeUsers = nodeUsers.concat(selectedUsers.users);
      setNodeUsers(newNodeUsers);
      setSelectedUsers({
        users: [],
        nodeUsers: [],
      });
    }
  }

  return (
    <Grid container spacing={2}>
        <Grid item sm={5} xs={12}>
          <SearchableDataGrid data={users} setSelectedUsers={setSelectedUsers} selectedUsers={selectedUsers} columns={columns} type='users'/>
        </Grid>
        <Grid item sm={2} xs={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {/*<Button onClick={handleLeftTransfer}>*/}
            {/*  <i className="material-icons">arrow_back</i>*/}
            {/*</Button>*/}
            {/*<Button onClick={handleRightTransfer}>*/}
            {/*  <i className="material-icons">arrow_forward</i>*/}
            {/*</Button>*/}
            <Box style={{display: 'flex'}}>
              <ButtonStyle>
                <Button onClick={handleLeftTransfer} sx={{mt: 'auto'}} disabled={!isAdmin}><i className='bi bi-arrow-left horizontalIcon' style={{fontSize: 30}}/><i className='bi bi-arrow-up verticalIcon' style={{fontSize: 30}}/></Button>
                <Button onClick={handleRightTransfer} sx={{mb: 'auto'}}  disabled={!isAdmin}><i className='bi bi-arrow-right horizontalIcon' style={{fontSize: 30}} /><i className='bi bi-arrow-down verticalIcon' style={{fontSize: 30}} /></Button>
              </ButtonStyle>
            </Box>
        </Grid>
        <Grid item sm={5} xs={12}>
          <SearchableDataGrid data={nodeUsers} setSelectedUsers={setSelectedUsers} selectedUsers={selectedUsers} columns={columns} type='nodeUsers'/>
        </Grid>

      </Grid>
  );
}

export default UserRoleAssigner;