import "./Skeleton.css";

interface SkeletonBlockProps {
  width?: string | number;
  height?: string | number;
  radius?: string | number;
}

/** Single shimmering placeholder rectangle. Building block for all skeleton layouts below. */
export function SkeletonBlock({ width = "100%", height = 14, radius = 6 }: SkeletonBlockProps) {
  return <div className="skeleton-block" style={{ width, height, borderRadius: radius }} />;
}

/** Renders `count` copies of a skeleton item — use for list/grid loading states. */
export function SkeletonList({
  count,
  render,
}: {
  count: number;
  render: (index: number) => React.ReactNode;
}) {
  return <>{Array.from({ length: count }, (_, index) => render(index))}</>;
}

/** Matches the `.job-card-member` shape used by ShowJobs (CompanyJobList, ViewAllJobsForCompany, SearchResults, FilterJobsByCategory). */
export function JobCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card-topline">
        <SkeletonBlock width="55%" height={18} />
        <SkeletonBlock width={70} height={20} radius={999} />
      </div>
      <SkeletonBlock width="35%" height={13} />
      <SkeletonBlock width="95%" height={12} />
      <SkeletonBlock width="70%" height={12} />
      <div className="skeleton-card-footer">
        <SkeletonBlock width={90} height={13} />
        <SkeletonBlock width={100} height={34} radius={8} />
      </div>
    </div>
  );
}

/** Matches the `.job-card-modern` shape used only by ViewAllJobs. */
export function JobCardModernSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card-topline">
        <SkeletonBlock width="40%" height={14} />
        <SkeletonBlock width={64} height={18} radius={999} />
      </div>
      <SkeletonBlock width="60%" height={20} />
      <SkeletonBlock width="90%" height={12} />
      <div className="skeleton-card-topline">
        <SkeletonBlock width={70} height={22} radius={999} />
        <SkeletonBlock width={70} height={22} radius={999} />
        <SkeletonBlock width={70} height={22} radius={999} />
      </div>
      <div className="skeleton-card-footer">
        <SkeletonBlock width={110} height={13} />
        <SkeletonBlock width={90} height={13} />
      </div>
    </div>
  );
}

/** Matches the `.member-card` shape used by ViewMembers. */
export function MemberCardSkeleton() {
  return (
    <div className="skeleton-card">
      <SkeletonBlock width="45%" height={16} />
      <SkeletonBlock width="30%" height={12} />
      <SkeletonBlock width="55%" height={12} />
      <SkeletonBlock width="50%" height={12} />
    </div>
  );
}

/** Matches the `.company-card` shape used by ViewAllCompanies. */
export function CompanyCardSkeleton() {
  return (
    <div className="skeleton-card">
      <SkeletonBlock width={64} height={64} radius={12} />
      <SkeletonBlock width="60%" height={18} />
      <SkeletonBlock width="90%" height={12} />
      <SkeletonBlock width="75%" height={12} />
    </div>
  );
}

/** Generic row skeleton (avatar + two lines + action) for list rows like candidate applications. */
export function RowSkeleton() {
  return (
    <div className="skeleton-card skeleton-card--row">
      <SkeletonBlock width={44} height={44} radius="50%" />
      <div className="skeleton-card-info">
        <SkeletonBlock width="50%" height={14} />
        <SkeletonBlock width="30%" height={12} />
      </div>
      <SkeletonBlock width={80} height={30} radius={8} />
    </div>
  );
}
