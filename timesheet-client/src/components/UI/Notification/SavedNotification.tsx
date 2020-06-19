import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function SavedNotification(props: any) {
  return (
    <Snackbar
      autoHideDuration={props.duration}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={props.open}
      onClose={props.onClose}
      key={props.notificationKey}
    >
      <MuiAlert elevation={6} children={props.message} variant="filled" />
    </Snackbar>
  );
}

export default SavedNotification;
