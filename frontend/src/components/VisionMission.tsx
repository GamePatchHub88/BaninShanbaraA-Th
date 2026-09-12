import { mission, vision } from "../content";

export default function VisionMission() {
  return (
    <section id="vision" className="vm">
      <div className="container vm__grid">
        <article className="vm__panel">
          <h2>{vision.title}</h2>
          <p>{vision.text}</p>
        </article>
        <div className="vm__divider" aria-hidden="true" />
        <article className="vm__panel">
          <h2>{mission.title}</h2>
          <p>{mission.text}</p>
        </article>
      </div>
    </section>
  );
}
