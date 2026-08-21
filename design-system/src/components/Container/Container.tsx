import * as React from "react";
import { cn } from "../../lib/utils";

interface ContainerProps extends React.ComponentProps<"div"> {
  className?: string;
}

/** Content width used on posts/lab/craft pages (`max-w-[80rem]`). */
const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div className={cn("mx-auto max-w-[80rem]", className)} {...props}>
      {children}
    </div>
  );
};

export { Container };
export default Container;
