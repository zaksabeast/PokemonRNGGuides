import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

export const RoughDraftAlert = () => {
  return (
    <Alert severity="warning">
      <AlertTitle>This is a rough draft!</AlertTitle>
      Everything on this page is a work in progress!
    </Alert>
  );
};
