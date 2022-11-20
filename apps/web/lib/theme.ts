import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff612f",
    },
    background: {
      default: "#f3f6ff",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default theme;
