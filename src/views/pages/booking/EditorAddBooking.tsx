/* eslint-disable no-underscore-dangle */
// THIRD-PARTY
import { Box, Button, Dialog, DialogContent, Divider, Grid, Stack, TextField, Typography } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import AnimateButton from 'ui-component/extended/AnimateButton';

import * as yup from 'yup';
import { useFormik } from 'formik';

// PROJECT IMPORTS
import { dispatch } from 'store';
import { gridSpacing } from 'store/constant';

import { alertRequestFailure, alertRequestSuccess } from 'utils/axios';
import { Booking, BookingFilter } from 'types/booking';
import { addBooking, editBooking, getBookingList } from 'store/slices/booking';

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
      Note: booking?.Note
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
