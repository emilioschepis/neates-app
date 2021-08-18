import React, { useCallback } from "react";
import { Alert } from "react-native";

import Button from "./Button";

type DestructiveButtonProps = {
  children: React.ReactNode;
  confirmationMessage: string;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
};

const DestructiveButton = ({ children, confirmationMessage, disabled, loading, onPress }: DestructiveButtonProps) => {
  const handlePress = useCallback(() => {
    Alert.alert(
      "Are you sure?",
      confirmationMessage,
      [
        { text: "Confirm", style: "destructive", onPress },
        { text: "Cancel", style: "cancel" },
      ],
      {
        cancelable: true,
      }
    );
  }, [onPress]);

  return (
    <Button color="red" disabled={disabled} loading={loading} onPress={handlePress}>
      {children}
    </Button>
  );
};

export default DestructiveButton;
