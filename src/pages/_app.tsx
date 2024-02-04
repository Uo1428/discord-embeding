import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import {createTheme, NextUIProvider } from "@nextui-org/react";

const theme = createTheme({
    type: "dark",
    theme: {
        colors: {
            // brand colors
            background: "#1d1d1d",
            text: "#ddd",
            gray700: "#999",
            selection: "#abe0ff52",
        },
    },
});

const EmbedApp: AppType = ({ Component, pageProps }) => {
  return (
      <NextUIProvider theme={theme}>
        <Component {...pageProps} />
      </NextUIProvider>
  )
};

export default EmbedApp;
