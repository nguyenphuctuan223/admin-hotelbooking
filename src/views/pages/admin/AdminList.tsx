import React, { useState } from 'react';
// THIRD-PARTY
import { ButtonBase, IconButton, Menu, MenuItem, Stack, TableCell, TableRow, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

import moment from 'moment';

// PROJECT IMPORTS
import { dispatch } from 'store';
// import { deleteAdministrator } from 'store/slices/user';

import { UserFilter } from 'types/user';
import { UserProfile } from 'types/user-profile';
import AddAdministrator from './EditAdmin';
import AlertDelete from 'ui-component/Alert/AlertDelete';
import { delAdministrator } from 'store/slices/user';
import { alertRequestFailure, alertRequestSuccess } from 'utils/axios';

interface Props {
  administrator: UserProfile;
  index: number;
  adminFilter: UserFilter;
  getListAfterDelete: () => void;
}

const Administrator = ({ administrator, index, adminFilter, getListAfterDelete }: Props) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [openAdministratorDrawer, setOpenAdministratorDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleAdministratorDrawerOpen = async () => {
    await setEditing(false);
    setOpenAdministratorDrawer((prevState) => !prevState);
  };

  const editAdministrator = async () => {
    await setEditing(true);
    setOpenAdministratorDrawer((prevState) => !prevState);
  };

  const handleModalClose = (status: boolean) => {
    setOpenModal(false);
    dispatch(
      delAdministrator({
        // eslint-disable-next-line no-underscore-dangle
        id: administrator._id,
        callback: (resp) => {
          console.log('resp', resp);

          if (resp?.status === 200) {
            getListAfterDelete();
            alertRequestSuccess('Deleted successfully!');
          } else {
            alertRequestFailure(resp?.message);
          }
        }
      })
    );
  };
  return (
    <>
      <TableRow hover key={index}>
        <TableCell sx={{ pl: 4 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2">{index + 1}</Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '200px' }}>{administrator.username}</TableCell>
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '290px' }}>{administrator.email}</TableCell>
        <TableCell component="th" scope="row">
          {moment(administrator.created_at).format('DD/MM/YYYY HH:mm')}
        </TableCell>
        <TableCell component="th" scope="row">
          {moment(administrator.updated_at).format('DD/MM/YYYY HH:mm')}
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
                editAdministrator();
              }}
            >
              <EditIcon fontSize="small" sx={{ color: '#2196f3', mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setOpenModal(true);
              }}
            >
              <DeleteIcon fontSize="small" sx={{ color: '#f44336', mr: 1 }} />
              Delete
            </MenuItem>
          </Menu>
          {openModal && <AlertDelete name={administrator.username} open={openModal} handleClose={handleModalClose} />}
        </TableCell>
      </TableRow>
      <AddAdministrator
        editing={editing}
        administrator={administrator}
        adminFilter={adminFilter}
        open={openAdministratorDrawer}
        handleDrawerOpen={handleAdministratorDrawerOpen}
      />
    </>
  );
};
export default Administrator;
