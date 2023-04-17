import React, { useState } from 'react';

// THIRD-PARTY
import { useTheme } from '@mui/material/styles';
import { Avatar, ButtonBase, Grid, IconButton, Menu, MenuItem, Stack, Switch, TableCell, TableRow, Typography } from '@mui/material';

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

import VerifiedIcon from '@mui/icons-material/Verified';

// PROJECT IMPORTS
import { useSelector } from 'store';

import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';
import { Collection, CollectionFilter } from 'types/collection';
import UpdateCollection from './UpdateCollection';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import moment from 'moment';

interface Props {
  collection: Collection;
  index: number;
  collectionFilter: CollectionFilter;
}

const CollectionList = ({ collection, index, collectionFilter }: Props) => {
  const theme = useTheme();
  const collectionState = useSelector((state) => state.collection);
  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
  const [openCollectionDrawer, setOpenCollectionDrawer] = useState<boolean>(false);

  const handleCollectionDrawerOpen = () => {
    setOpenCollectionDrawer((prevState) => !prevState);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const editCollection = async () => {
    // await setEdit(true);
    setOpenCollectionDrawer((prevState) => !prevState);
  };

  const Android12Switch = styled(Switch)(() => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12
      }
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2
    }
  }));

  return (
    <>
      <TableRow hover key={index}>
        <TableCell sx={{ width: '5%', pl: 4 }}>
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">{index + 20 * (collectionState?.currentPage - 1) + 1} </Typography>
          </Stack>
        </TableCell>
        {/* <TableCell sx={{ overflow: 'hidden', maxWidth: 300 }} component="th" scope="row">
          <Link
            underline="hover"
            color="default"
            sx={{
              overflow: 'hidden',
              display: 'block',
              maxWidth: 160,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'primary.main',

              ':hover': { color: 'primary.main', textDecoration: 'underline' },
              cursor: 'pointer'
            }}
            // onClick={openPropertyModal}
          >
            {collection?.name}
          </Link>
        </TableCell> */}
        <TableCell>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              {collection?.imageURIs && collection?.imageURIs ? (
                <Avatar
                  alt="Logo"
                  src={`${process.env.REACT_APP_BASE_IMAGE_URL}/${collection?.imageURIs?.[0]}`}
                  variant="square"
                  sx={{ borderRadius: '8px' }}
                />
              ) : (
                <Avatar />
              )}
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography align="left" variant="subtitle1" component="div">
                {collection?.name}{' '}
                {collection?.is_trust === '1' && <CheckCircleIcon sx={{ color: 'success.dark', width: 16, height: 16, mb: -0.4 }} />}
              </Typography>
              <Typography align="left" variant="subtitle2" noWrap>
                By {collection?.owner?.name}
              </Typography>
            </Grid>
          </Grid>
        </TableCell>
        {/* <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '500px' }}>{collection?.owner?.name}</TableCell> */}
        <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '624px' }}>{collection.description} </TableCell>
        {/* <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '624px' }}>
          {collection?.imageURIs && collection?.imageURIs ? (
            <img
              src={`${process.env.REACT_APP_BASE_IMAGE_URL}/${collection?.imageURIs?.[0]}`}
              alt="axies"
              key={index}
              style={{ height: '60px', cursor: 'pointer', width: '70px' }}
            />
          ) : (
            'No Image'
          )}
        </TableCell> */}

        <TableCell>
          {collection?.is_trust === '1' ? (
            // <FormControlLabel control={<Android12Switch defaultChecked checked />} label="" />
            <VerifiedIcon style={{ color: 'rgb(32, 129, 226)', width: '40px', height: '40px' }} />
          ) : (
            <VerifiedIcon style={{ width: '40px', height: '40px' }} />
            // <FormControlLabel control={<Android12Switch defaultChecked checked={false} />} label="" />
          )}
        </TableCell>
        <TableCell>
          {collection?.is_trending === '1' ? (
            // <FormControlLabel control={<Android12Switch defaultChecked checked />} label="" />
            <VerifiedIcon style={{ color: 'rgb(32, 129, 226)', width: '40px', height: '40px' }} />
          ) : (
            <VerifiedIcon style={{ width: '40px', height: '40px' }} />

            // <FormControlLabel control={<Android12Switch defaultChecked checked={false} />} label="" />
          )}
        </TableCell>
        <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '624px' }}>
          {moment(collection.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
        </TableCell>
        <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '624px' }}>
          {moment(collection.createdAt).format('DD-MM-YYYY hh:mm:ss')}
        </TableCell>

        <TableCell align="center">
          <ButtonBase
            className="more-button"
            sx={{ borderRadius: '12px' }}
            onClick={handleClick}
            aria-controls="menu-comment"
            aria-haspopup="true"
          >
            <IconButton component="span" size="small" disableRipple>
              <MoreVertTwoToneIcon fontSize="inherit" />
            </IconButton>
          </ButtonBase>
          <Menu
            id="menu-comment"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            variant="selectedMenu"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                editCollection();
              }}
            >
              <EditIcon fontSize="small" sx={{ color: '#2196f3', mr: 1 }} />
              Edit
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      <UpdateCollection collection={collection} open={openCollectionDrawer} handleDrawerOpen={handleCollectionDrawerOpen} />
    </>
  );
};

export default CollectionList;
