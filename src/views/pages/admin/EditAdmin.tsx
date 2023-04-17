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

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
// import { useDispatch } from 'store';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { openSnackbar } from 'store/slices/snackbar';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { dispatch } from 'store';
import { Admin, SelectProps } from 'types/admin';
import { addPerMission, getAdminList } from 'store/slices/admin';
import { useState } from 'react';

// const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

interface EditAdminProps {
  admin: Admin;
  open: boolean;
  handleDrawerOpen: () => void;
}

const initialState = {
  search: '',
  isTrust: '',
  isMint: '',
  isLogin: '',
  currentPage: 1,
  limit: 20
};

const Status: SelectProps[] = [
  {
    value: '1',
    label: 'True'
  },
  {
    value: '-1',
    label: 'False'
  }
];
const validationSchema = Yup.object({
  publicAddress: Yup.string().required('publicAddress is required')
});

const EditAdmin = ({ admin, open, handleDrawerOpen }: EditAdminProps) => {
  const Notification = (color: string, message: string, severity: string) => {
    dispatch(
      openSnackbar({
        open: true,
        message,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        severity,
        variant: 'alert',
        alert: {
          color
        },
        close: true
      })
    );
  };
  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
      formik.resetForm();
    }
  };
  const UpdateUser = (values: Admin) => {
    dispatch(
      addPerMission({
        params: { ...values },
        callback: (resp) => {
          if (resp?.data?.status === 'success') {
            Notification('success', 'Update user successfully!', 'success');
            dispatch(getAdminList(initialState));
            changeModal('close');
          } else {
            Notification('error', 'Update user Error', 'error');
          }
        }
      })
    );
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      publicAddress: admin.publicAddress,
      is_trust: admin.is_trust,
      is_login: admin.is_login,
      is_mint: admin.is_mint
    },
    validationSchema,
    onSubmit: (values: any) => {
      UpdateUser(values);
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
              <Grid item sx={{ width: 'calc(100% - 50px)' }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Button
                    variant="text"
                    color="error"
                    sx={{ p: 0.5, minWidth: 32, display: { xs: 'block', md: 'none' } }}
                    onClick={handleDrawerOpen}
                  >
                    <HighlightOffIcon />
                  </Button>
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
                    {`Edit ${admin?.name}`}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <form onSubmit={formik.handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DialogContent>
                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                  <Grid item xs={12}>
                    <TextField
                      id="publicAddress"
                      name="PublicAddress"
                      value={formik.values.publicAddress}
                      // onChange={formik.handleChange}
                      error={formik.touched.publicAddress && Boolean(formik.errors.publicAddress)}
                      helperText={formik.touched.publicAddress && formik.errors.publicAddress}
                      fullWidth
                      label="PublicAddress"
                      // disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Is Trust</InputLabel>
                      <Select
                        id="is_trust"
                        name="is_trust"
                        label="Is Trust"
                        displayEmpty
                        value={formik.values.is_trust}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {Status.map((status: SelectProps, index: number) => (
                          <MenuItem key={index} value={status.value}>
                            {status.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Is Login</InputLabel>
                      <Select
                        id="is_login"
                        name="is_login"
                        label="Is Login"
                        displayEmpty
                        value={formik.values.is_login}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {Status.map((status: SelectProps, index: number) => (
                          <MenuItem key={index} value={status.value}>
                            {status.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Is Mint</InputLabel>
                      <Select
                        id="is_mint"
                        name="is_mint"
                        label="Is Mint"
                        displayEmpty
                        value={formik.values.is_mint}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {Status.map((status: SelectProps, index: number) => (
                          <MenuItem key={index} value={status.value}>
                            {status.label}
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

export default EditAdmin;
