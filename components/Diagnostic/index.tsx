import { styled } from "../../stitches.config";
import { VectorMap } from "./Map";

const Base = styled("main", {
  width: "100%",
  height: "100vh",
  maxHeight: "100vh",
  background: "#ffffff",
  position: "relative",
});

export default function Dashboard() {
  return (
    <Base>
      {/* <AnalyticsMap /> */}
      <VectorMap />
    </Base>
  );
}
