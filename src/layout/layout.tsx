"use client";
import { Layout } from "antd";
import React from "react";
import CustomFooter from "./footer";
import CustomHeader from "./header";

const { Content } = Layout;

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <CustomHeader />
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <div
          className="site-layout-content"
          style={{ padding: 24, minHeight: 380, height: "100%" }}
        >
          {children}
        </div>
      </Content>
      <CustomFooter />
    </Layout>
  );
};

export default LayoutComponent;
