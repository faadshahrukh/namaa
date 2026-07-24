import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const App = lazy(() => import("@/app/App"));

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Namaa Markets — Trade Smarter. Stay Protected." },
      { name: "description", content: "Forex intelligence, verified broker reviews, live economic calendar, news, tutorials, and scam alerts." },
      { property: "og:title", content: "Namaa Markets" },
      { property: "og:description", content: "Forex intelligence & financial education platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-[#070C17]" />}>
      <Suspense fallback={<div className="min-h-screen bg-[#070C17]" />}>
        <App />
      </Suspense>
    </ClientOnly>
  );
}
