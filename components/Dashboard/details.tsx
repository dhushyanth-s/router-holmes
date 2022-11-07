import { styled } from "../../stitches.config";

export function Details() {
  return (
    <DetailsContainer>
      <DetailsScrollContainer>
        <Title>General Statistics</Title>
        <SectionTitle>Total Users</SectionTitle>
        <BoldData>1972872</BoldData>
        <SectionTitle>Total Data</SectionTitle>
        <BoldData>12.6 TB</BoldData>
        <SectionTitle bold>Block Statistics</SectionTitle>
      </DetailsScrollContainer>
    </DetailsContainer>
  );
}

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
