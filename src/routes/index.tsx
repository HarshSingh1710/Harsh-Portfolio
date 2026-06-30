import { createFileRoute } from "@tanstack/react-router";
import { useState, lazy, Suspense } from "react";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { HireBanner } from "@/components/portfolio/HireBanner";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Background } from "@/components/portfolio/Background";
import { Cursor } from "@/components/portfolio/Cursor";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import MotionToggle from "@/components/portfolio/MotionToggle";

const Terminal = lazy(() =>
  import("@/components/portfolio/Terminal").then((m) => ({ default: m.Terminal })),
);
const Chatbot = lazy(() =>
  import("@/components/portfolio/Chatbot").then((m) => ({ default: m.Chatbot })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harsh Singh — Senior Python Backend Developer" },
      {
        name: "description",
        content:
          "Harsh Singh — Senior Python Backend Developer. 4+ years building FastAPI, Django, microservices, AWS, MES, WMS and AI platforms.",
      },
      { property: "og:title", content: "Harsh Singh — Senior Python Backend Developer" },
      {
        property: "og:description",
        content: "Enterprise backend, microservices, cloud-native and AI systems.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);
  return (
    <>
      {!booted && <LoadingScreen onDone={() => setBooted(true)} />}
      <SmoothScroll>
        <Background />
        <Cursor />
        <Nav />
        <main className="relative">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <HireBanner />
          <Contact />
        </main>
        <Footer />
        <Suspense fallback={null}>
          <Terminal />
          <Chatbot />
        </Suspense>
        <MotionToggle />
      </SmoothScroll>
    </>
  );
}
