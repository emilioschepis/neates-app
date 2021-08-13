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
    apiKey: "AIzaSyBD5QhXg-O3lj11l3zLsDKl_e6lVINLlwM",
    authDomain: "geonotes-prod.firebaseapp.com",
    projectId: "geonotes-prod",
  },
  graphql: {
    endpoint: "http://localhost:8080",
  },
};

export const ProdEnvironment: Environment = {
  firebase: {
    apiKey: "AIzaSyBD5QhXg-O3lj11l3zLsDKl_e6lVINLlwM",
    authDomain: "geonotes-prod.firebaseapp.com",
    projectId: "geonotes-prod",
  },
  graphql: {
    endpoint: "https://geonotes-prod.herokuapp.com",
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
