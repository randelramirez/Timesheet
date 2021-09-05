import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

interface ISavedNotificationProps {
  duration: number;
  open: boolean;
  onClose: any;
  notificationKey: any;
  message: string;
}

function SavedNotification({
  duration,
  message,
  notificationKey,
  onClose,
  open,
}: ISavedNotificationProps) {
  return (
    <Snackbar
      autoHideDuration={duration}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={onClose}
      key={notificationKey}
    >
      <MuiAlert elevation={6} children={message} variant="filled" />
    </Snackbar>
  );
}

export default SavedNotification;
