// THIRD-PARTY
import React from 'react';
import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
  Paper,
  CardHeader,
  Snackbar
} from '@mui/material';
import { useTheme } from '@mui/system';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required')
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function ChangePassword() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = () => {
    // If Input not empty then alert success, else set error
    setOpen(true);
    formik.resetForm();
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      retypePassword: '',
      showPassword: false
    },
    validationSchema,
    onSubmit: (values) => {}
  });
  return (
    <Paper>
      <MainCard>
        <CardHeader
          title="Change Password"
          sx={{
            borderBottom: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
            ':hover': {
              boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)'
            }
          }}
        />
        <form noValidate onSubmit={formik.handleSubmit}>
          {/* <Grid container justifyContent="center" spacing={2} sx={{ minHeight: '100vh' }}> */}
          <Grid container rowSpacing={2} columnSpacing={gridSpacing} sx={{ mt: 0.25 }}>
            <Grid item xs={6}>
              <FormControl fullWidth error={Boolean(formik.touched.oldPassword && formik.errors.oldPassword)}>
                <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={formik.values.oldPassword}
                  type={formik.values.showPassword ? 'text' : 'password'}
                  name="oldPassword"
                  onChange={formik.handleChange}
                  label="oldPassword"
                  inputProps={{}}
                />
                {formik.touched.oldPassword && formik.errors.oldPassword && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {formik.errors.oldPassword}
                  </FormHelperText>
                )}
              </FormControl>
              {/* <Box sx={{ mt: 2 }}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                />
              </Box> */}
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={6}>
              <FormControl fullWidth error={Boolean(formik.touched.newPassword && formik.errors.newPassword)}>
                <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={formik.values.newPassword}
                  type={formik.values.showPassword ? 'text' : 'password'}
                  name="newPassword"
                  onChange={formik.handleChange}
                  label="newPassword"
                  inputProps={{}}
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {formik.errors.newPassword}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={Boolean(formik.touched.retypePassword && formik.errors.retypePassword)}>
                <InputLabel htmlFor="outlined-adornment-password">Retype New Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={formik.values.retypePassword}
                  type={formik.values.showPassword ? 'text' : 'password'}
                  name="retypePassword"
                  onChange={formik.handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="retypePassword"
                  inputProps={{}}
                />
                {formik.touched.retypePassword && formik.errors.retypePassword && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {formik.errors.retypePassword}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems="flex-end" justifyContent="flex-end" spacing={gridSpacing} sx={{ mt: 2 }}>
            <Grid item>
              <Button size="large" type="submit" variant="contained" color="primary" onClick={handleClick}>
                Change Password
              </Button>
            </Grid>
            <Grid item>
              <Button size="large" type="reset" variant="outlined" color="error" onClick={(e) => formik.resetForm()}>
                Clear
              </Button>
            </Grid>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Change Password Successfully!
              </Alert>
            </Snackbar>
          </Grid>
        </form>
      </MainCard>
    </Paper>
  );
}
