interface PostHeaderProps extends React.ComponentProps<"div"> {}

const PostHeader = ({ children, ...props }: PostHeaderProps) => {
  return (
    <div
      {...props}
      className={`
        max-w-4xl mx-auto mb-12
      `}
    >
      {children}
      <div className="w-full h-px bg-slate-200" />
    </div>
  );
};

export default PostHeader;
