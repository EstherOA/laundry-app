import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      table: {
        width: "100%",
        textAlign: "center",
      },
      thead: {
        backgroundColor: "#F0F0F1",
      },
      th: {
        padding: "10px 14px",
      },
      td: {
        padding: "10px 14px",
      },
      tr: {
        _hover: {
          cursor: "pointer",
          backgroundColor: "#F5F5F5",
          transitions: "background-color ease 0.2s",
        },
      },
    },
  },
  textStyles: {
    h1: {
      fontSize: "28px",
      fontWeight: "semibold",
    },
    h2: {
      fontSize: "20px",
      fontWeight: "semibold",
    },
    formLabel: {
      fontFamily: "Roboto",
      letterSpacing: "0.2em",
      fontSize: "10px",
      textTransform: "uppercase",
    },
    infoTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      fontStyle: "italic",
    },
    infoText: {},
  },
});

export default theme;
