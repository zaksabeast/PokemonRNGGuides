import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavDrawer } from '../components/nav-drawer';
import { AppBar } from '../components/app-bar';
import { Footer } from '../components/footer';
import Typography from '@material-ui/core/Typography';
import { MetaTags } from '../components/meta-tags';
import '../styles/global.css';

const DRAWER_WIDTH = 240;

const useStyles = makeStyles(theme => ({
  root: {
    overflowX: 'hidden',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  content: {
    flexGrow: 1,
    marginTop: theme.mixins.toolbar.minHeight,
    marginBottom: '2.5rem',
    marginLeft: '1.5rem',
    marginRight: '1.5rem',
    [theme.breakpoints.up('md')]: {
      maxWidth: 720,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  contentNavDrawerUnshift: {
    [theme.breakpoints.up('md')]: {
      width: '75%',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  contentNavDrawerShift: {
    [theme.breakpoints.up('md')]: {
      marginLeft: 'auto',
      width: `calc(75% - 4rem - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  titleContainer: {
    marginTop: '4rem',
    marginBottom: '0.5rem',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
}));

export const MainLayout = ({ children, title, description }) => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = React.useState(false);
  const classes = useStyles();
  const toggleNavDrawer = () => setIsNavDrawerOpen(!isNavDrawerOpen);
  const closeNavDrawer = () => setIsNavDrawerOpen(false);
  const contentClassNames = isNavDrawerOpen
    ? `${classes.content} ${classes.contentNavDrawerShift}`
    : `${classes.content} ${classes.contentNavDrawerUnshift}`;

  return (
    <React.Fragment>
      <MetaTags title={title} description={description} />
      <div className={classes.root}>
        <AppBar toggleDrawer={toggleNavDrawer} />
        <NavDrawer isOpen={isNavDrawerOpen} onClose={closeNavDrawer} />
        <main className={contentClassNames}>
          <div className={classes.titleContainer}>
            <Typography variant="h1" className={classes.title}>
              {title}
            </Typography>
            {description && (
              <Typography variant="subtitle1">{description}</Typography>
            )}
          </div>
          {children}
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
};
