import "./Container.css";

interface ContainerProps {
  children: React.ReactNode;
  maxwith?: string;
  padding?: string;
  margin?: string;
  className?: string;
}
export function Container({
  children,
  maxwith,
  padding,
  margin,
  className,
}: ContainerProps) {

  return (
    <div
      className={`container ${className}`}
      style={{ maxWidth: maxwith, padding, margin }}
    >
      {children}
    </div>
  );
}
