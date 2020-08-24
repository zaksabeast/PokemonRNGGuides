import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  h2: {
    marginTop: theme.spacing(7),
  },
  h3: {
    marginTop: theme.spacing(2),
  },
  pre: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
  },
  pixelImage: {
    imageRendering: 'pixelated',
  },
  ul: {
    listStyleType: 'disc',
    marginTop: theme.spacing(0.6),
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  li: {
    marginTop: 0,
    marginBottom: theme.spacing(0.6),
    marginLeft: 0,
    marginRight: 0,
  },
  p: {
    marginBottom: theme.spacing(2),
  },
}));

const H1 = props => <Typography variant="h1" {...props} />;

const H2 = props => {
  const classes = useStyles();
  return (
    <Typography
      variant="h4"
      component="h2"
      className={classes.h2}
      gutterBottom
      {...props}
    />
  );
};

const H3 = props => {
  const classes = useStyles();
  return (
    <Typography
      variant="h5"
      component="h3"
      className={classes.h3}
      gutterBottom
      {...props}
    />
  );
};

const Pre = props => {
  const classes = useStyles();
  return <Paper className={classes.pre} variant="outlined" {...props} />;
};

const UnorderedList = props => {
  const classes = useStyles();
  return <Typography component="ul" className={classes.ul} {...props} />;
};

const ListItem = props => {
  const classes = useStyles();
  return <Typography component="li" className={classes.li} {...props} />;
};

const TableHead = props => <TableCell variant="head" {...props} />;

const PixelImage = props => {
  const classes = useStyles();
  return <img className={classes.pixelImage} {...props} />;
};

const Paragraph = props => {
  const classes = useStyles();
  return <Typography className={classes.p} {...props} />;
};

export const mdxComponents = {
  PixelImage,
  h1: H1,
  h2: H2,
  h3: H3,
  p: Paragraph,
  a: Link,
  pre: Pre,
  code: Typography,
  li: ListItem,
  table: Table,
  tr: TableRow,
  td: TableCell,
  th: TableHead,
  ul: UnorderedList,
};
