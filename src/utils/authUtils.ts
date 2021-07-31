import jwt from "expo-jwt";

import firebase from "../firebase/firebase";

export async function waitForClaims(
  user: firebase.User,
  { maxRetries = 5 } = {}
) {
  const customClaimsKey = "https://hasura.io/jwt/claims";

  if (!user) {
    throw new Error("User must be signed in to wait for claims.");
  }

  let claimsFound = false;
  let currentRetry = 0;

  while (!claimsFound) {
    await new Promise((resolve) => setTimeout(resolve, currentRetry * 1000));

    const token = await user.getIdToken(true);
    const decoded = jwt.decode(token, "");

    if (!decoded || typeof decoded === "string") {
      throw new Error("Received invalid token.");
    }

    if (
      decoded[customClaimsKey] &&
      decoded[customClaimsKey]["x-hasura-user-id"] === user.uid
    ) {
      claimsFound = true;
    } else if (currentRetry < maxRetries) {
      currentRetry += 1;
    } else {
      throw new Error("Wait for claims exceeded timeout.");
    }
  }
}
