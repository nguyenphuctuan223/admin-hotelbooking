/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
// THIRD-PARTY
import { Box, Button, Dialog, DialogContent, Divider, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import AnimateButton from 'ui-component/extended/AnimateButton';

import * as yup from 'yup';
import { useFormik } from 'formik';

// PROJECT IMPORTS
import { dispatch } from 'store';
import { gridSpacing } from 'store/constant';
import { addAdministrator, editAdministrator, getAdministratorList } from 'store/slices/user';

import { Administrator, UserFilter } from 'types/user';
import { isEmails, isUserName } from 'utils/regexHelper';
import { alertRequestFailure, alertRequestSuccess } from 'utils/axios';

interface Props {
  open: boolean;
  adminFilter: UserFilter;
  administrator: Administrator;
  editing?: boolean;
  handleDrawerOpen: () => void;
}

const validationSchema = yup.object({
  username: yup
    .string()
    .trim()
    .max(50, `Maximum characters allowed is 50`)
    .matches(isUserName, 'Enter a valid userName')
    .required('Username is required'),
  email: yup
    .string()
    .trim()
    .max(50, `Maximum characters allowed is 50`)
    .matches(isEmails, 'Email is not valid')
    .email('Enter a valid email')
    .required('Email is required')
});

const AddAdministrator = ({ open, editing, handleDrawerOpen, adminFilter, administrator }: Props) => {
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
      setErrors({});
      formik.resetForm();
    }
  };

  const addAdmin = (values: Administrator) => {
    if (administrator?._id) {
      dispatch(
        editAdministrator({
          id: administrator?._id,
          params: values,
          callback: (resp) => {
            if (resp?.status === 200) {
              dispatch(getAdministratorList(adminFilter));
              alertRequestSuccess('Edit account successfully!');
              changeModal('close');
            } else {
              alertRequestFailure(resp?.message);
            }
          }
        })
      );
    } else {
      dispatch(
        addAdministrator({
          params: values,
          callback: (resp) => {
            if (resp?.status === 201) {
              dispatch(getAdministratorList(adminFilter));
              alertRequestSuccess('Add account successfully!');
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
      id: administrator?._id,
      username: administrator?.username,
      email: administrator?.email,
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      addAdmin(values);
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
                    {administrator?._id ? `Edit "${administrator?.username}"` : `Add Acount`}
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
                      id="username"
                      name="username"
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> User Name
                        </span>
                      }
                      // InputProps={{
                      //   readOnly: !editable
                      // }}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      error={formik.touched.username && Boolean(formik.errors.username)}
                      helperText={formik.touched.username && formik.errors.username}
                    />
                  </Grid>
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
                      // InputProps={{
                      //   readOnly: !editable
                      // }}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  {!administrator._id && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="password"
                        name="password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        type={showPassword ? 'text' : 'password'}
                        label={
                          <span>
                            <span style={{ color: '#f44336' }}>*</span> Password
                          </span>
                        }
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={(formik.touched.password && Boolean(formik.errors.password)) || errors?.password}
                        helperText={(formik.touched.password && formik.errors.password) || errors?.password}
                      />
                    </Grid>
                  )}
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

export default AddAdministrator;
