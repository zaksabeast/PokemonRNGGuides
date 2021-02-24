import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: ({ width = '100%' }) => ({
    width,
    imageRendering: 'pixelated',
  }),
});

export const PixelImage = ({ width, ...props }) => {
  const classes = useStyles({ width });
  return <img {...props} className={classes.root} />;
};
