// THIRD-PARTY
import React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';

// PROJECT IMPORTS
import useAuth from '../../../../hooks/useAuth';
// import { getProfile } from '../../../../store/slices/profile';
import User from 'assets/images/users/user-round.svg';
import MainCard from 'ui-component/cards/MainCard';

export default function Profile() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const onGetProfile = () => {
  //   getProfile();
  // };

  return (
    <Box>
      <Grid container justifyContent="center" spacing={2} sx={{ minHeight: '100vh' }}>
        <Grid item xs={12} lg={4}>
          <MainCard>
            <CardHeader
              avatar={
                <Avatar
                  src={User}
                  sx={{
                    ...theme.typography.largeAvatar,
                    cursor: 'pointer'
                  }}
                  aria-haspopup="true"
                  color="inherit"
                />
              }
              title={user?.name}
              subheader={user?.type === 1 ? 'Admin' : 'User'}
              sx={{
                borderBottom: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
                ':hover': {
                  boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)'
                }
              }}
            />
            <CardContent>
              <List>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="h5">Username</Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Typography>{user?.username}</Typography>
                  </ListItemSecondaryAction>
                </ListItemButton>
                <Divider />
                <ListItemButton>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="h5">Email</Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Typography>{user?.email}</Typography>
                  </ListItemSecondaryAction>
                </ListItemButton>
                <Divider />
                <ListItemButton>
                  <ListItemIcon>
                    <PhoneIphoneIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="h5">Phone Number</Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Typography>{user?.phone}</Typography>
                  </ListItemSecondaryAction>
                </ListItemButton>
              </List>
            </CardContent>
          </MainCard>
        </Grid>
        <Grid item xs={12} lg={8}>
          <MainCard>
            <CardHeader
              title="Persional Details"
              action={
                <Button onClick={handleClickOpen}>
                  <EditIcon />
                </Button>
              }
              sx={{
                borderBottom: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
                ':hover': {
                  boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)'
                }
              }}
            />
            <CardContent>
              <TableContainer component={Card}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell variant="head">Full Name</TableCell>
                      <TableCell variant="body">{user?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">Phone</TableCell>
                      <TableCell variant="body">{user?.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">Date Of Birth</TableCell>
                      <TableCell variant="body">{user?.dob}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">Gender</TableCell>
                      <TableCell variant="body">{user?.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">Position</TableCell>
                      <TableCell variant="body">{user?.type === 1 ? 'Admin' : 'User'}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
              <DialogTitle>Personal Information</DialogTitle>
              <DialogContent>
                <DialogContentText>Change your personal Information here</DialogContentText>
                <TextField margin="dense" id="name" label="Name" value={user?.name} fullWidth variant="standard" />
                <TextField margin="dense" id="phone" label="Phone Number" value={user?.phone} fullWidth variant="standard" />
                <TextField margin="dense" id="dob" label="Date of Birth" value={user?.dob} fullWidth variant="standard" />
                <TextField margin="dense" id="gender" label="Gender" value={user?.gender} fullWidth variant="standard" />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Edit</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </DialogActions>
            </Dialog>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
}
