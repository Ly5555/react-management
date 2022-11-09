import React, { useEffect } from "react";
import { Switch, Button } from "antd";
import { useRecoilState } from "recoil";
import { userInfoAtom } from "../store/store";
// 用户信息

const UserInfo = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  const handelSitchClick = () => {
    userInfo.score += 10;
    setUserInfo({ ...userInfo });
  };
  return (
    <div>
      <h2>用户信息（验证原子状态）</h2>
      <p>用户：{userInfo.username}</p>
      <p>分数：{userInfo.score}</p>
      <p>
        状态:
        <Switch />
      </p>
      <Button type="primary" onClick={handelSitchClick}>
        修改分数
      </Button>
    </div>
  );
};

export default UserInfo;
