import React, { useState } from 'react';
// THIRD-PARTY
import { ButtonBase, IconButton, Menu, MenuItem, Stack, TableCell, TableRow, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

// PROJECT IMPORTS
import { dispatch } from 'store';

import AddHotel from './EditorAddHotel';
import { Hotel, HotelFilter } from 'types/hotel';
import AlertDelete from 'ui-component/Alert/AlertDelete';
import { delHotel } from 'store/slices/hotel';
import { alertRequestFailure, alertRequestSuccess } from 'utils/axios';

// import AlertDelete from 'ui-component/Alert/AlertDelete';
// import { alertError, alertRequestSuccess } from 'utils/helpers/axios/errorAlert';

interface Props {
  hotel: Hotel;
  hotelFilter: HotelFilter;
  index: number;
  getListAfterDelete: () => void;
}

const HotelList = ({ hotel, index, hotelFilter, getListAfterDelete }: Props) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [openhotelDrawer, setOpenhotelDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handlehotelDrawerOpen = async () => {
    await setEditing(false);
    setOpenhotelDrawer((prevState) => !prevState);
  };

  const edithotel = async () => {
    await setEditing(true);
    setOpenhotelDrawer((prevState) => !prevState);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    dispatch(
      delHotel({
        // eslint-disable-next-line no-underscore-dangle
        id: hotel?._id,
        callback: (resp) => {
          if (resp?.data) {
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
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '200px' }}>{hotel.name}</TableCell>
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '290px' }}>{hotel.address}</TableCell>
        <TableCell component="th" scope="row">
          {hotel.description}
        </TableCell>
        <TableCell component="th" scope="row">
          {hotel.area}
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
                edithotel();
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
          {openModal && <AlertDelete name={hotel.name} open={openModal} handleClose={handleModalClose} />}
        </TableCell>
      </TableRow>
      <AddHotel editing={editing} hotel={hotel} hotelFilter={hotelFilter} open={openhotelDrawer} handleDrawerOpen={handlehotelDrawerOpen} />
    </>
  );
};
export default HotelList;
