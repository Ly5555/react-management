/*
 * @Author: Lyq
 * @Date: 2024-03-08 21:23:44
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-08 22:45:09
 */
import React from "react";
import { useParams } from "react-router-dom";
const Details = () => {
  const { id } = useParams();
  return <div>我是权限分配</div>;
};

export default Details;
