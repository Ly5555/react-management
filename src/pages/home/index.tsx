import React, { useState } from "react";
import { HooksMemo, PieChat ,LoadingModal} from "./components";

//  react Hoooks的学习
function Home() {
  return (
    <>
      <h3>React学习和antV</h3>
      <HooksMemo />
      <PieChat />
      <LoadingModal/>
    </>
  );
}

export default Home;
