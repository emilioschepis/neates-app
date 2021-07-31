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
    endpoint: "",
  },
};

export const CurrentEnvironment: Environment = __DEV__
  ? LocalEnvironment
  : ProdEnvironment;
