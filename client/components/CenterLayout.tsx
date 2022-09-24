import cx from "classnames";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const CenterLayout = ({ children, className = "" }: LayoutProps) => {
  return (
    <div className="flex items-center justify-center h-full min-h-full px-4 py-4 sm:px-6 lg:px-8">
      <div className={cx("w-full h-full max-w-md", className)}>{children}</div>
    </div>
  );
};

export default CenterLayout;
