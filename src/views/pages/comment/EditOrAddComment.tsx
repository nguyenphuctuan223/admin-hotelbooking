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

import { Review, ReviewFilter } from 'types/comment';
import { addReview, editReview, getReviewList } from 'store/slices/comment';

interface Props {
  open: boolean;
  review: Review;
  reviewFilter: ReviewFilter;
  editing?: boolean;
  handleDrawerOpen: () => void;
}

const validationSchema = yup.object({
  name: yup.string().trim().max(50, `Maximum characters allowed is 50`).required('Name is required')
});

const AddOrEditComment = ({ open, editing, handleDrawerOpen, reviewFilter, review }: Props) => {
  const hotelState = useSelector((state) => state.hotel);

  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
      formik.resetForm();
    }
  };

  const HandleSubmit = (values: Review) => {
    if (review?._id) {
      dispatch(
        editReview({
          id: review?._id,
          params: values,
          callback: (resp) => {
            if (resp?.status === 200) {
              dispatch(getReviewList(reviewFilter));
              alertRequestSuccess('Edit view successfully!');
              changeModal('close');
            } else {
              alertRequestFailure(resp?.message);
            }
          }
        })
      );
    } else {
      dispatch(
        addReview({
          params: values,
          callback: (resp) => {
            if (resp?.status === 200) {
              dispatch(getReviewList(reviewFilter));
              alertRequestSuccess('Add view successfully!');
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
      id: review?._id,
      name: review?.name,
      comment: review?.comment,
      email: review?.email,
      hotel: review?.hotel,
      customer: review?.customer,
      rate: review?.rate
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
                    {review?._id ? `Edit "${review?.name}"` : `Add review`}
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
                      id="name"
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
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="comment"
                      name="comment"
                      label="Comment"
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                      error={formik.touched.comment && Boolean(formik.errors.comment)}
                      helperText={formik.touched.comment && formik.errors.comment}
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
                    <TextField
                      fullWidth
                      id="rate"
                      name="rate"
                      label="Rate"
                      type="number"
                      value={formik.values.rate}
                      onChange={formik.handleChange}
                      error={formik.touched.rate && Boolean(formik.errors.rate)}
                      helperText={formik.touched.rate && formik.errors.rate}
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

export default AddOrEditComment;
