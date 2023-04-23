// THIRD-PARTY
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

// PROJECT IMPORTS
interface Props {
  name: string | undefined;
  open: boolean;
  handleClose: (status: boolean) => void;
}

export default function AlertDelete({ name, open, handleClose }: Props) {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      keepMounted
      maxWidth="xs"
      aria-labelledby="item-delete-title"
      aria-describedby="item-delete-description"
    >
      {open && (
        <>
          <DialogTitle id="item-delete-title">{name} - Are you sure you want to delete?</DialogTitle>{' '}
          <DialogActions sx={{ mr: 2 }}>
            <Button onClick={() => handleClose(false)} color="error">
              Cancel
            </Button>
            <Button variant="contained" size="small" onClick={() => handleClose(true)} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
