import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from "@ant-design/icons";
  import { Layout, Menu } from "antd";
  import { Outlet } from 'react-router-dom';
  import React, { useState } from "react";
  import "@/components/css/mylayout.less";
  const { Header, Sider, Content } = Layout;
  
  interface IProps {
    menu: any;
  }
  
  const Mylayout = (children: any) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Layout className='container'
      >
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Layout className='content-container'>
        {/* 左侧导航 */}
        {/* <MyLeftSide menu={ props.menu } /> */}

        {/* 主内容 */}
        <Layout >
          <Content style={{  }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      </Layout>
    );
  };
  
  export default Mylayout;
  