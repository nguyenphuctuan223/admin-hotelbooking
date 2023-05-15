import React, { useEffect, useState } from 'react';
// THIRD-PARTY
import { ButtonBase, IconButton, Menu, MenuItem, Stack, TableCell, TableRow, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

// PROJECT IMPORTS
import { dispatch } from 'store';

import AlertDelete from 'ui-component/Alert/AlertDelete';
import { alertRequestFailure, alertRequestSuccess } from 'utils/axios';

import { Uti, UtiFilter } from 'types/uti';
import { delUti } from 'store/slices/uti';
import AddOrEditUti from './EditorAddUti';
import { getDetailHotel, getHotelList } from 'store/slices/hotel';

interface Props {
  uti: Uti;
  utiFilter: UtiFilter;
  index: number;
  getListAfterDelete: () => void;
}

const UtiList = ({ uti, index, utiFilter, getListAfterDelete }: Props) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [openUtiDrawer, setOpenUtiDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);

  const [dataHotel, setDataHotel] = useState<string>('');

  const getListHotel = async () => {
    await dispatch(getHotelList());
  };

  const getOneHotel = () => {
    dispatch(
      getDetailHotel({
        // eslint-disable-next-line no-underscore-dangle
        id: uti.hotel,
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
    if (uti?.hotel) {
      getOneHotel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getListHotel();
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleUtiDrawerOpen = async () => {
    await setEditing(false);
    setOpenUtiDrawer((prevState) => !prevState);
  };

  const updateUti = async () => {
    await setEditing(true);
    setOpenUtiDrawer((prevState) => !prevState);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    dispatch(
      delUti({
        // eslint-disable-next-line no-underscore-dangle
        id: uti._id,
        callback: (resp) => {
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
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '200px' }}>{dataHotel}</TableCell>
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '200px' }}>{uti.type}</TableCell>
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '290px' }}>{uti.price}</TableCell>

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
                updateUti();
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
          {openModal && <AlertDelete name={uti.type} open={openModal} handleClose={handleModalClose} />}
        </TableCell>
      </TableRow>
      <AddOrEditUti editing={editing} uti={uti} utiFilter={utiFilter} open={openUtiDrawer} handleDrawerOpen={handleUtiDrawerOpen} />
    </>
  );
};
export default UtiList;
