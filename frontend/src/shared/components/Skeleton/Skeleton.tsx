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

/** Matches the `.dashboard`/`.sidebar`/`.dashboard-panel` layout used by the company Dashboard. */
export function DashboardSkeleton() {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="skeleton-stack">
          <SkeletonBlock width="60%" height={14} />
          <SkeletonBlock width="80%" height={22} />
          <SkeletonBlock width="100%" height={100} radius={12} />
          <SkeletonBlock width="90%" height={14} />
          <SkeletonBlock width="90%" height={14} />
          <SkeletonBlock width="90%" height={14} />
        </div>
      </div>
      <div className="main-content">
        <div className="dashboard-panel">
          <div className="skeleton-stack">
            <SkeletonBlock width="25%" height={13} />
            <SkeletonBlock width="55%" height={26} />
            <SkeletonBlock width="80%" height={13} />
          </div>
        </div>
        <div className="dashboard-panel">
          <div className="skeleton-stack">
            <SkeletonBlock width="20%" height={18} />
            <SkeletonBlock width="100%" height={90} radius={12} />
          </div>
        </div>
        <div className="dashboard-panel">
          <div className="skeleton-stack">
            <SkeletonBlock width="20%" height={18} />
            <SkeletonBlock width="100%" height={160} radius={12} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Generic edit-form skeleton: a heading plus N label/input row placeholders — used by UpdateCompany, EditJob, EditProfile. */
export function FormSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="skeleton-stack">
      <SkeletonBlock width="35%" height={24} />
      <SkeletonList
        count={rows}
        render={(i) => (
          <div className="skeleton-stack" key={i} style={{ gap: 6 }}>
            <SkeletonBlock width="20%" height={12} />
            <SkeletonBlock width="100%" height={38} radius={8} />
          </div>
        )}
      />
      <div className="skeleton-card-topline">
        <SkeletonBlock width={110} height={38} radius={8} />
        <SkeletonBlock width={110} height={38} radius={8} />
      </div>
    </div>
  );
}

/** Generic single-entity detail page skeleton (title, meta row, paragraph lines, action row) — used by job detail views. */
export function DetailPageSkeleton() {
  return (
    <div className="skeleton-stack">
      <SkeletonBlock width="45%" height={30} />
      <div className="skeleton-stack--row skeleton-stack" style={{ gap: 10 }}>
        <SkeletonBlock width={90} height={22} radius={999} />
        <SkeletonBlock width={110} height={22} radius={999} />
        <SkeletonBlock width={80} height={22} radius={999} />
      </div>
      <SkeletonBlock width="100%" height={12} />
      <SkeletonBlock width="95%" height={12} />
      <SkeletonBlock width="80%" height={12} />
      <SkeletonBlock width="100%" height={140} radius={12} />
      <div className="skeleton-card-topline">
        <SkeletonBlock width={130} height={38} radius={8} />
        <SkeletonBlock width={130} height={38} radius={8} />
      </div>
    </div>
  );
}

/** Profile page skeleton: avatar circle + identity lines + a couple of stat/panel blocks. */
export function ProfileSkeleton() {
  return (
    <div className="skeleton-stack">
      <div className="skeleton-stack--row skeleton-stack">
        <SkeletonBlock width={88} height={88} radius="50%" />
        <div className="skeleton-card-info">
          <SkeletonBlock width="45%" height={20} />
          <SkeletonBlock width="30%" height={13} />
        </div>
      </div>
      <SkeletonBlock width="100%" height={90} radius={12} />
      <SkeletonBlock width="100%" height={90} radius={12} />
    </div>
  );
}
