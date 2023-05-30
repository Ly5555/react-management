import React, { Suspense } from 'react'
import { RecoilRoot } from "recoil";
import { createRoot } from "react-dom/client";
import App from "./App";
const root = document.getElementById("root");
if (root) {
  createRoot(root).render( 
  <RecoilRoot>
     <App />
  </RecoilRoot>
 );
}
