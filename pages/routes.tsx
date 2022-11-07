import dynamic from "next/dynamic";
export default function Diagnostic() {
  const Base = dynamic(
    () => import("../components/Route"), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  );
  return <Base />;
}
