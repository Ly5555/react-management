import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainRouter } from "@/router";
import App from "./App";
import Home from "./pages/home";
const root = document.getElementById("root") as HTMLElement;
if (root) {
  createRoot(root).render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          {MainRouter.map((route: any) => (
            <Route key={route.path}  path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}
