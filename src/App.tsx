import React, { Suspense } from "react";

import { BrowserRouter } from "react-router-dom";
import { RecoilRoot,  } from "recoil";
import { Loading } from "./components/index";
import Router from "@/router";
import "@/styles/reset.module.less";
import "./app.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </RecoilRoot>
  );
}
export default App;
