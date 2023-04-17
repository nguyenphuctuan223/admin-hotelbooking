// THIRD-PARTY
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useEffect, useState, useCallback } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { debounce } from 'lodash';

import MainCard from 'ui-component/cards/MainCard';

// PROJECT IMPORTS
import NoDataImg from 'assets/images/logo/nodata.png';

import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import 'assets/scss/style.scss';
import { Admin, AdminFilter, SelectProps } from 'types/admin';
import AdminList from './AdminList';
import { getAdminList } from 'store/slices/admin';

const IsTrust: SelectProps[] = [
  {
    value: '',
    label: 'All'
  },
  {
    value: 1,
    label: 'True'
  },
  {
    value: -1,
    label: 'False'
  }
];

const IsMint: SelectProps[] = [
  {
    value: '',
    label: 'All'
  },
  {
    value: 1,
    label: 'True'
  },
  {
    value: -1,
    label: 'False'
  }
];
const IsLogin: SelectProps[] = [
  {
    value: '',
    label: 'All'
  },
  {
    value: 1,
    label: 'True'
  },
  {
    value: -1,
    label: 'False'
  }
];

const initialState: AdminFilter = {
  search: '',
  isTrust: '',
  isMint: '',
  isLogin: '',
  currentPage: 1,
  limit: 20
};

