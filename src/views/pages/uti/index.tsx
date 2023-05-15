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

import { Uti, UtiFilter } from 'types/uti';
import { getUtiList } from 'store/slices/uti';
import UtiList from './UtiList';
import AddOrEditUti from './EditorAddUti';

const initialState: UtiFilter = {
  search: '',
  currentPage: 1,
  limit: 20
};
const UtiIndex = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const utiState = useSelector((state) => state.uti);
  const menuState = useSelector((state) => state.menu);

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const [utiFilter, setUtiFilter] = useState(initialState);
  const [data, setData] = React.useState<Uti[]>([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const spacingMD = matchDownMD ? 1 : 1.5;

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setUtiFilter({ ...utiFilter, currentPage: page! });
  };

  const [search, setSearch] = useState('');
  const handleSearch = (searchValue: string) => {
    setUtiFilter({ ...utiFilter, search: searchValue, currentPage: 1 });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce(handleSearch, 300), []);

  const handleDrawerOpen = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const getListUti = async () => {
    await dispatch(getUtiList(utiFilter));
  };

  const postUti = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  useEffect(() => {
    setData(utiState.utis);
  }, [utiState]);

  useEffect(() => {
    getListUti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [utiFilter]);

  useEffect(() => {
    setUtiFilter(initialState);
    getListUti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuState]);

  const getListAfterDelete = () => {
    const countUsers = utiState.utis.length;
    const { currentPage } = utiFilter;
    if (countUsers <= 1 && currentPage > 1) {
      const params = { ...utiFilter, currentPage: currentPage - 1 };
      setUtiFilter(params);
      dispatch(getUtiList(params));
    } else {
      dispatch(getUtiList(utiFilter));
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
              <Fab color="primary" size="small" onClick={postUti} sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}>
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
              <TableCell>Hotel</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((uti, index) => (
              <UtiList key={uti._id} uti={uti} index={index} utiFilter={utiFilter} getListAfterDelete={getListAfterDelete} />
            ))}
          </TableBody>
        </Table>
        <AddOrEditUti editing open={openDrawer} handleDrawerOpen={handleDrawerOpen} utiFilter={utiFilter} uti={{}} />
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
                count={utiState.pageCount}
                page={utiState.currentPage}
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

export default UtiIndex;
