import { useState } from "react";
import { styled } from "../../stitches.config";
import { Details } from "./details";
import { VectorMap } from "./Map";

const Base = styled("main", {
  width: "100%",
  height: "100vh",
  maxHeight: "100vh",
  background: "#ffffff",
  position: "relative",
});

export default function Dashboard() {
  const [id, setId] = useState(0);
  return (
    <Base>
      <Details
        onChooseId={(newId) => {
          setId(newId);
        }}
      />
      {/* <AnalyticsMap /> */}
      <VectorMap id={id} />
    </Base>
  );
}