const AdminManage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);
  const menuState = useSelector((state) => state.menu);

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const spacingMD = matchDownMD ? 1 : 1.5;

  const [search, setSearch] = useState('');
  const [data, setData] = useState<Admin[]>([]);
  const [adminFilter, setAdminFilter] = useState(initialState);
  const [anchorElTrust, setAnchorElTrust] = useState<null | HTMLElement>(null);
  const [anchorElMint, setAnchorElMint] = useState<null | HTMLElement>(null);
  const [anchorElLogin, setAnchorElLogin] = useState<null | HTMLElement>(null);

  const openSortTrust = Boolean(anchorElTrust);
  const openSortMint = Boolean(anchorElMint);
  const openSortLogin = Boolean(anchorElLogin);

  const sortTrust = IsTrust.filter((items) => items.value === adminFilter.isTrust);
  const sortMint = IsMint.filter((items) => items.value === adminFilter.isMint);
  const sortLogin = IsLogin.filter((items) => items.value === adminFilter.isLogin);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setAdminFilter({ ...adminFilter, currentPage: page! });
  };

  const handleSearch = (searchValue: string) => {
    setAdminFilter({ ...adminFilter, search: searchValue, currentPage: 1 });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce(handleSearch, 300), []);

  const handleTrustClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTrust(event.currentTarget);
  };
  const handleMintClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMint(event.currentTarget);
  };
  const handleLoginClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLogin(event.currentTarget);
  };

  const handleTrustMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAdminFilter({ ...adminFilter, isTrust: index, currentPage: 1 });
    setAnchorElTrust(null);
  };
  const handleMintMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAdminFilter({ ...adminFilter, isMint: index, currentPage: 1 });
    setAnchorElMint(null);
  };
  const handleLoginMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAdminFilter({ ...adminFilter, isLogin: index, currentPage: 1 });
    setAnchorElLogin(null);
  };

  const handleSortTrustStatusClose = () => {
    setAnchorElTrust(null);
  };
  const handleSortMintStatusClose = () => {
    setAnchorElMint(null);
  };
  const handleSortLoginStatusClose = () => {
    setAnchorElLogin(null);
  };

  const getListAdmin = async () => {
    await dispatch(getAdminList(adminFilter));
  };

  useEffect(() => {
    setData(adminState.admin);
  }, [adminState]);

  useEffect(() => {
    getListAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminFilter]);

  useEffect(() => {
    setAdminFilter(initialState);
    getListAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuState]);

  return (
    <MainCard
      title={
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" justifyContent="space-between" spacing={matchDownMD ? 0.5 : 2}>
              <Grid item>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={matchDownSM ? 0.5 : spacingMD}>
                  <TextField
                    sx={{ width: '200px' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      )
                    }}
                    value={search}
                    placeholder="Search...."
                    size="small"
                    onChange={(e) => {
                      setSearch(e.target.value);
                      debounceSearch(e.target.value);
                    }}
                  />

                  <Typography sx={{ display: { xs: 'none', sm: 'flex' }, fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>
                    |
                  </Typography>
                  <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Typography variant="h5" sx={{ width: '75px' }}>
                      Filter Trust:{' '}
                    </Typography>
                    <Button
                      id="demo-positioned-button"
                      aria-controls="demo-positioned-menu"
                      aria-haspopup="true"
                      aria-expanded={openSortTrust ? 'true' : undefined}
                      onClick={handleTrustClickListItem}
                      sx={{ color: 'grey.500', fontWeight: 400 }}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {sortTrust.length > 0 && sortTrust[0].label}
                    </Button>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorElTrust}
                      open={openSortTrust}
                      onClose={handleSortTrustStatusClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      {IsTrust.map((trust, index) => (
                        <MenuItem
                          sx={{ p: 1.5, textTransform: 'capitalize' }}
                          key={index}
                          selected={trust.value === adminFilter.isTrust}
                          onClick={(event) => handleTrustMenuItemClick(event, trust.value)}
                        >
                          {trust.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Typography variant="h5" sx={{ width: '75px' }}>
                      Filter Mint:{' '}
                    </Typography>
                    <Button
                      id="demo-positioned-button"
                      aria-controls="demo-positioned-menu"
                      aria-haspopup="true"
                      aria-expanded={openSortMint ? 'true' : undefined}
                      onClick={handleMintClickListItem}
                      sx={{ color: 'grey.500', fontWeight: 400 }}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {sortMint.length > 0 && sortMint[0].label}
                    </Button>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorElMint}
                      open={openSortMint}
                      onClose={handleSortMintStatusClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      {IsMint.map((mint, index) => (
                        <MenuItem
                          sx={{ p: 1.5, textTransform: 'capitalize' }}
                          key={index}
                          selected={mint.value === adminFilter.isMint}
                          onClick={(event) => handleMintMenuItemClick(event, mint.value)}
                        >
                          {mint.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Typography variant="h5" sx={{ width: '75px' }}>
                      Filter Login:{' '}
                    </Typography>
                    <Button
                      id="demo-positioned-button"
                      aria-controls="demo-positioned-menu"
                      aria-haspopup="true"
                      aria-expanded={openSortLogin ? 'true' : undefined}
                      onClick={handleLoginClickListItem}
                      sx={{ color: 'grey.500', fontWeight: 400 }}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {sortLogin.length > 0 && sortLogin[0].label}
                    </Button>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorElLogin}
                      open={openSortLogin}
                      onClose={handleSortLoginStatusClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      {IsLogin.map((login, index) => (
                        <MenuItem
                          sx={{ p: 1.5, textTransform: 'capitalize' }}
                          key={index}
                          selected={login.value === adminFilter.isLogin}
                          onClick={(event) => handleLoginMenuItemClick(event, login.value)}
                        >
                          {login.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
            <Tooltip title="Add">
              <Fab
                color="primary"
                size="small"
                onClick={addAdministrator}
                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
              >
                <AddIcon fontSize="small" />
              </Fab>
            </Tooltip>
          </Grid> */}
        </Grid>
      }
      content={false}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3, width: '10%' }}>#</TableCell>
              <TableCell sx={{ width: '18%' }}>Name</TableCell>
              {/* <TableCell sx={{ width: '15%' }}>Public Address</TableCell> */}
              <TableCell sx={{ width: '20%' }}>Email</TableCell>
              <TableCell sx={{ width: '20%' }}>Bio</TableCell>
              <TableCell sx={{ width: '16%' }}>Is Trust</TableCell>
              <TableCell sx={{ width: '20%' }}>Is Login</TableCell>
              <TableCell sx={{ width: '9%' }}>Is Mint</TableCell>
              {/* <TableCell sx={{ pr: 3, width: '10%' }}>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((admin, index) => (
              <AdminList key={index} admin={admin} index={index} adminFilter={adminFilter} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data?.length === 0 && (
        <div className="noData" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px' }}>
          <img src={NoDataImg} alt="NoDataImg" style={{ marginRight: matchDownSM ? 8 : 16 }} />
          <p>No data available</p>
        </div>
      )}
      {data?.length > 0 && (
        <Grid item xs={12} sx={{ p: 3 }}>
          <Grid container justifyContent="space-between" spacing={gridSpacing}>
            <Grid item>
              <Pagination
                size={matchDownSM ? 'small' : 'medium'}
                count={adminState?.pageCount}
                page={adminState?.currentPage}
                onChange={handleChange}
                color="primary"
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </MainCard>
  );
};

export default AdminManage;
