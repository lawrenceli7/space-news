import LayoutComponent from "@/layout/layout";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import React from "react";
import theme from "../theme/themeConfig";

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
  </ConfigProvider>
);

export default App;
