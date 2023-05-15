/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
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
import { Booking, BookingFilter } from 'types/booking';
import { addBooking, editBooking, getBookingList } from 'store/slices/booking';
import { RoomInHotel, getRoomList } from 'store/slices/room';
import { useEffect, useState } from 'react';
import { getHotelList } from 'store/slices/hotel';

interface Props {
  open: boolean;
  booking: Booking;
  bookingFilter: BookingFilter;
  editing?: boolean;
  handleDrawerOpen: () => void;
}

const validationSchema = yup.object({
  email: yup.string().trim().max(50, `Maximum characters allowed is 50`).required('Name is required')
});

const AddOrEditBooking = ({ open, editing, handleDrawerOpen, bookingFilter, booking }: Props) => {
  const hotelState: any = useSelector((state) => state.hotel);

  const roomState = useSelector((state) => state.room);

  const [dataRoom, setDataRoom] = useState([]);

  console.log('dataRoom', dataRoom);
  console.log(
    'roomState',
    roomState?.rooms.map((room: any, index: number) => room.name)
  );

  const getListRoom = async () => {
    await dispatch(getRoomList());
  };

  const getListHotel = async () => {
    await dispatch(getHotelList());
  };

  useEffect(() => {
    getListRoom();
    getListHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
      formik.resetForm();
    }
  };

  const HandleSubmit = (values: Booking) => {
    if (booking?._id) {
      dispatch(
        editBooking({
          id: booking?._id,
          params: values,
          callback: (resp) => {
            if (resp?.status === 200) {
              dispatch(getBookingList(bookingFilter));
              alertRequestSuccess('Edit booking successfully!');
              changeModal('close');
            } else {
              alertRequestFailure(resp?.message);
            }
          }
        })
      );
    } else {
      dispatch(
        addBooking({
          params: values,
          callback: (resp) => {
            if (resp?.status === 200) {
              dispatch(getBookingList(bookingFilter));
              alertRequestSuccess('Add booking successfully!');
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
      id: booking?._id,
      email: booking?.email,
      customer: booking?.customer,
      hotel: booking?.hotel,
      rooms: booking?.rooms,
      startDate: booking?.startDate,
      endDate: booking?.endDate,
      Note: booking?.Note
    },
    validationSchema,
    onSubmit: (values) => {
      HandleSubmit(values);
    }
  });

  console.log('formik?.values?.hotel', formik?.values?.hotel);

  const getRoomHotel = () => {
    dispatch(
      RoomInHotel({
        // eslint-disable-next-line no-underscore-dangle
        id: formik?.values?.hotel,
        callback: (resp) => {
          if (resp?.status === 200) {
            setDataRoom(resp);
          } else {
            alertRequestFailure(resp?.message);
          }
        }
      })
    );
  };
  useEffect(() => {
    if (formik?.values?.hotel) {
      console.log('1234455');
      getRoomHotel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
                    {booking?._id ? `Edit "${booking?.email}"` : `Add booking`}
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="customer"
                    name="customer"
                    label={
                      <span>
                        <span style={{ color: '#f44336' }}>*</span> Customer
                      </span>
                    }
                    value={formik.values.customer}
                    onChange={formik.handleChange}
                    error={formik.touched.customer && Boolean(formik.errors.customer)}
                    helperText={formik.touched.customer && formik.errors.customer}
                  />
                </Grid>
                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Email
                        </span>
                      }
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Hotel</InputLabel>
                      <Select
                        id="hotel"
                        name="hotel"
                        label="Hotel"
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
                    <FormControl fullWidth>
                      <InputLabel>Room</InputLabel>
                      <Select
                        id="rooms"
                        name="rooms"
                        label="room"
                        displayEmpty
                        value={formik.values.rooms}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {roomState?.rooms.map((room: any, index: number) => (
                          <MenuItem key={index} value={formik.values.hotel === room.hotel ? room._id : ''}>
                            {formik.values.hotel === room.hotel ? room.name : ''}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="startDate"
                      name="startDate"
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Start Date
                        </span>
                      }
                      value={formik.values.startDate}
                      onChange={formik.handleChange}
                      error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                      helperText={formik.touched.startDate && formik.errors.startDate}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="endDate"
                      name="endDate"
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> End Date
                        </span>
                      }
                      value={formik.values.endDate}
                      onChange={formik.handleChange}
                      error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                      helperText={formik.touched.endDate && formik.errors.endDate}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="Note"
                      name="Note"
                      label="Note"
                      value={formik.values.Note}
                      onChange={formik.handleChange}
                      error={formik.touched.Note && Boolean(formik.errors.Note)}
                      helperText={formik.touched.Note && formik.errors.Note}
                    />
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

export default AddOrEditBooking;
