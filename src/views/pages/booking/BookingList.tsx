import React, { useState } from 'react';
// THIRD-PARTY
import { ButtonBase, IconButton, Menu, MenuItem, Stack, TableCell, TableRow, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

// PROJECT IMPORTS
import { dispatch } from 'store';

import AlertDelete from 'ui-component/Alert/AlertDelete';
import { alertRequestFailure, alertRequestSuccess } from 'utils/axios';
import { Booking, BookingFilter } from 'types/booking';
import { delBooking } from 'store/slices/booking';
import AddOrEditBooking from './EditorAddBooking';

interface Props {
  booking: Booking;
  bookingFilter: BookingFilter;
  index: number;
  getListAfterDelete: () => void;
}

const BookingList = ({ booking, index, bookingFilter, getListAfterDelete }: Props) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [openBookingDrawer, setOpenBookingDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleBookingDrawerOpen = async () => {
    await setEditing(false);
    setOpenBookingDrawer((prevState) => !prevState);
  };

  const updateBooking = async () => {
    await setEditing(true);
    setOpenBookingDrawer((prevState) => !prevState);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    dispatch(
      delBooking({
        // eslint-disable-next-line no-underscore-dangle
        id: booking._id,
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
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '200px' }}>{booking.email}</TableCell>
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '290px' }}>{booking.Note}</TableCell>

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
                updateBooking();
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
          {openModal && <AlertDelete name={booking.email} open={openModal} handleClose={handleModalClose} />}
        </TableCell>
      </TableRow>
      <AddOrEditBooking
        editing={editing}
        booking={booking}
        bookingFilter={bookingFilter}
        open={openBookingDrawer}
        handleDrawerOpen={handleBookingDrawerOpen}
      />
    </>
  );
};
export default BookingList;
