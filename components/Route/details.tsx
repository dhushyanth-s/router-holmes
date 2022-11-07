import { useState } from "react";
import request from "superagent";
import useSWR from "swr";
import { styled } from "../../stitches.config";

export function Details({ onChooseId }: { onChooseId: (id: number) => void }) {
  const [id, setId] = useState(0);
  return (
    <DetailsContainer>
      <DetailsScrollContainer>
        <Title>Route Visualizer</Title>
        <SectionTitle>Select User ID</SectionTitle>
        <NumberInput
          type="number"
          onChange={(e) => {
            setId(parseInt(e.target.value, 10));
          }}
          value={id}
        />
        <Button
          onClick={() => {
            onChooseId(id);
          }}
        >
          Confirm
        </Button>
      </DetailsScrollContainer>
    </DetailsContainer>
  );
}

const NumberInput = styled("input", {
  fontFamily: "Poppins",
  borderRadius: "4px",
  padding: "8px",
  fontSize: "16px",
  width: "100%",
  boxSizing: "border-box",
});

const Button = styled("button", {
  borderRadius: "4px",
  padding: "8px",
  fontSize: "16px",
  width: "100%",
  boxSizing: "border-box",
  border: "none",
  backgroundColor: "$theme",
  marginTop: "16px",
  fontWeight: "bold",
  fontFamily: "Poppins",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",

  "&:hover": {
    transform: "translate(0, -5px)",
  },

  "&:active": {
    transform: "translate(0, 0)",
  },
});

const DetailsContainer = styled("div", {
  height: "95%",
  width: "400px",
  background: "#04040EAF",
  backdropFilter: "blur(10px)",
  borderRadius: 10,
  position: "absolute",
  top: "1%",
  left: 10,
  zIndex: 99,
  padding: "1%",
  overflowY: "hidden",
});

const DetailsScrollContainer = styled("div", {
  overflow: "auto",
  height: "99%",
  width: "100%",

  "&::-webkit-scrollbar": {
    width: "0 !important",
  },
});

const Title = styled("h1", {
  margin: 0,
  padding: 0,
  fontSize: 40,
  color: "$theme",
  fontFamily: "Poppins",
  fontWeight: "bold",
});

const SectionTitle = styled("h2", {
  margin: 0,
  padding: 0,
  marginTop: 20,
  fontSize: 20,
  color: "#FFFFFF",
  fontFamily: "Poppins",

  variants: {
    bold: {
      true: {
        fontWeight: "bold",
        fontSize: 25,
      },
    },
  },
});

const BoldData = styled("p", {
  margin: 0,
  padding: 0,
  fontSize: 40,
  color: "#FFFFFF",
  fontFamily: "Poppins",
  fontWeight: "bold",
});

const Data = styled("p", {
  margin: 0,
  padding: 0,
  fontSize: 40,
  color: "#DEDEDE",
  fontFamily: "Poppins",
  fontWeight: 500,
});
