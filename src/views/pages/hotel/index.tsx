/* eslint-disable no-underscore-dangle */
// THIRD-PARTY
import React, { useEffect, useState, useCallback } from 'react';
import {
  Fab,
  Grid,
  InputAdornment,
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
  useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import AddIcon from '@mui/icons-material/AddTwoTone';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';

// PROJECT IMPORTS
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import NoDataImg from 'assets/images/logo/nodata.png';
import 'assets/scss/style.scss';
import HotelList from './HotelList';
import AddHotel from './EditorAddHotel';
import { Hotel, HotelFilter } from 'types/hotel';
import { getHotelList } from 'store/slices/hotel';

const initialState: HotelFilter = {
  search: '',
  currentPage: 1,
  limit: 20
};
const HoteIndex = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const hotelState = useSelector((state) => state?.hotel);
  const menuState = useSelector((state) => state?.menu);

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const [hotelFilter, setHotelFilter] = useState(initialState);
  const [data, setData] = React.useState<Hotel[]>([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const spacingMD = matchDownMD ? 1 : 1.5;

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setHotelFilter({ ...hotelFilter, currentPage: page! });
  };

  const [search, setSearch] = useState('');
  const handleSearch = (searchValue: string) => {
    setHotelFilter({ ...hotelFilter, search: searchValue, currentPage: 1 });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce(handleSearch, 300), []);

  const handleDrawerOpen = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const getListHotel = async () => {
    await dispatch(getHotelList(hotelFilter));
  };

  const addHotel = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  useEffect(() => {
    setData(hotelState?.hotels);
  }, [hotelState?.hotels]);

  useEffect(() => {
    getListHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelFilter]);

  useEffect(() => {
    setHotelFilter(initialState);
    getListHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuState]);

  const getListAfterDelete = () => {
    const countUsers = hotelState.hotels.length;
    const { currentPage } = hotelFilter;
    if (countUsers <= 1 && currentPage > 1) {
      const params = { ...hotelFilter, currentPage: currentPage - 1 };
      setHotelFilter(params);
      dispatch(getHotelList(params));
    } else {
      dispatch(getHotelList(hotelFilter));
    }
  };

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
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
            <Tooltip title="Add">
              <Fab color="primary" size="small" onClick={addHotel} sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}>
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
              <TableCell sx={{ width: '15%' }}>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell sx={{ width: '46%' }}>Description</TableCell>
              <TableCell sx={{ width: '10%' }}>Area </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data?.map((hotel, index) => (
                <HotelList key={hotel._id} hotel={hotel} index={index} hotelFilter={hotelFilter} getListAfterDelete={getListAfterDelete} />
              ))}
          </TableBody>
        </Table>
        <AddHotel editing open={openDrawer} handleDrawerOpen={handleDrawerOpen} hotelFilter={hotelFilter} hotel={{}} />
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
                count={hotelState.pageCount}
                page={hotelState.currentPage}
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

export default HoteIndex;
