import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { CurrentEnvironment } from "../environment/environment";
import { getCurrentToken } from "../utils/authUtils";

const authLink = setContext(async () => {
  const currentToken = await getCurrentToken();

  return {
    headers: {
      Authorization: currentToken ? `Bearer ${currentToken}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: CurrentEnvironment.graphql.endpoint + "/v1/graphql",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
