/*
 * @Author: Lyq
 * @Date: 2023-04-19 21:17:42
 * @LastEditors: Lyq
 * @LastEditTime: 2024-01-04 21:46:10
 */
import React, { memo, useState, useEffect } from "react";
interface IProps {
  children: string;
  delay?: number;
}
const TypedText = ({ children, delay = 110 }: IProps) => {
  console.log(children);

  const [revealedLetters, setRevealedLetters] = useState(0);
  const interval = setInterval(() => setRevealedLetters((l) => l + 1), delay);
  useEffect(() => {
    if (revealedLetters === children.length) clearInterval(interval);
    return () => {
      clearInterval(interval);
    };
  }, [children, interval, revealedLetters]);
  return <div style={{ marginBottom: 10 }}>{children.substring(0, revealedLetters)}</div>;
};

export default memo(TypedText);
