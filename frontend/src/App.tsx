import { useEffect, useState } from "react";
import PublicSite from "./pages/PublicSite";
import AdminApp from "./pages/AdminApp";

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route.startsWith("#/admin")) {
    return <AdminApp />;
  }

  return <PublicSite />;
}
