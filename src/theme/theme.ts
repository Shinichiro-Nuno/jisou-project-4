import { createSystem, defaultConfig } from "@chakra-ui/react";

const theme = createSystem(defaultConfig, {
  globalCss: {
    "html, body": {
      backgroundColor: "gray.200",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
});

export default theme;
