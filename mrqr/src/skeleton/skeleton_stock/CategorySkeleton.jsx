import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { shimmerAnimation } from "../../util/animation";

export default function CategorySkeleton() {
  return (
    <SkeletonTheme color="#e0e0e0" highlightColor="#f0f0f0">
      <style>{shimmerAnimation}</style>
      <Skeleton
        className="shimmer"
        height={30}
        width={100}
        style={{ marginRight: "1.1rem" }}
      />
    </SkeletonTheme>
  );
}
