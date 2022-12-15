import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

import { Loading } from "./components/index";
import Router from "@/router";
import "./app.css";
function App() {
  return (
    <RecoilRoot>
      <ConfigProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Router />
          </Suspense>
        </BrowserRouter>
      </ConfigProvider>
    </RecoilRoot>
  );
}
export default App;
