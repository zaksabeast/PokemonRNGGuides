import React from "react";
import { SizeType } from "antd/es/config-provider/SizeContext";

export const SizeContext = React.createContext<SizeType>("middle");

export const useSize = () => {
  return React.useContext(SizeContext);
};
