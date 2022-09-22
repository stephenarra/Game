import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full">
      {/* <Header /> */}
      {children}
    </div>
  );
};

export default Layout;
