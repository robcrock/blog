interface PostContentProps extends React.ComponentProps<"div"> {}

const PostContent = ({ children, ...props }: PostContentProps) => {
  return (
    <div
      {...props}
      className={`
        lg:w-content-with-sidebar lg:pr-12 mb-12
        dark:text-gray-400 text-gray-500
      `}
    >
      {children}
    </div>
  );
};

export default PostContent;
