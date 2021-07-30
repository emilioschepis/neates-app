type Environment = {
  graphql: {
    endpoint: string;
  };
};

export const LocalEnvironment: Environment = {
  graphql: {
    endpoint: "http://localhost:8080",
  },
};

export const ProdEnvironment: Environment = {
  graphql: {
    endpoint: "",
  },
};

export const CurrentEnvironment: Environment = __DEV__
  ? LocalEnvironment
  : ProdEnvironment;
