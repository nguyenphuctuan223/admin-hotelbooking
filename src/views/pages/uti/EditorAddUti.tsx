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

import { Uti, UtiFilter } from 'types/uti';
import { addUti, editUti, getUtiList } from 'store/slices/uti';

interface Props {
  open: boolean;
  uti: Uti;
  utiFilter: UtiFilter;
  editing?: boolean;
  handleDrawerOpen: () => void;
}

const validationSchema = yup.object({
  type: yup.string().trim().max(50, `Maximum characters allowed is 50`).required('Name is required')
});

const AddOrEditUti = ({ open, editing, handleDrawerOpen, utiFilter, uti }: Props) => {
  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
      formik.resetForm();
    }
  };

  const HandleSubmit = (values: Uti) => {
    if (uti?._id) {
      dispatch(
        editUti({
          id: uti?._id,
          params: values,
          callback: (resp) => {
            if (resp?.status === 200) {
              dispatch(getUtiList(utiFilter));
              alertRequestSuccess('Edit uti successfully!');
              changeModal('close');
            } else {
              alertRequestFailure(resp?.message);
            }
          }
        })
      );
    } else {
      dispatch(
        addUti({
          params: values,
          callback: (resp) => {
            if (resp?.status === 200) {
              dispatch(getUtiList(utiFilter));
              alertRequestSuccess('Add uti successfully!');
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
      id: uti?._id,
      type: uti?.type,
      price: uti?.price,
      imgURL: uti?.imgURL
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
                    {uti?._id ? `Edit "${uti?.type}"` : `Add uti`}
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
                      id="type"
                      name="type"
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Type
                        </span>
                      }
                      value={formik.values.type}
                      onChange={formik.handleChange}
                      error={formik.touched.type && Boolean(formik.errors.type)}
                      helperText={formik.touched.type && formik.errors.type}
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
                      id="imgUrl"
                      name="imgUrl"
                      label="Image"
                      value={formik.values.imgURL}
                      onChange={formik.handleChange}
                      error={formik.touched.imgURL && Boolean(formik.errors.imgURL)}
                      helperText={formik.touched.imgURL && formik.errors.imgURL}
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

export default AddOrEditUti;
