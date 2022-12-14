import request from "superagent";
import useSWR from "swr";
import { styled } from "../../stitches.config";

const fetcher = (url: string) => request.get(url).then((res) => res.body);

export function Details() {
  const { data, error } = useSWR("/api/total", fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <div>!</div>;
  if (!data)
    return (
      <DetailsContainer>
        <DetailsScrollContainer>
          <Title>General Statistics</Title>
          <SectionTitle>Total Users</SectionTitle>
          <BoldData>Loading...</BoldData>
          <SectionTitle>Total Data</SectionTitle>
          <BoldData>Loading...</BoldData>
        </DetailsScrollContainer>
      </DetailsContainer>
    );

  return (
    <DetailsContainer>
      <DetailsScrollContainer>
        <Title>General Statistics</Title>
        <SectionTitle>Total Users</SectionTitle>
        <BoldData>{data[1][0].People}</BoldData>
        <SectionTitle>Total Data</SectionTitle>
        <BoldData>{data[0][0].Sum / 1000000} GB</BoldData>
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
