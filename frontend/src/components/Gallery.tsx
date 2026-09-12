import { gallery } from "../content";

export default function Gallery() {
  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2 className="section-title">من أروقة المعهد</h2>
        <div className="gallery__grid">
          {gallery.map((item, i) => (
            <figure key={i} className={`gallery__item gallery__item--${item.size}`}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <figcaption>{item.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
