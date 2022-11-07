import { createStitches } from "@stitches/react";

export const { styled, getCssText, globalCss } = createStitches({
  theme: {
    fonts: {
      system: "system-ui",
    },
    colors: {
      background: "#1E1E3C",
      theme: "#915EFF"
    },
    fontSizes: {
      1: "13px",
      2: "15px",
      3: "17px",
    },
  },
});

export const globalStyles = globalCss({
  "*": { margin: 0, padding: 0 },
});
