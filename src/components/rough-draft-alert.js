import React from 'react';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import DiscordIcon from 'mdi-material-ui/Discord';
import { DISCORD_URL } from '../constants';

export const RoughDraftAlert = () => {
  return (
    <Alert
      severity="warning"
      action={
        <Button
          startIcon={<DiscordIcon />}
          variant="outlined"
          color="inherit"
          borderColor="inherit"
          component="a"
          target="_blank"
          href={DISCORD_URL}
        >
          Contribute
        </Button>
      }
    >
      <AlertTitle>This is a rough draft!</AlertTitle>
      Everything on this page is a work in progress!{' '}
    </Alert>
  );
};
