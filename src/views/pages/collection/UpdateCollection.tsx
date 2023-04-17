import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
// import { useDispatch } from 'store';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { openSnackbar } from 'store/slices/snackbar';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { dispatch } from 'store';
import { Admin, SelectProps } from 'types/admin';
import { Collection, CollectionFilter } from 'types/collection';
import { addPermissionForCollection, getCollectionList } from 'store/slices/collection';

// const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

interface UpdateCollectionProps {
  collection: Collection;
  open: boolean;
  handleDrawerOpen: () => void;
}

const initialState: CollectionFilter = {
  search: '',
  category: '',
  isTrending: '',
  isTrust: '',
  currentPage: 1,
  limit: 20
};

const Status: SelectProps[] = [
  {
    value: '1',
    label: 'True'
  },
  {
    value: '-1',
    label: 'False'
  }
];
const validationSchema = Yup.object({
  id: Yup.string().required('Id is required')
});

const UpdateCollection = ({ collection, open, handleDrawerOpen }: UpdateCollectionProps) => {
  const Notification = (color: string, message: string, severity: string) => {
    dispatch(
      openSnackbar({
        open: true,
        message,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        severity,
        variant: 'alert',
        alert: {
          color
        },
        close: true
      })
    );
  };
  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
      formik.resetForm();
    }
  };
  const UpdateUser = (values: Admin) => {
    dispatch(
      addPermissionForCollection({
        params: { ...values },
        callback: (resp) => {
          if (resp?.data?.status === 'success') {
            Notification('success', 'Update collection successfully!', 'success');
            dispatch(getCollectionList(initialState));
            changeModal('close');
          } else {
            Notification('error', 'Update collection Error', 'error');
          }
        }
      })
    );
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // eslint-disable-next-line no-underscore-dangle
      id: collection._id,
      is_trust: collection.is_trust,
      is_trending: collection.is_trending
    },
    validationSchema,
    onSubmit: (values: any) => {
      UpdateUser(values);
    }
  });

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleDrawerOpen();
        formik.resetForm();
      }}
      sx={{
        '&>div:nth-of-type(3)': {
          '&>div': {
            m: 0,
            borderRadius: '0px',
            width: 850,
            maxWidth: 850,
            maxHeight: '100%'
          }
        }
      }}
    >
      {open && (
        <>
          <Box sx={{ p: 3 }}>
            <Grid container alignItems="center" spacing={0.5} justifyContent="space-between">
              <Grid item sx={{ width: 'calc(100% - 50px)' }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Button
                    variant="text"
                    color="error"
                    sx={{ p: 0.5, minWidth: 32, display: { xs: 'block', md: 'none' } }}
                    onClick={handleDrawerOpen}
                  >
                    <HighlightOffIcon />
                  </Button>
                  <Typography
                    variant="h4"
                    sx={{
                      display: 'inline-block',
                      width: 'calc(100% - 34px)',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      verticalAlign: 'middle'
                    }}
                  >
                    {`Edit ${collection?.name}`}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <form onSubmit={formik.handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DialogContent>
                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                  <Grid item xs={12}>
                    <TextField
                      id="id"
                      name="id"
                      value={formik.values.id}
                      error={formik.touched.id && Boolean(formik.errors.id)}
                      helperText={formik.touched.id && formik.errors.id}
                      fullWidth
                      label="Id"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Is Trust</InputLabel>
                      <Select
                        id="1233321"
                        name="is_trust"
                        label="Is Trust"
                        value={formik.values.is_trust}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {Status.map((status: SelectProps, index: number) => (
                          <MenuItem key={index} value={status.value}>
                            {status.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Is Trending</InputLabel>
                      <Select
                        id="2311231"
                        name="is_trending"
                        label="Is Trending"
                        value={formik.values.is_trending}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {Status.map((status: SelectProps, index: number) => (
                          <MenuItem key={index} value={status.value}>
                            {status.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button fullWidth variant="contained" type="submit">
                        Save
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </DialogContent>
            </LocalizationProvider>
          </form>
        </>
      )}
    </Dialog>
  );
};

export default UpdateCollection;
