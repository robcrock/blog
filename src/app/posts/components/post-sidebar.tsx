interface PostSidebarProps extends React.ComponentProps<"div"> {}

const PostSidebar = ({ children, ...props }: PostSidebarProps) => {
  return (
    <div
      {...props}
      className={`
        w-full lg:w-sidebar lg:flex-shrink-0
        md:[&_ul]:text-lg [&_ul]:list-none [&_ul]:px-2
        [&_a]:underline [&_a]:underline-offset-2 
      `}
    >
      {children}
    </div>
  );
};

export default PostSidebar;
