// THIRD-PARTY
import React, { useEffect, useState, useCallback } from 'react';
import {
  Button,
  Fab,
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
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import AddIcon from '@mui/icons-material/AddTwoTone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';

// PROJECT IMPORTS
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getAdministratorList } from 'store/slices/user';
import { UserProfile } from 'types/user-profile';
import { UserFilter, SelectProps } from 'types/user';
import NoDataImg from 'assets/images/logo/nodata.png';
import 'assets/scss/style.scss';
import Administrator from './AdminList';
import AddAdministrator from './EditAdmin';

const SortStatus: SelectProps[] = [
  {
    value: '',
    label: 'All'
  },
  {
    value: 1,
    label: 'Active'
  },
  {
    value: 0,
    label: 'Inactive'
  }
];

const initialState: UserFilter = {
  search: '',
  status: '',
  currentPage: 1,
  limit: 20
};
const Administrators = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const administratorState = useSelector((state) => state.user);
  const menuState = useSelector((state) => state.menu);

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const [adminFilter, setAdminFilter] = useState(initialState);
  const [data, setData] = React.useState<UserProfile[]>([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openSort = Boolean(anchorEl);
  const spacingMD = matchDownMD ? 1 : 1.5;

  const sortLabel = SortStatus.filter((items) => items.value === adminFilter.status);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setAdminFilter({ ...adminFilter, currentPage: page! });
  };

  const [search, setSearch] = useState('');
  const handleSearch = (searchValue: string) => {
    setAdminFilter({ ...adminFilter, search: searchValue, currentPage: 1 });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce(handleSearch, 300), []);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortStatusClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAdminFilter({ ...adminFilter, status: index, currentPage: 1 });
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const getListAdmin = async () => {
    await dispatch(getAdministratorList(adminFilter));
  };

  const addAdministrator = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  useEffect(() => {
    setData(administratorState.users);
  }, [administratorState]);

  useEffect(() => {
    getListAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminFilter]);

  useEffect(() => {
    setAdminFilter(initialState);
    getListAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuState]);

  // const getListAfterDelete = () => {
  //   const countUsers = administratorState.users.length;
  //   const { currentPage } = adminFilter;
  //   if (countUsers <= 1 && currentPage > 1) {
  //     const params = { ...adminFilter, currentPage: currentPage - 1 };
  //     setAdminFilter(params);
  //     dispatch(getAdministratorList(params));
  //   } else {
  //     dispatch(getAdministratorList(adminFilter));
  //   }
  // };

  return (
    <MainCard
      title={
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" justifyContent="space-between" spacing={matchDownMD ? 0.5 : 2}>
              <Grid item>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={matchDownSM ? 0.5 : spacingMD}>
                  <TextField
                    sx={{ width: { xs: 140, md: 'auto' } }}
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
                    <Typography variant="h5">Filter by: </Typography>
                    <Button
                      id="demo-positioned-button"
                      aria-controls="demo-positioned-menu"
                      aria-haspopup="true"
                      aria-expanded={openSort ? 'true' : undefined}
                      onClick={handleClickListItem}
                      sx={{ color: 'grey.500', fontWeight: 400 }}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {sortLabel.length > 0 && sortLabel[0].label}
                    </Button>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={openSort}
                      onClose={handleSortStatusClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      {SortStatus.map((status, index) => (
                        <MenuItem
                          sx={{ p: 1.5, textTransform: 'capitalize' }}
                          key={index}
                          selected={status.value === adminFilter.status}
                          onClick={(event) => handleMenuItemClick(event, status.value)}
                        >
                          {status.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
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
          </Grid>
        </Grid>
      }
      content={false}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((administrator, index) => (
              <Administrator
                key={administrator.id}
                administrator={administrator}
                index={index}
                adminFilter={adminFilter}
                // getListAfterDelete={}
              />
            ))}
          </TableBody>
        </Table>
        <AddAdministrator editing open={openDrawer} handleDrawerOpen={handleDrawerOpen} adminFilter={adminFilter} administrator={{}} />
      </TableContainer>
      {data?.length === 0 && (
        <div className="noData">
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
                count={administratorState.pageCount}
                page={administratorState.currentPage}
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

export default Administrators;
