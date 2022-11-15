import { Slider } from 'antd';
import React from 'react'
import { useRecoilState, useRecoilValue } from "recoil";
import { fontSizeAtom,fontSizeState } from "../store/store";
const SelectFontSize = () => {
 const [fontSize, setFontSize] = useRecoilState(fontSizeAtom);
 const sizeState = useRecoilValue(fontSizeState);   
 return (
    <div>
      <Slider defaultValue={fontSize} 
      onChange={(e:number)=>setFontSize(e)}
      />
<span style={{fontSize:sizeState}}>
    验证文字大小 - {fontSize}
</span>
    </div>
  )
}

export default SelectFontSize
