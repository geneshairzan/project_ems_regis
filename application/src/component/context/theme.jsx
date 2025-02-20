import * as React from "react";
import { createTheme, ThemeProvider, responsiveFontSizes, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function CustomStyles({ isDark = false, ...props }) {
  const color = {
    primary: {
      main: "#111827",
      dark: "#111827",
      contrastText: "#fff",
    },

    secondary: {
      main: "#402e25",
      dark: "#1c1512",
      contrastText: "#fff",
    },
    app: {
      bg: "#1f2937",
    },

    fapp: {
      main: "#9ca3af",
      red: "red",
    },

    fwhite: {
      main: "#fff",
      dark: "#fff",
      contrastText: "#fff",

      contrastText: "#000",
    },

    fblack: {
      main: "#000",
    },

    third: {
      main: "#e20547",
    },

    error: {
      main: "#e63946",
    },

    success: {
      main: "#37b35a",
    },
  };

  const themeSetup = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      ...color,
    },
    typography: {
      fontFamily: "Akt",
      fontSize: 14,
      // h1: {
      //   fontWeight: 600,
      //   fontSize: 72,
      // },
      // h4: {
      //   fontWeight: 600,
      //   fontSize: 16,
      // },
    },
    components: {
      MuiTextField: {
        defaultProps: {
          autoComplete: "new-password",
          inputProps: {
            autoComplete: "new-password",
            form: {
              autoComplete: "new-password",
            },
          },
        },
      },

      MuiButton: {
        defaultProps: {
          variant: "contained",
          color: "primary",
        },
        styleOverrides: {
          root: {
            height: "48px", // Set the default height for all buttons
          },
          containedSecondary: {
            fontWeight: "bold",
          },
          containedOrange: {
            color: "white",
          },
          containedSuccess: {
            color: "white",
          },
        },
      },

      MuiTypography: {
        defaultProps: {
          body1: {
            color: "initial",
          },
          body2: {
            color: "initial",
          },
          variantMapping: {
            h1: "h1",
            h2: "h2",
            h3: "h3",
            h4: "h4",
            h5: "h5",
            h6: "h6",
            subtitle1: "p",
            subtitle2: "p",
            caption: "p",
            body1: "p",
            body2: "p",
            overline: "p",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={responsiveFontSizes(themeSetup)}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>{props.children}</StyledEngineProvider>
    </ThemeProvider>
  );
}
