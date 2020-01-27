import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2",
      dark: "#004ba0",
      light: "#63a4ff",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
    },
  },
})

export default theme
