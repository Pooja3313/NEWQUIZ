import React, { useEffect, useState } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip,Button, Modal, TextField } from '@mui/material';
import DashboardCard from './shared';
import { useAuth } from "../Store/authh";
import { toast } from 'react-toastify';

const User = () => {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Store user to be updated
  const [updatedUserData, setUpdatedUserData] = useState({ }); // Updated data
  const { TokenFROMLSGet} = useAuth();
  const [openModal, setOpenModal] = useState(false); // Modal state

  const handleInput = (e) => {
    console.log(e);
    let { name, value } = e.target;

    setUpdatedUserData({
      ...updatedUserData,
      [name]: value,
    });
  };

  useEffect(() => {  
    fetchUsers();
  }, [TokenFROMLSGet]);

  const fetchUsers = async () => {
    try {
      const token = TokenFROMLSGet();
      const response = await fetch('https://newquiz-e2nh.onrender.com/api/authh/getAllUsers', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // If token is required for authentication
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Delete user by ID
  const deleteUser = async (id) => {
    try {
      const token = TokenFROMLSGet();
      const response = await fetch(`https://newquiz-e2nh.onrender.com/api/authh/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) { 
        toast.success('User deleted successfully');
        fetchUsers();
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
    }
  };

  // Update user data
  const updateUser = async () => {
    try {
      const token = TokenFROMLSGet();
      const response = await fetch(`https://newquiz-e2nh.onrender.com/api/authh/update/${selectedUser._id}`, {
        method: 'PATCH',
        headers: {
          // most important line this line without data not update beacuse we pass data in json format hame batana padega kah keh me joh data bhej raha hu uski content- type application/json formta hai
          'Content-Type': 'application/json', 
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        // const updatedUser = await response.json();
        // setUsers(users.map((user) => (user._id === selectedUser._id ? updatedUser : user)));
        setOpenModal(false);
         // Close modal after successful update
        toast.success('User updated successfully');
        fetchUsers();
      } else {
        toast.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user');
    }
  };
  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setUpdatedUserData({ name: user.name, email: user.email, phone: user.phone }); 
    //  above line pre fill form
    setOpenModal(true);
  };

  

  return (
    <DashboardCard title="">
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Phone
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Update
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Delete
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {user.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {user.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {user.phone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                  <Chip label="Update" color="primary"onClick={() => handleUpdateClick(user)} sx={{ mr: 1 }} />
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                  <Chip label="Delete" color="error" onClick={() => deleteUser(user._id)}  
                   sx={{ cursor: 'pointer' }} 
                  />
                  </Typography>
                </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
       {/* Modal for updating user */}
     {/* onclose is Event of js like onClick when we press esc then openmodal set false and form is close. this logic for that   */}
       <Modal open={openModal} onClose={() => setOpenModal(false)}> 
        <Box sx={{ p: 4, backgroundColor: 'white', width: '400px', margin: 'auto', mt: 10, borderRadius: '8px' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Update User</Typography>
          <TextField
            label="Name"
            name="name"
            value={updatedUserData.name}
            onChange={handleInput}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            value={updatedUserData.email}
            onChange={handleInput}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone"
            name="phone"
            value={updatedUserData.phone}
            onChange={handleInput}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={updateUser}>Update</Button>
        </Box>
      </Modal>
    </DashboardCard>
  );
};

export default User;
