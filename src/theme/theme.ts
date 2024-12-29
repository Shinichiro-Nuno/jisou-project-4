import { createSystem, defaultConfig } from "@chakra-ui/react";

const theme = createSystem(defaultConfig, {
  globalCss: {
    "html, body": {
      backgroundColor: "gray.200",
      justifyContent: "center",
      marginTop: "10px",
    },
  },
});

export default theme;
