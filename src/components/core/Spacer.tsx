import React from "react";
import { View } from "react-native";

type SpacerProps = {
  width?: number;
  height?: number;
};

const Spacer = ({ width, height }: SpacerProps) => {
  return <View style={{ width: width ?? 0, height: height ?? 0 }} />;
};

export default Spacer;
