import { cn } from "../utils";
import { Sidebar } from "./sidebar";

export const Layout = ({ positions, children, className }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar finalPositions={positions} />
      <div className={cn("flex min-h-screen w-screen", className)}>
        {children}
      </div>
    </div>
  );
};
