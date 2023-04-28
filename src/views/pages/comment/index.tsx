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
import { Review, ReviewFilter } from 'types/comment';
import { getReviewList } from 'store/slices/comment';
import CommentList from './CommentList';
import AddOrEditComment from './EditOrAddComment';

const initialState: ReviewFilter = {
  search: '',
  currentPage: 1,
  limit: 20
};
const CommentIndex = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const reviewState = useSelector((state) => state.review);
  const menuState = useSelector((state) => state.menu);

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const [reviewFilter, setReviewFilter] = useState(initialState);
  const [data, setData] = React.useState<Review[]>([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const spacingMD = matchDownMD ? 1 : 1.5;

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setReviewFilter({ ...reviewFilter, currentPage: page! });
  };

  const [search, setSearch] = useState('');
  const handleSearch = (searchValue: string) => {
    setReviewFilter({ ...reviewFilter, search: searchValue, currentPage: 1 });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce(handleSearch, 300), []);

  const handleDrawerOpen = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const getListReview = async () => {
    await dispatch(getReviewList(reviewFilter));
  };

  const addReview = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  useEffect(() => {
    setData(reviewState.reviews);
  }, [reviewState]);

  useEffect(() => {
    getListReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewFilter]);

  useEffect(() => {
    setReviewFilter(initialState);
    getListReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuState]);

  const getListAfterDelete = () => {
    const countUsers = reviewState.reviews.length;
    const { currentPage } = reviewFilter;
    if (countUsers <= 1 && currentPage > 1) {
      const params = { ...reviewFilter, currentPage: currentPage - 1 };
      setReviewFilter(params);
      dispatch(getReviewList(params));
    } else {
      dispatch(getReviewList(reviewFilter));
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
              <Fab color="primary" size="small" onClick={addReview} sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}>
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
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Hotel</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((review, index) => (
              <CommentList
                key={review._id}
                review={review}
                index={index}
                reviewFilter={reviewFilter}
                getListAfterDelete={getListAfterDelete}
              />
            ))}
          </TableBody>
        </Table>
        <AddOrEditComment editing open={openDrawer} handleDrawerOpen={handleDrawerOpen} reviewFilter={reviewFilter} review={{}} />
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
                count={reviewState.pageCount}
                page={reviewState.currentPage}
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

export default CommentIndex;
