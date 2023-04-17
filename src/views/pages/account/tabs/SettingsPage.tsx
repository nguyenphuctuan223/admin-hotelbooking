// THIRD-PARTY
import React from 'react';
import {
  Paper,
  Grid,
  useTheme,
  CardHeader,
  CardContent,
  Typography,
  Switch,
  Divider,
  TextField,
  Button,
  Stack,
  Snackbar,
  FormGroup,
  FormControlLabel
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function SettingPage() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    email: true,
    desktop: false,
    attempted: false
  });
  const [FacebookURL, setFacebookURL] = React.useState('');
  const [LinkedInURL, setLinkedInURL] = React.useState('');
  const [TwitterURL, setTwitterURL] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleFacebookURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFacebookURL(event.target.value);
  };
  const handleFacebookConnect = () => {
    console.log(FacebookURL);
    setOpen(true);
  };

  const handleLinkedInURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkedInURL(event.target.value);
  };
  const handleLinkedInConnect = () => {
    console.log(LinkedInURL);
    setOpen(true);
  };

  const handleTwitterURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTwitterURL(event.target.value);
  };
  const handleTwitterConnect = () => {
    console.log(TwitterURL);
    setOpen(true);
  };

  return (
    <Paper>
      <Grid container justifyContent="center" spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard>
            <CardHeader
              title="Notifications"
              subheader="Alway let you knows about important changes"
              sx={{
                borderBottom: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
                ':hover': {
                  boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)'
                }
              }}
            />
            <CardContent>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12} lg={4}>
                  <Typography variant="h5">Send Email Notifications</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch checked={state.email} onChange={handleChange} name="email" inputProps={{ 'aria-label': 'controlled' }} />
                      }
                      label=""
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Divider />
              <Grid container justifyContent="center" spacing={2} sx={{ mt: 0.25 }}>
                <Grid item xs={12} lg={4}>
                  <Typography variant="h5">Notifications on your Desktop</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.desktop}
                          onChange={handleChange}
                          name="desktop"
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }
                      label="Chrome Browser Notification"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Divider />
              <Grid container justifyContent="center" spacing={2} sx={{ mt: 0.25 }}>
                <Grid item xs={12} lg={4}>
                  <Typography variant="h5">Notify when login attempted from other place</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.attempted}
                          onChange={handleChange}
                          name="attempted"
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }
                      label=""
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard>
            <CardHeader
              title="Social Networks"
              subheader="Learn more"
              sx={{
                borderBottom: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
                ':hover': {
                  boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)'
                }
              }}
            />
            <CardContent>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignContent="center"
                alignItems="center"
                spacing={2}
                sx={{ mt: 0.25 }}
              >
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <FacebookIcon fontSize="large" />
                    <TextField
                      margin="dense"
                      id="FacebookUrl"
                      label="Facebook Profile URL"
                      value={FacebookURL}
                      onChange={handleFacebookURLChange}
                      fullWidth
                      variant="outlined"
                    />
                    <Button variant="contained" color="primary" onClick={handleFacebookConnect}>
                      Connect
                    </Button>
                  </Stack>
                </Grid>
                <Divider />
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <LinkedInIcon fontSize="large" />
                    <TextField
                      margin="dense"
                      id="LinkedInUrl"
                      label="LinkedIn Profile URL"
                      value={LinkedInURL}
                      onChange={handleLinkedInURLChange}
                      fullWidth
                      variant="outlined"
                    />
                    <Button variant="contained" color="primary" onClick={handleLinkedInConnect}>
                      Connect
                    </Button>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <TwitterIcon fontSize="large" />
                    <TextField
                      margin="dense"
                      id="TwitterUrl"
                      label="Twitter Profile URL"
                      value={TwitterURL}
                      onChange={handleTwitterURLChange}
                      fullWidth
                      variant="outlined"
                    />
                    <Button variant="contained" color="primary" onClick={handleTwitterConnect}>
                      Connect
                    </Button>
                  </Stack>
                  <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                      Change Password Successfully!
                    </Alert>
                  </Snackbar>
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
      </Grid>
    </Paper>
  );
}
