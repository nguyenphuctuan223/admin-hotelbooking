// THIRD-PARTY
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Chip,
  ClickAwayListener,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { IconLogout, IconSettings } from '@tabler/icons';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import useAuth from 'hooks/useAuth';
import useConfig from 'hooks/useConfig';
import User from 'assets/images/users/user-round.svg';

const ProfileSection = () => {
  const theme = useTheme();
  const { borderRadius } = useConfig();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  const anchorRef = useRef<any>(null);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };
  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    setSelectedIndex(index);
    handleClose(event);

    navigate('./setting');

    // if (route && route !== '') {
    //   navigate(route);
    //   console.log('route', route);
    // }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            src={User}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />

      <Popper
        placement="bottom"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions in={open} {...TransitionProps}>
              <Paper>
                {open && (
                  <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                    <Box sx={{ p: 2, pb: 0 }}>
                      <Stack sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Typography variant="h4">Hi,</Typography>
                          <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                            {user?.name}
                          </Typography>
                        </Stack>
                        <Typography variant="subtitle2">{user?.type === 1 ? 'Administrator' : 'Customer'}</Typography>
                      </Stack>
                      <Divider />
                    </Box>
                    <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                      <Box sx={{ p: 2, pt: 0 }}>
                        <Divider />
                        <List
                          component="nav"
                          sx={{
                            width: '100%',
                            maxWidth: 350,
                            minWidth: 300,
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: '10px',
                            [theme.breakpoints.down('md')]: {
                              minWidth: '100%'
                            },
                            '& .MuiListItemButton-root': {
                              mt: 0.5
                            }
                          }}
                        >
                          <ListItemButton
                            sx={{ borderRadius: `${borderRadius}px` }}
                            selected={selectedIndex === 0}
                            onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 0)}
                          >
                            <ListItemIcon>
                              <IconSettings stroke={1.5} size="1.3rem" />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                          </ListItemButton>
                          <ListItemButton sx={{ borderRadius: `${borderRadius}px` }} selected={selectedIndex === 4} onClick={handleLogout}>
                            <ListItemIcon>
                              <IconLogout stroke={1.5} size="1.3rem" />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                          </ListItemButton>
                        </List>
                      </Box>
                    </PerfectScrollbar>
                  </MainCard>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
