import { ReactNode } from "react";

export type ButtonProps = {
  children: ReactNode;
  id: "link" | "submit";
  path?: string;
};
