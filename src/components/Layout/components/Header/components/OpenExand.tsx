import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { IsExpand } from "@/store/store";
const OpenExand = () => {
  const [isExpandMenu, setIsExpandMenu] = useRecoilState(IsExpand);
  return (
    <div
      className="collapsed"
      onClick={() => {
        setIsExpandMenu(!isExpandMenu);
      }}
    >
      {isExpandMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  );
};
export default OpenExand;
