import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

import { useAuth } from "../context/AuthContext";

type UseAnonymousGuardResult = {
  loading: boolean;
};

/**
 * Pops the current screen if the signed in user is anonymous.
 */
export default function useAnonymousGuard(): UseAnonymousGuardResult {
  const navigation = useNavigation();
  const { loading, isAnonymous } = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (isAnonymous) {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }
    }, [isAnonymous])
  );

  return { loading };
}
