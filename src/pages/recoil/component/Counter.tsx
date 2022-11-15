import { Input } from 'antd'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import {CountAtom} from "../store/store"
import IncrementButton from "./IncrementButton"
import DecrementButton from "./DecrementButton"

const Counter = () => {
  useEffect(() => console.log('CounterInput render'));
const count = useRecoilValue(CountAtom)
  return (
    <div>
      <Input 
      addonBefore={<DecrementButton/>}
      addonAfter={<IncrementButton/>}
      value={count}
      />
    </div>
  )
}

export default Counter
