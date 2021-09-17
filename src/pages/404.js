import React from 'react';
import { Link } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import { MainLayout } from '../layouts/main';

const ErrorPage = () => {
  return (
    <MainLayout
      title="Page not found"
      description="Oops! The page you are looking for has been removed or relocated."
    >
      <Typography variant="h5">
        <Link to="/">To Home</Link>
      </Typography>
    </MainLayout>
  );
};

export default ErrorPage;
