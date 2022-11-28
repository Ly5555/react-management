
import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import "@/components/css/mylayout.less";
import LayoutMenu from './Menu';
import {Outlet} from "react-router-dom"
const { Header, Content, Footer, Sider } = Layout;
const Mylayout = (props:any) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible>
      <div className="logo" />
      <LayoutMenu menu={props.menu} />
    </Sider>
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
       <Outlet />
      </Content>
    </Layout>
  </Layout>
  );
};

export default Mylayout;
