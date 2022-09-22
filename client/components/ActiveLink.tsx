import { Router, withRouter } from "next/router";

interface Props {
  router: Router;
  href: string;
  children: React.ReactNode;
}

const ActiveLink = ({ router, href, children }: Props) => {
  const isCurrentPath = router.pathname === href || router.asPath === href;

  (function prefetchPages() {
    if (typeof window !== "undefined") router.prefetch(router.pathname);
  })();

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        router.push(href);
      }}
      style={{
        textDecoration: "none",
        margin: 16,
        padding: 0,
        fontWeight: isCurrentPath ? "bold" : "normal",
        fontSize: 16,
        color: "#ffeb3b",
      }}
    >
      {children}
    </a>
  );
};

export default withRouter(ActiveLink);
