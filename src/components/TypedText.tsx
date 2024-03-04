/*
 * @Author: Lyq
 * @Date: 2023-04-19 21:17:42
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-04 20:26:30
 */
import React, { memo, useState, useEffect } from "react";
interface IProps {
  children: string;
  delay?: number;
}
const TypedText = ({ children, delay = 110 }: IProps) => {
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
