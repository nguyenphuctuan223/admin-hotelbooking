// THIRD-PARTY
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Drawer, Stack, useMediaQuery } from '@mui/material';
import { memo, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';

// PROJECT IMPORTS
import Chip from 'ui-component/extended/Chip';
import LogoSection from '../LogoSection';
import MenuList from './MenuList';
import { drawerWidth } from 'store/constant';
import { openDrawer } from 'store/slices/menu';
import { useDispatch, useSelector } from 'store';

interface SidebarProps {
  window?: Window;
}

const Sidebar = ({ window }: SidebarProps) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);

  const logo = useMemo(
    () => (
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <LogoSection />
        </Box>
      </Box>
    ),
    []
  );

  const drawer = useMemo(
    () => (
      <PerfectScrollbar
        component="div"
        style={{
          height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
          paddingLeft: '16px',
          paddingRight: '9px'
        }}
      >
        <MenuList />
        <Stack direction="row" justifyContent="center" sx={{ mb: 1 }}>
          <Chip
            label={`Version : ${process.env.REACT_APP_VERSION}`}
            disabled
            chipcolor="secondary"
            size="small"
            sx={{ cursor: 'pointer' }}
          />
        </Stack>
        {/* <Stack direction="row" justifyContent="center" sx={{ mb: 1 }}>
          <Chip
            label={`Package support : ${process.env.REACT_APP_PACKAGE}`}
            disabled
            chipcolor="secondary"
            size="small"
            sx={{ cursor: 'pointer' }}
          />
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ mb: 1 }}>
          <Chip label={`Key : ${process.env.REACT_APP_KEY}`} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ mb: 1 }}>
          <Chip label={process.env.REACT_APP_CUSTOMER_INFO} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
        </Stack> */}
      </PerfectScrollbar>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [matchUpMd]
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={() => dispatch(openDrawer(!drawerOpen))}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: '88px'
            }
          }
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawerOpen && logo}
        {drawerOpen && drawer}
      </Drawer>
    </Box>
  );
};

export default memo(Sidebar);
