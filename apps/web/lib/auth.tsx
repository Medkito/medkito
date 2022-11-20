import Router from "next/router";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { MeDocument } from "generated/graphql";

export const logout = () => {
  Router.replace("/logout");
};

export const getCurrentUser = (
  apolloClient: ApolloClient<NormalizedCacheObject>
) => {
  return new Promise(async (resolve, _reject) => {
    try {
      const response = await apolloClient.query({ query: MeDocument });
      if (!response || !response.data || !response.data.me) {
        resolve(null);
      } else resolve(response.data.me);
    } catch (error) {
      resolve(null);
    }
  });
};
