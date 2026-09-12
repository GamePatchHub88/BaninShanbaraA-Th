import { useEffect, useRef, useState } from "react";
import { classes } from "../content";

export default function ClassesTimeline() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="classes" className="classes" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">المراحل والصفوف الدراسية</h2>
        <div className={`classes__chain ${revealed ? "classes__chain--revealed" : ""}`}>
          <div className="classes__rail" aria-hidden="true" />
          {classes.map((c, i) => (
            <div
              className="classes__node"
              key={c.id}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="classes__node-dot">{c.id}</span>
              <span className="classes__node-label">{c.label}</span>
              <span className="classes__node-stage">{c.stage}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
