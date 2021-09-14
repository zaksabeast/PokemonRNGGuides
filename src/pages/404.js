import React from 'react';
import { Link } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import { MainLayout } from '../layouts/main';

const ErrorPage = () => {
  return (
    <MainLayout>
      <Typography variant="h3" gutterBottom>
        Page not found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Oops! The page you are looking for has been removed or relocated.
      </Typography>
      <Typography variant="h4">
        <Link to="/">To Home</Link>
      </Typography>
    </MainLayout>
  );
};

export default ErrorPage;
