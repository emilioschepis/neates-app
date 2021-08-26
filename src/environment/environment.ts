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
    apiKey: "AIzaSyAC88Tm9qGu2DZuWT0LgMqysB9YtcW9U8E",
    authDomain: "neates-prod.firebaseapp.com",
    projectId: "neates-prod",
  },
  graphql: {
    endpoint: "http://localhost:8080",
  },
};

export const ProdEnvironment: Environment = {
  firebase: {
    apiKey: "AIzaSyAC88Tm9qGu2DZuWT0LgMqysB9YtcW9U8E",
    authDomain: "neates-prod.firebaseapp.com",
    projectId: "neates-prod",
  },
  graphql: {
    endpoint: "https://neates-prod.herokuapp.com",
  },
};

export const CurrentEnvironment: Environment = (() => {
  if (__DEV__) {
    return LocalEnvironment;
  }

  switch (Updates.releaseChannel?.toLowerCase()) {
    case "prod":
      return ProdEnvironment;
    default:
      return LocalEnvironment;
  }
})();
