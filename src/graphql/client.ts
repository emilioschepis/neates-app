import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { CurrentEnvironment } from "../environment/environment";

const httpLink = new HttpLink({
  uri: CurrentEnvironment.graphql.endpoint + "/v1/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
