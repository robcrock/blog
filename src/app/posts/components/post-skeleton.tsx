function PostSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-3/4 h-8 mb-4 bg-gray-200 rounded" />
      <div className="space-y-3">
        <div className="w-full h-4 bg-gray-200 rounded" />
        <div className="w-5/6 h-4 bg-gray-200 rounded" />
        <div className="w-4/6 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export { PostSkeleton };
