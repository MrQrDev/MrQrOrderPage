import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function StockSkeleton() {
  return (
    <SkeletonTheme color="#e0e0e0" highlightColor="#f0f0f0">
      <div className="flex items-center justify-between w-full p-[2rem] bg-white border-b-2">
        <div className="flex flex-col gap-[.9rem]">
          <Skeleton className="shimmer" height={20} width={150} />
          <Skeleton className="shimmer" height={15} width={100} />
          <Skeleton className="shimmer" height={15} width={80} />
        </div>
        <Skeleton className="shimmer" height={90} width={90} />
      </div>
    </SkeletonTheme>
  );
}
