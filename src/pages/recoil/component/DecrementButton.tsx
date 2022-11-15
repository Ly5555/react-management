import React, { useEffect, memo } from 'react';
import { MinusOutlined } from '@ant-design/icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {CountAtom} from "../store/store"

// 递减按钮
function DecrementButton() {

  const setCounter = useSetRecoilState(CountAtom);

  useEffect(() => console.log('DecrementButton render'));

  const decrement = () => {
    setCounter(count => count-1);
  };

  return <MinusOutlined onClick={ decrement } />;
}

export default memo(DecrementButton);