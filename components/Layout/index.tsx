import styled from "styled-components";
import React from "react";

const Wapper = styled.div``;

export function Layout({ children }) {
  return <Wapper>{children}</Wapper>;
}
