import React, { ReactNode } from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import { RouteProps } from "react-router";
import { ToastContainer } from "react-toastify";

const HeaderSidebarWrapper: React.FC<RouteProps> = ({ children }) => {
  return (
    <div className="main">
      <Header />
      <Container fluid className="main-body">
        {children}
        <ToastContainer pauseOnFocusLoss={false} />
      </Container>
    </div>
  );
};

export default HeaderSidebarWrapper;
