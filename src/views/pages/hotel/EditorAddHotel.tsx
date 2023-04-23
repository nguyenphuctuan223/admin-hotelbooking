/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
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

import { Hotel, HotelFilter } from 'types/hotel';
import { alertRequestFailure, alertRequestSuccess } from 'utils/axios';
import { addHotel, editHotel, getHotelList } from 'store/slices/hotel';
import { Room } from 'types/room';
import { getRoomList } from 'store/slices/room';

interface Props {
  open: boolean;
  hotelFilter: HotelFilter;
  hotel: Hotel;
  editing?: boolean;
  handleDrawerOpen: () => void;
}

const validationSchema = yup.object({
  name: yup.string().trim().max(50, `Maximum characters allowed is 50`).required('Name is required'),
  address: yup.string().trim().max(50, `Maximum characters allowed is 50`).required('Address is required')
});

const AddHotel = ({ open, editing, handleDrawerOpen, hotelFilter, hotel }: Props) => {
  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
      formik.resetForm();
    }
  };
  const roomState = useSelector((state) => state.room);

  const getListRoom = async () => {
    await dispatch(getRoomList());
  };

  useEffect(() => {
    getListRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HandleSubmit = (values: Hotel) => {
    if (hotel?._id) {
      dispatch(
        editHotel({
          id: hotel?._id,
          params: values,
          callback: (resp) => {
            if (resp?.status === 200) {
              dispatch(getHotelList(hotelFilter));
              alertRequestSuccess('Edit hotel successfully!');
              changeModal('close');
            } else {
              console.log('error');
            }
          }
        })
      );
    } else {
      dispatch(
        addHotel({
          params: values,
          callback: (resp) => {
            if (resp?.data) {
              dispatch(getHotelList(hotelFilter));
              alertRequestSuccess('Add hotel successfully!');
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
      id: hotel?._id,
      name: hotel?.name,
      address: hotel?.address,
      description: hotel?.description,
      area: hotel?.area,
      imgURL: hotel?.imgURL,
      room: hotel?.rooms
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
                    {hotel?._id ? `Edit "${hotel?.name}"` : `Add Hotel`}
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
                      id="area"
                      name="area"
                      label="Area"
                      value={formik.values.area}
                      onChange={formik.handleChange}
                      error={formik.touched.area && Boolean(formik.errors.area)}
                      helperText={formik.touched.area && formik.errors.area}
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
                    <TextField
                      fullWidth
                      id="address"
                      name="address"
                      label="Address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      error={formik.touched.address && Boolean(formik.errors.address)}
                      helperText={formik.touched.address && formik.errors.address}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Room</InputLabel>
                      <Select
                        id="room"
                        name="room"
                        label="room"
                        displayEmpty
                        value={formik.values.room}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {roomState?.rooms.map((room: any, index: number) => (
                          <MenuItem key={index} value={room._id}>
                            {room.name}
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

export default AddHotel;
