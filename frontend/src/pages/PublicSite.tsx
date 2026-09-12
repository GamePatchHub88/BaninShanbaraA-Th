import Header from "../components/Header";
import Hero from "../components/Hero";
import VisionMission from "../components/VisionMission";
import Gallery from "../components/Gallery";
import ClassesTimeline from "../components/ClassesTimeline";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default function PublicSite() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <VisionMission />
        <Gallery />
        <ClassesTimeline />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
