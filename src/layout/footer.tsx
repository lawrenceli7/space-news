import { Layout } from "antd";
import React from "react";

const { Footer } = Layout;

function CustomFooter() {
  return (
    <Footer style={{ textAlign: "center" }}>
      <span>Spark! ©2023 Created by Spark!</span>
    </Footer>
  );
}

export default CustomFooter;