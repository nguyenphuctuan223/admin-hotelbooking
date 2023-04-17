import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Profile from 'views/pages/account/tabs/Profile';
import ChangePassword from 'views/pages/account/tabs/ChangePassword';
import SettingPage from 'views/pages/account/tabs/SettingsPage';
import { Grid, Paper, CardContent } from '@mui/material';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={0}>
      <CardContent>
        <Grid container spacing={2} sx={{ minHeight: '100vh' }}>
          <Grid item xs={12}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Profile" value="1" />
                  <Tab label="Change Password" value="2" />
                  <Tab label="Setings" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {' '}
                <Profile />{' '}
              </TabPanel>
              <TabPanel value="2">
                {' '}
                <ChangePassword />{' '}
              </TabPanel>
              <TabPanel value="3">
                {' '}
                <SettingPage />{' '}
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  );
}
