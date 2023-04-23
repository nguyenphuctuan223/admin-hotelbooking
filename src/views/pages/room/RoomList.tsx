import React, { useEffect, useState } from 'react';
// THIRD-PARTY
import { ButtonBase, Chip, IconButton, Menu, MenuItem, Stack, TableCell, TableRow, Typography, useTheme } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

// PROJECT IMPORTS
import { dispatch } from 'store';

import AlertDelete from 'ui-component/Alert/AlertDelete';
import { alertRequestFailure, alertRequestSuccess } from 'utils/axios';
import { Room, RoomFilter } from 'types/room';
import { delRoom } from 'store/slices/room';
import AddOrEditRoom from './EditorAddRoom';
import { getDetailHotel } from 'store/slices/hotel';

// import AlertDelete from 'ui-component/Alert/AlertDelete';
// import { alertError, alertRequestSuccess } from 'utils/helpers/axios/errorAlert';

interface Props {
  room: Room;
  roomFilter: RoomFilter;
  index: number;
  getListAfterDelete: () => void;
}

const RoomList = ({ room, index, roomFilter, getListAfterDelete }: Props) => {
  const theme = useTheme();
  const [editing, setEditing] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [openroomDrawer, setOpenroomDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);

  const [dataHotel, setDataHotel] = useState<string>('');

  console.log('123', dataHotel);

  const getOneHotel = () => {
    dispatch(
      getDetailHotel({
        // eslint-disable-next-line no-underscore-dangle
        id: room.hotel,
        callback: (resp) => {
          if (resp?.status === 200) {
            setDataHotel(resp?.data?.name);
            alertRequestSuccess('get successfully!');
          } else {
            alertRequestFailure(resp?.message);
          }
        }
      })
    );
  };
  useEffect(() => {
    if (room?.hotel) {
      getOneHotel();
    }
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleroomDrawerOpen = async () => {
    await setEditing(false);
    setOpenroomDrawer((prevState) => !prevState);
  };

  const editRoom = async () => {
    await setEditing(true);
    setOpenroomDrawer((prevState) => !prevState);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    dispatch(
      delRoom({
        // eslint-disable-next-line no-underscore-dangle
        id: room._id,
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
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '200px' }}>{room.name}</TableCell>
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '290px' }}>{dataHotel}</TableCell>
        <TableCell component="th" scope="row">
          {room.description}
        </TableCell>
        <TableCell component="th" scope="row">
          {room.price}
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
                editRoom();
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
          {openModal && <AlertDelete name={room.name} open={openModal} handleClose={handleModalClose} />}
        </TableCell>
      </TableRow>
      <AddOrEditRoom editing={editing} room={room} roomFilter={roomFilter} open={openroomDrawer} handleDrawerOpen={handleroomDrawerOpen} />
    </>
  );
};
export default RoomList;
