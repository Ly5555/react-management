/*
 * @Author: Lyq
 * @Date: 2024-03-08 21:23:44
 * @LastEditors: Lyq
 * @LastEditTime: 2024-03-18 20:41:05
 */
import React, { useEffect } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
const Details = () => {
  const [params] = useSearchParams();
  const id = params.get("id");

  return <div>我是权限分配:{id}</div>;
};

export default Details;
