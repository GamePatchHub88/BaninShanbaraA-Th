import { site } from "../content";
import { OrnamentDivider } from "./Ornament";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div
        className="hero__image"
        style={{ backgroundImage: `url(${site.heroImage})` }}
      />
      <div className="hero__veil" />
      <div className="hero__pattern" />
      <div className="hero__content container">
        <h1 className="hero__title">{site.name}</h1>
        <p className="hero__tagline">{site.tagline}</p>
        <div className="hero__ornament">
          <OrnamentDivider />
        </div>
        <a href="#vision" className="hero__cta">
          تعرّف على المعهد
        </a>
      </div>
    </section>
  );
}
