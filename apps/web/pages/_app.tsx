import { ApolloProvider } from "@apollo/client";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider as MaterialUIThemeProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import AppShell from "lib/AppShell";
import { AuthProvider } from "lib/providers/Auth";
import theme from "lib/theme";
import Router from "next/router";
import { parseCookies } from "nookies";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import React, { useEffect } from "react";
import "react-image-lightbox/style.css";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { useApollo } from "../lib/apollo";

NProgress.configure({ showSpinner: false });

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps, authenticated }: any): JSX.Element => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <StylesProvider injectFirst>
        <MaterialUIThemeProvider theme={theme}>
          <StyledComponentsThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider authenticated={authenticated}>
              <AppShell isAuth={authenticated}>
                <Component {...pageProps} />
              </AppShell>
            </AuthProvider>
          </StyledComponentsThemeProvider>
        </MaterialUIThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async ({ Component, router, ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};
  let authenticated = false;

  if (token) {
    authenticated = true;
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, authenticated };
};

export default MyApp;
