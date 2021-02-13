import React from 'react';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { PixelImage } from './pixel-image';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  spriteContainer: {
    marginRight: theme.spacing(2),
  },
  guideDetailsContainer: {
    width: '100%',
  },
}));

export const GuidePreview = ({ name, description, slug, spriteSrc }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.spriteContainer}>
        <PixelImage src={spriteSrc} width={50} />
      </div>
      <div className={classes.guideDetailsContainer}>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Typography gutterBottom>{description}</Typography>
        <Button variant="outlined" component={Link} to={`/${slug}`} fullWidth>
          View Guide
        </Button>
      </div>
    </div>
  );
};
