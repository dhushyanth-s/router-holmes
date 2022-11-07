import dynamic from "next/dynamic";
export default function Dashboard() {
  const Base = dynamic(
    () => import("../components/Dashboard"), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  );
  return <Base />;
}
