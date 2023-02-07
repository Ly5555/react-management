import React, { Suspense } from "react";

import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

import { Loading } from "./components/index";
import Router from "@/router";
import "./app.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
function App() {
  return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
  );
}
export default App;
