import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { setCookie } from "nookies";
import { useMemo } from "react";
import { getAccessToken, setAccessToken } from "./accessToken";
import { logout as authLogout } from "./auth";
import { isServer } from "./utils";

let apolloClient = null;

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4000/subscriptions";

function createIsomorphLink(serverAccessToken) {
  const httpLink = new HttpLink({
    uri: `${API_URL}/api`,
    credentials: "include",
    fetch,
  });

  const refreshLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = isServer() ? serverAccessToken : getAccessToken();

      if (!token) {
        return true;
      }

      try {
        const { exp } = jwtDecode(token) as any;
        if (Date.now() >= exp * 1000) {
          return false;
        } else {
          return true;
        }
      } catch {
        return false;
      }
    },
    fetchAccessToken: () => {
      return fetch(`${API_URL}/refreshToken`, {
        method: "POST",
        credentials: "include",
      });
    },
    handleFetch: (accessToken) => {
      setAccessToken(accessToken);
      setCookie(null, "token", accessToken, {});
    },
    handleError: (err) => {
      console.warn("Your refresh token is invalid. Try to relogin");
      console.error(err);
      authLogout();
    },
  });

  const authLink = setContext((_request, { headers }) => {
    const token = isServer() ? serverAccessToken : getAccessToken();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log("graphQL errors:", graphQLErrors);
    console.log("network error:", networkError);
  });

  return ApolloLink.from([refreshLink, authLink, errorLink, httpLink]);
}

function createApolloClient(serverAccessToken) {
  const cache = new InMemoryCache({});

  const wsToken = isServer() ? serverAccessToken : getAccessToken();

  const wsLink = process.browser
    ? new WebSocketLink({
        // if you instantiate in the server, the error will be thrown
        uri: WS_URL,
        options: {
          reconnect: true,
          connectionParams: {
            authToken: wsToken,
          },
        },
      })
    : null;

  const httpLink = createIsomorphLink(serverAccessToken);

  const link = process.browser
    ? split(
        //only create the split in the browser
        // split based on operation type
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
    link: link,
    cache,
  });
}

export function initializeApollo(initialState = null, serverAccessToken) {
  const _apolloClient = apolloClient ?? createApolloClient(serverAccessToken);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(
    () => initializeApollo(initialState, null),
    [initialState]
  );
  return store;
}
