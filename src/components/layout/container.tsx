import { cn } from "@/lib/utils";

interface ContainerProps extends React.ComponentProps<"div"> {
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("mx-auto max-w-[80rem]", className)}>{children}</div>
  );
};

export default Container;
