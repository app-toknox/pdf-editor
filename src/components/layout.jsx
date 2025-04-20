import { cn } from "../utils";

export const Layout = ({ children, className }) => {
  return (
    <div className={cn("flex h-screen w-screen", className)}>{children}</div>
  );
};
