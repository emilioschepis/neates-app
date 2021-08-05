import {
  LOCAL_FIREBASE_API_KEY,
  LOCAL_FIREBASE_AUTH_DOMAIN,
  LOCAL_FIREBASE_PROJECT_ID,
  LOCAL_GRAPHQL_ENDPOINT,
  PROD_FIREBASE_API_KEY,
  PROD_FIREBASE_AUTH_DOMAIN,
  PROD_FIREBASE_PROJECT_ID,
  PROD_GRAPHQL_ENDPOINT,
} from "@env";
import * as Updates from "expo-updates";

type Environment = {
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
  };
  graphql: {
    endpoint: string;
  };
};

export const LocalEnvironment: Environment = {
  firebase: {
    apiKey: LOCAL_FIREBASE_API_KEY,
    authDomain: LOCAL_FIREBASE_AUTH_DOMAIN,
    projectId: LOCAL_FIREBASE_PROJECT_ID,
  },
  graphql: {
    endpoint: LOCAL_GRAPHQL_ENDPOINT,
  },
};

export const ProdEnvironment: Environment = {
  firebase: {
    apiKey: PROD_FIREBASE_API_KEY,
    authDomain: PROD_FIREBASE_AUTH_DOMAIN,
    projectId: PROD_FIREBASE_PROJECT_ID,
  },
  graphql: {
    endpoint: PROD_GRAPHQL_ENDPOINT,
  },
};

export const CurrentEnvironment: Environment = (() => {
  if (__DEV__) {
    return LocalEnvironment;
  }

  switch (Updates.releaseChannel?.toLowerCase()) {
    case "production":
      return ProdEnvironment;
    default:
      return LocalEnvironment;
  }
})();
