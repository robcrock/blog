interface PostContentProps extends React.ComponentProps<"div"> {}

const PostContent = ({ children, ...props }: PostContentProps) => {
  return (
    <div
      {...props}
      className={`
        lg:w-content-with-sidebar lg:pr-12 mb-12
        
        [&_p]:text-lg md:[&_p]:text-xl md:[&_p]:leading-8 [&_p]:px-2 [&_p]:my-3 text-gray-800
      `}
    >
      {children}
    </div>
  );
};

export default PostContent;
