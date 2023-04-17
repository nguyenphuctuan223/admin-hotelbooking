import React from 'react';
import * as Yup from 'yup';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput, Snackbar } from '@mui/material';
import { Formik } from 'formik';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function JWTForgot({ forgotProp, ...others }: { forgotProp?: number }): JSX.Element {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  /* const [checked, setChecked] = React.useState(true); */
  const [open, setOpen] = React.useState(false);

  const { login } = useAuth();

  const handleClick = () => {
    // If Input not empty then alert success, else set error
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await login(values.email, values.password).then(
              () => {},
              (err: any) => {
                if (scriptedRef.current) {
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                }
              }
            );
          } catch (err: any) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  href="login"
                  onClick={handleClick}
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Submit
                </Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                  </Alert>
                </Snackbar>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default JWTForgot;
