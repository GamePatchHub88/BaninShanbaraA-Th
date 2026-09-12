import { site } from "../content";

const links = [
  { href: "#hero", label: "الرئيسية" },
  { href: "#vision", label: "الرؤية والرسالة" },
  { href: "#gallery", label: "المعهد" },
  { href: "#classes", label: "الصفوف الدراسية" },
  { href: "#contact", label: "تواصل معنا" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#hero" className="site-header__brand">
          {site.name}
        </a>
        <nav className="site-header__nav">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
