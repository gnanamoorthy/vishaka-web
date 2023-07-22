import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import "./App.scss";
import HeaderSidebarWrapper from "./components/common/HeaderSidebarWrapper";
import Stock from "./pages/Stock";
import Client from "./pages/Client";
import Invoice from "./pages/Invoice";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/stock"
          element={
            <HeaderSidebarWrapper>
              <Stock />
            </HeaderSidebarWrapper>
          }
        />
        <Route
          path="/client"
          element={
            <HeaderSidebarWrapper>
              <Client />
            </HeaderSidebarWrapper>
          }
        />
        <Route
          path="/invoice"
          element={
            <HeaderSidebarWrapper>
              <Invoice />
            </HeaderSidebarWrapper>
          }
        />
      </Routes>
    </>
  );
}

export default App;
