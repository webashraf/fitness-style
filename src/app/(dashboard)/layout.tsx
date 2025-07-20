"use client";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const { Header, Sider, Content } = Layout;

const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // prevent SSR mismatch
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (!mounted) return null; // avoid hydration error

  return (
    <Layout hasSider className="h-screen overflow-hidden">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "white" }}
      >
        {/* Fixed height for logo container */}
        <div
          className="flex justify-center items-center mt-5"
          style={{ height: "120px" }}
        >
          <Image
            src="/images/auth/logo.png"
            alt="KBA Logo"
            width={collapsed ? 40 : 100}
            height={collapsed ? 40 : 100}
            style={{ objectFit: "contain", transition: "all 0.3s ease-in-out" }}
          />
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            { key: "1", icon: <UserOutlined />, label: "nav 1" },
            { key: "2", icon: <VideoCameraOutlined />, label: "nav 2" },
            { key: "3", icon: <UploadOutlined />, label: "nav 3" },
          ]}
        />
      </Sider>

      <Layout className="h-screen">
        <Header
          className="h-[300px] px-4 "
          style={{ background: "#ffffff", height: "100px" }}
        >
          <div className="flex items-center h-full gap-5 ">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "30px", width: 64, height: 64 }}
            />
            <div>
              <h2 className="text-xl leading-none">Welcome, James</h2>
              <p className="leading-none">Have a nice day!</p>
            </div>
          </div>
        </Header>

        <Content
          style={{
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            height: "calc(100vh - 200px)", // adjusted for Header height
            overflowY: "auto",
            
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
