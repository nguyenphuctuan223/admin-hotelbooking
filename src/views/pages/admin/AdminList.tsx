import React, { useState } from 'react';

// THIRD-PARTY
import { useTheme } from '@mui/material/styles';
import { Avatar, ButtonBase, Chip, Grid, IconButton, Menu, MenuItem, Stack, TableCell, TableRow, Typography } from '@mui/material';

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import VerifiedIcon from '@mui/icons-material/Verified';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// PROJECT IMPORTS
import { useSelector } from 'store';

import EditIcon from '@mui/icons-material/Edit';
import { Admin, AdminFilter } from 'types/admin';
// import { styled } from '@mui/system';
import EditAdmin from './EditAdmin';

interface Props {
  admin: Admin;
  index: number;
  adminFilter: AdminFilter;
}

const AdminList = ({ admin, index, adminFilter }: Props) => {
  const theme = useTheme();
  const adminState = useSelector((state) => state.admin);
  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
  const [openAdminDrawer, setOpenAdminDrawer] = useState<boolean>(false);

  const handleAdminDrawerOpen = () => {
    setOpenAdminDrawer((prevState) => !prevState);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const editCollection = async () => {
    // await setEdit(true);
    setOpenAdminDrawer((prevState) => !prevState);
  };

  return (
    <>
      <TableRow hover key={index}>
        <TableCell sx={{ width: '5%', pl: 4 }}>
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">{index + 20 * (adminState?.currentPage - 1) + 1} </Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              {admin?.image ? (
                <Avatar
                  alt="Logo"
                  src={`${process.env.REACT_APP_BASE_IMAGE_URL}/${admin?.image}`}
                  variant="square"
                  sx={{ borderRadius: '8px' }}
                />
              ) : (
                <Avatar />
              )}
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography align="left" variant="subtitle1" component="div">
                {admin?.name ? admin?.name : 'No name'}{' '}
                {admin?.is_login === '1' && <CheckCircleIcon sx={{ color: 'success.dark', width: 16, height: 16, mb: -0.4 }} />}
              </Typography>
              <Typography align="left" variant="subtitle2" noWrap>
                {admin?.publicAddress?.slice(0, 6)}...{admin?.publicAddress?.slice(-6)}
              </Typography>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '624px' }}>{admin.email} </TableCell>
        <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '624px' }}>{admin?.bio}</TableCell>

        <TableCell>
          {admin?.is_trust === '1' ? (
            <VerifiedIcon style={{ color: 'rgb(32, 129, 226)', width: '40px', height: '40px' }} />
          ) : (
            <VerifiedIcon style={{ width: '40px', height: '40px' }} />
          )}
        </TableCell>
        <TableCell>
          {admin?.is_login === '1' ? (
            <VerifiedIcon style={{ color: 'rgb(32, 129, 226)', width: '40px', height: '40px' }} />
          ) : (
            <VerifiedIcon style={{ width: '40px', height: '40px' }} />
          )}
        </TableCell>
        <TableCell>
          {admin?.is_mint === '1' ? (
            <VerifiedIcon style={{ color: 'rgb(32, 129, 226)', width: '40px', height: '40px' }} />
          ) : (
            <VerifiedIcon style={{ width: '40px', height: '40px' }} />
          )}
        </TableCell>

        <TableCell>
          {admin?.status === 1 && (
            <Chip
              label="Inactive"
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
                color: theme.palette.warning.dark
              }}
            />
          )}
          {admin?.status === 1 && (
            <Chip
              label="Active"
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light + 60,
                color: theme.palette.success.dark
              }}
            />
          )}
        </TableCell>

        <TableCell align="center">
          <ButtonBase
            className="more-button"
            sx={{ borderRadius: '12px' }}
            onClick={handleClick}
            aria-controls="menu-comment"
            aria-haspopup="true"
          >
            <IconButton component="span" size="small" disableRipple>
              <MoreVertTwoToneIcon fontSize="inherit" />
            </IconButton>
          </ButtonBase>
          <Menu
            id="menu-comment"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            variant="selectedMenu"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                editCollection();
              }}
            >
              <EditIcon fontSize="small" sx={{ color: '#2196f3', mr: 1 }} />
              Edit
            </MenuItem>
            {/* <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              <DeleteIcon fontSize="small" sx={{ color: '#f44336', mr: 1 }} />
              Delete
            </MenuItem> */}
          </Menu>
        </TableCell>
      </TableRow>
      <EditAdmin admin={admin} open={openAdminDrawer} handleDrawerOpen={handleAdminDrawerOpen} />
    </>
  );
};

export default AdminList;
