import { Buffer } from "buffer";
import jwt from "expo-jwt";
import { SupportedAlgorithms } from "expo-jwt/dist/types/algorithms";

import firebase from "../firebase/firebase";

// https://stackoverflow.com/questions/56546048/decoding-jwt-token-without-key-in-an-react-native-expo-app
function decodeToken(token: string): Record<string, any> {
  const parts = token
    .split(".")
    .map((part) => Buffer.from(part.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString());

  return JSON.parse(parts[1]);
}

export async function waitForClaims(user: firebase.User, { maxRetries = 5 } = {}) {
  const customClaimsKey = "https://hasura.io/jwt/claims";

  if (!user) {
    throw new Error("User must be signed in to wait for claims.");
  }

  let claimsFound = false;
  let currentRetry = 0;

  while (!claimsFound) {
    await new Promise((resolve) => setTimeout(resolve, currentRetry * 1000));

    const token = await user.getIdToken(true);
    const decoded = decodeToken(token);

    if (!decoded || typeof decoded === "string") {
      throw new Error("Received invalid token.");
    }

    if (decoded[customClaimsKey] && decoded[customClaimsKey]["x-hasura-user-id"] === user.uid) {
      claimsFound = true;
    } else if (currentRetry < maxRetries) {
      currentRetry += 1;
    } else {
      throw new Error("Wait for claims exceeded timeout.");
    }
  }
}

export async function getCurrentUser(): Promise<firebase.User | null> {
  return new Promise<firebase.User | null>((resolve) => {
    if (firebase.auth().currentUser) {
      return resolve(firebase.auth().currentUser);
    }

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export async function getCurrentToken(): Promise<string | null> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const currentToken = await currentUser.getIdToken();

  if (__DEV__) {
    // Locally sign the user token to make it compatible with Hasura's token validation
    const decoded = decodeToken(currentToken);

    const signedToken = jwt.encode(decoded, "local-only-hs256-key-00000000000", {
      algorithm: SupportedAlgorithms.HS256,
    });

    return signedToken;
  }

  return currentToken;
}
