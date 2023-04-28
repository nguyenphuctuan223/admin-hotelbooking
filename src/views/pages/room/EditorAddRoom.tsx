/* eslint-disable no-underscore-dangle */
import React from 'react';
// THIRD-PARTY
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import AnimateButton from 'ui-component/extended/AnimateButton';

import * as yup from 'yup';
import { useFormik } from 'formik';

// PROJECT IMPORTS
import { dispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';

import { alertRequestFailure, alertRequestSuccess } from 'utils/axios';
import { Room, RoomFilter } from 'types/room';
import { addRoom, editRoom, getRoomList } from 'store/slices/room';

interface Props {
  open: boolean;
  room: Room;
  roomFilter: RoomFilter;
  editing?: boolean;
  handleDrawerOpen: () => void;
}

const validationSchema = yup.object({
  name: yup.string().trim().max(50, `Maximum characters allowed is 50`).required('Name is required')
});

const AddOrEditRoom = ({ open, editing, handleDrawerOpen, roomFilter, room }: Props) => {
  const hotelState = useSelector((state) => state.hotel);

  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
      formik.resetForm();
    }
  };

  const HandleSubmit = (values: Room) => {
    if (room?._id) {
      dispatch(
        editRoom({
          id: room?._id,
          params: values,
          callback: (resp) => {
            if (resp?.status === 200) {
              dispatch(getRoomList(roomFilter));
              alertRequestSuccess('Edit room successfully!');
              changeModal('close');
            } else {
              alertRequestFailure(resp?.message);
            }
          }
        })
      );
    } else {
      dispatch(
        addRoom({
          params: values,
          callback: (resp) => {
            if (resp?.status === 200) {
              dispatch(getRoomList(roomFilter));
              alertRequestSuccess('Add room successfully!');
              changeModal('close');
            } else {
              alertRequestFailure(resp?.message);
            }
          }
        })
      );
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: room?._id,
      name: room?.name,
      description: room?.description,
      price: room?.price,
      imgURL: room?.imgURL,
      hotel: room?.hotel
    },
    validationSchema,
    onSubmit: (values) => {
      HandleSubmit(values);
    }
  });
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleDrawerOpen();
        formik.resetForm();
      }}
      sx={{
        '&>div:nth-of-type(3)': {
          '&>div': {
            m: 0,
            borderRadius: '0px',
            width: 850,
            maxWidth: 850,
            maxHeight: '100%'
          }
        }
      }}
    >
      {open && (
        <>
          <Box sx={{ p: 3 }}>
            <Grid container alignItems="center" spacing={0.5} justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography
                    variant="h4"
                    sx={{
                      display: 'inline-block',
                      width: 'calc(100% - 34px)',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      verticalAlign: 'middle'
                    }}
                  >
                    {room?._id ? `Edit "${room?.name}"` : `Add Room`}
                  </Typography>
                  <Button
                    variant="text"
                    color="error"
                    sx={{ p: 0.5, minWidth: 32, display: { xs: 'block', md: 'none' } }}
                    onClick={handleDrawerOpen}
                  >
                    <HighlightOffIcon />
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <form noValidate onSubmit={formik.handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DialogContent>
                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="Name"
                      name="name"
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Name
                        </span>
                      }
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="description"
                      name="description"
                      label="Description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helperText={formik.touched.description && formik.errors.description}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="price"
                      name="price"
                      label="Price"
                      type="number"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      error={formik.touched.price && Boolean(formik.errors.price)}
                      helperText={formik.touched.price && formik.errors.price}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="imgURL"
                      name="imgURL"
                      label="ImgURL"
                      value={formik.values.imgURL}
                      onChange={formik.handleChange}
                      error={formik.touched.imgURL && Boolean(formik.errors.imgURL)}
                      helperText={formik.touched.imgURL && formik.errors.imgURL}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Hotel</InputLabel>
                      <Select
                        id="hotel"
                        name="hotel"
                        label="room"
                        displayEmpty
                        value={formik.values.hotel}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {hotelState?.hotels.map((hotel: any, index: number) => (
                          <MenuItem key={index} value={hotel._id}>
                            {hotel.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button fullWidth variant="contained" type="submit">
                        Save
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </DialogContent>
            </LocalizationProvider>
          </form>
        </>
      )}
    </Dialog>
  );
};

export default AddOrEditRoom;
