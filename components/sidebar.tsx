import Link from "next/link";
import { useRouter } from "next/router";
import { ChartLineUp, Gear, Person, Gauge } from "phosphor-react";
import { styled } from "../stitches.config";

export function Sidebar(props: { children: React.ReactNode }) {
  const router = useRouter();
  console.log(router.asPath);
  return (
    <>
      <SidebarBase>
        <SidebarList>
          <ListItem
            as={Link}
            href="/dashboard"
            active={router.asPath === "/dashboard"}
          >
            <ChartLineUp
              width={"2rem"}
              height="auto"
              style={{
                position: "relative",
              }}
            />
            <SidebarIndicator />
          </ListItem>
          <ListItem
            as={Link}
            href="/routes"
            active={router.asPath === "/routes"}
          >
            <Person
              width={"2rem"}
              height="auto"
              style={{
                position: "relative",
              }}
            />
            <SidebarIndicator />
          </ListItem>
          <ListItem
            as={Link}
            href="/diagnostic"
            active={router.asPath === "/diagnostic"}
          >
            <Gauge
              width={"2rem"}
              height="auto"
              style={{
                position: "relative",
              }}
            />
            <SidebarIndicator />
          </ListItem>
        </SidebarList>
      </SidebarBase>
      <PageContent>{props.children}</PageContent>
    </>
  );
}

const SidebarBase = styled("nav", {
  height: "100vh",
  width: "5rem",
  backgroundColor: "$background",
  position: "fixed",
});

const PageContent = styled("div", {
  marginLeft: "5rem",
});

const SidebarList = styled("ul", {
  listStyle: "none",
  padding: 0,
  margin: 0,

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

const SidebarIndicator = styled("div", {
  position: "absolute",
  left: -5,
  width: 5,
  height: "100%",
  backgroundColor: "$theme",
  borderRadius: "0 5px 5px 0",
  transition: "all 0.2s ease-in-out",
});

const ListItem = styled("li", {
  margin: "1rem 0",
  padding: "1rem 0",
  width: "100%",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& svg": {
    color: "$theme",
  },

  variants: {
    active: {
      true: {
        [`& ${SidebarIndicator}`]: {
          left: 0,
        },
      },
    },
  },
});
