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

import { Collection, CollectionFilter } from 'types/collection';
import { getCollectionList } from 'store/slices/collection';
import CollectionList from './CollectionList';
import { SelectProps } from 'types/admin';

const SortTrust: SelectProps[] = [
  {
    value: '',
    label: 'All'
  },
  {
    value: '1',
    label: 'True'
  },
  {
    value: '-1',
    label: 'False'
  }
];
const Trending: SelectProps[] = [
  {
    value: '',
    label: 'All'
  },
  {
    value: '1',
    label: 'True'
  },
  {
    value: '-1',
    label: 'False'
  }
];
const Categories: SelectProps[] = [
  {
    value: 'all',
    label: 'All'
  },
  {
    value: 'art',
    label: 'Art'
  },
  {
    value: 'sport',
    label: 'Sport'
  },
  {
    value: 'nature',
    label: 'Nature'
  },
  {
    value: 'card',
    label: 'Card'
  },
  {
    value: '3dModel',
    label: '3D Model'
  },
  {
    value: 'virtualWorlds',
    label: 'Virtual Worlds'
  }
];

const initialState: CollectionFilter = {
  search: '',
  category: '',
  isTrending: '',
  isTrust: '',
  currentPage: 1,
  limit: 20
};

const CollectionManage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const collectionState = useSelector((state) => state.collection);
  const menuState = useSelector((state) => state.menu);

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const spacingMD = matchDownMD ? 1 : 1.5;

  const [search, setSearch] = useState('');
  const [data, setData] = useState<Collection[]>([]);
  const [collectionFilter, setCollectionFilter] = useState(initialState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElCate, setAnchorElCate] = useState<null | HTMLElement>(null);
  const [anchorElTrend, setAnchorElTrend] = useState<null | HTMLElement>(null);

  const openSortTrust = Boolean(anchorEl);
  const openSortCate = Boolean(anchorElCate);
  const openSortTrending = Boolean(anchorElTrend);

  const sortIsTrust = SortTrust.filter((items) => items.value === collectionFilter.isTrust);
  const sortCategory = Categories.filter((items) => items.value === collectionFilter.category);
  const sortTrending = Trending.filter((items) => items.value === collectionFilter.isTrending);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCollectionFilter({ ...collectionFilter, currentPage: page! });
  };

  const handleSearch = (searchValue: string) => {
    setCollectionFilter({ ...collectionFilter, search: searchValue, currentPage: 1 });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce(handleSearch, 300), []);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickCateListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCate(event.currentTarget);
  };
  const handleClickTrendingListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTrend(event.currentTarget);
  };

  const handleTrustMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setCollectionFilter({ ...collectionFilter, isTrust: index, currentPage: 1 });
    setAnchorEl(null);
  };

  const handleCategoryMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: string) => {
    setCollectionFilter({ ...collectionFilter, category: index, currentPage: 1 });
    setAnchorElCate(null);
  };

  const handleTrendMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: string) => {
    setCollectionFilter({ ...collectionFilter, isTrending: index, currentPage: 1 });
    setAnchorElTrend(null);
  };

  const handleSortTrustClose = () => {
    setAnchorEl(null);
  };
  const handleSortCategoryClose = () => {
    setAnchorElCate(null);
  };
  const handleSortTrendlose = () => {
    setAnchorElTrend(null);
  };

  const getListCollection = async () => {
    await dispatch(getCollectionList(collectionFilter));
  };

  useEffect(() => {
    setData(collectionState.collection);
  }, [collectionState]);

  useEffect(() => {
    getListCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionFilter]);

  useEffect(() => {
    setCollectionFilter(initialState);
    getListCollection();
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
                      onClick={handleClickListItem}
                      sx={{ color: 'grey.500', fontWeight: 400 }}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {sortIsTrust.length > 0 && sortIsTrust[0].label}
                    </Button>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={openSortTrust}
                      onClose={handleSortTrustClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      {SortTrust.map((isTrust, index) => (
                        <MenuItem
                          sx={{ p: 1.5, textTransform: 'capitalize' }}
                          key={index}
                          selected={isTrust.value === collectionFilter.isTrust}
                          onClick={(event) => handleTrustMenuItemClick(event, isTrust.value)}
                        >
                          {isTrust.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Typography variant="h5" sx={{ width: '96px' }}>
                      Filter Category:{' '}
                    </Typography>
                    <Button
                      id="demo-positioned-button"
                      aria-controls="demo-positioned-menu"
                      aria-haspopup="true"
                      aria-expanded={openSortCate ? 'true' : undefined}
                      onClick={handleClickCateListItem}
                      sx={{ color: 'grey.500', fontWeight: 400 }}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {sortCategory.length > 0 && sortCategory[0].label}
                    </Button>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorElCate}
                      open={openSortCate}
                      onClose={handleSortCategoryClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      {Categories.map((category, index) => (
                        <MenuItem
                          sx={{ p: 1.5, textTransform: 'capitalize' }}
                          key={index}
                          selected={category.value === collectionFilter.category}
                          onClick={(event) => handleCategoryMenuItemClick(event, category.value)}
                        >
                          {category.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Typography variant="h5" sx={{ width: '96px' }}>
                      Filter Trending:{' '}
                    </Typography>
                    <Button
                      id="demo-positioned-button"
                      aria-controls="demo-positioned-menu"
                      aria-haspopup="true"
                      aria-expanded={openSortTrending ? 'true' : undefined}
                      onClick={handleClickTrendingListItem}
                      sx={{ color: 'grey.500', fontWeight: 400 }}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {sortTrending.length > 0 && sortTrending[0].label}
                    </Button>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorElTrend}
                      open={openSortTrending}
                      onClose={handleSortTrendlose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      {Trending.map((trend, index) => (
                        <MenuItem
                          sx={{ p: 1.5, textTransform: 'capitalize' }}
                          key={index}
                          selected={trend.value === collectionFilter.isTrending}
                          onClick={(event) => handleTrendMenuItemClick(event, trend.value)}
                        >
                          {trend.label}
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
              {/* <TableCell sx={{ width: '15%' }}>Owner</TableCell> */}
              <TableCell sx={{ width: '18%' }}>Description</TableCell>
              {/* <TableCell sx={{ width: '15%' }}>Image</TableCell> */}
              <TableCell sx={{ width: '12%' }}>Is Trust</TableCell>
              <TableCell sx={{ width: '12%' }}>Is Trending</TableCell>
              <TableCell sx={{ width: '18%' }}>Update At</TableCell>
              <TableCell sx={{ width: '17%' }}>Create At</TableCell>

              {/* <TableCell sx={{ pr: 3, width: '10%' }}>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((collection, index) => (
              <CollectionList key={index} collection={collection} index={index} collectionFilter={collectionFilter} />
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
                count={collectionState?.pageCount}
                page={collectionState?.currentPage}
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

export default CollectionManage;
