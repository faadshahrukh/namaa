import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const App = lazy(() => import("@/app/App"));

export const Route = createFileRoute("/$")({
  ssr: false,
  component: SpaCatchAll,
});

function SpaCatchAll() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-[#070C17]" />}>
      <Suspense fallback={<div className="min-h-screen bg-[#070C17]" />}>
        <App />
      </Suspense>
    </ClientOnly>
  );
}
