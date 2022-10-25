import React from "react";
import { useTheme, Divider as RenuiDivider } from "@rneui/themed";

export const Divider = (props) => {
  const { theme } = useTheme();

  return (
    <RenuiDivider color={theme.mode === "dark" ? "#525252" : null} {...props} />
  );
};
