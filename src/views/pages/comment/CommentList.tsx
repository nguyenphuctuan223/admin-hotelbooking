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

import { delTranst } from 'store/slices/transt';
import { Review, ReviewFilter } from 'types/comment';
import AddOrEditComment from './EditOrAddComment';
import { delReview } from 'store/slices/comment';
import { getDetailHotel, getHotelList } from 'store/slices/hotel';

interface Props {
  review: Review;
  reviewFilter: ReviewFilter;
  index: number;
  getListAfterDelete: () => void;
}

const CommentList = ({ review, index, reviewFilter, getListAfterDelete }: Props) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [openReviewDrawer, setOpenReviewDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);

  const [dataHotel, setDataHotel] = useState<string>('');

  const getListHotel = async () => {
    await dispatch(getHotelList());
  };

  const getOneHotel = () => {
    dispatch(
      getDetailHotel({
        // eslint-disable-next-line no-underscore-dangle
        id: review.hotel,
        callback: (resp) => {
          if (resp?.status === 200) {
            setDataHotel(resp?.data?.name);
          } else {
            alertRequestFailure(resp?.message);
          }
        }
      })
    );
  };
  useEffect(() => {
    if (review?.hotel) {
      getOneHotel();
    }
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

  const handleReviewDrawerOpen = async () => {
    await setEditing(false);
    setOpenReviewDrawer((prevState) => !prevState);
  };

  const updateReview = async () => {
    await setEditing(true);
    setOpenReviewDrawer((prevState) => !prevState);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    dispatch(
      delReview({
        // eslint-disable-next-line no-underscore-dangle
        id: review._id,
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
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '200px' }}>{review?.name}</TableCell>
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '290px' }}>{review?.email}</TableCell>
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '290px' }}>{review?.comment}</TableCell>
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '290px' }}>{dataHotel}</TableCell>
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '290px' }}>{review?.rate}</TableCell>

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
                updateReview();
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
          {openModal && <AlertDelete name={review?.name} open={openModal} handleClose={handleModalClose} />}
        </TableCell>
      </TableRow>
      <AddOrEditComment
        editing={editing}
        review={review}
        reviewFilter={reviewFilter}
        open={openReviewDrawer}
        handleDrawerOpen={handleReviewDrawerOpen}
      />
    </>
  );
};
export default CommentList;
