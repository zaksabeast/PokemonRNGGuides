import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 600,
      lg: 900,
      xl: 1200
    }
  },
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#1976d2",
      dark: "#004ba0",
      light: "#63a4ff",
      contrastText: "#fff"
    },
    secondary: {
      main: "#fff"
    }
  }
});
