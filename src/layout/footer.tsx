import { Layout } from "antd";
import React from "react";
import styled from "styled-components";

const { Footer: AntdFooter } = Layout;

const StyledFooter = styled(AntdFooter)`
  text-align: center;
`;

function CustomFooter() {
  return (
    <StyledFooter>
      <span>Spark! ©2023 Created by Spark!</span>
    </StyledFooter>
  );
}

export default CustomFooter;