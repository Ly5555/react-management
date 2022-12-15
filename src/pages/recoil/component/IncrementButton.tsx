import React, { useEffect, memo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {CountAtom} from "../store/store"

function IncrementButton() {
  // const [, setCounter] = useRecoilState(CountAtom);

  const setCounter = useSetRecoilState(CountAtom);


  const increment = () => {
    setCounter(count => count+1);
  };

  return <PlusOutlined onClick={ increment } />;
}

export default memo(IncrementButton);
