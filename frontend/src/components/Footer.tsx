import { site } from "../content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>{site.name}</p>
        <p className="site-footer__muted">{site.address}</p>
        <a href="#/admin" className="site-footer__admin-link">
          دخول المدير
        </a>
      </div>
    </footer>
  );
}
