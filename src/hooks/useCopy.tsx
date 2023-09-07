/*
 * @Author: liuyongqing
 * @Date: 2023-09-06 21:06:57
 * @LastEditors: liuyongqing
 * @LastEditTime: 2023-09-06 21:07:02
 */
import React, { useCallback, useState } from "react";
import writeText from "copy-to-clipboard";
type copyTextProps = string | undefined;
type CopyFn = (text: string) => void; // Return success
const useCopy = (): [copyTextProps, CopyFn] => {
  const [copyText, setCopyText] = useState<copyTextProps>(undefined);

  const copy = useCallback((value?: string | number) => {
    if (!value) return setCopyText("");
    try {
      writeText(value.toString());
      setCopyText(value.toString());
    } catch (err) {
      setCopyText("");
    }
  }, []);
  return [copyText, copy];
};

export default useCopy;
