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
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setMounted(true); // prevent SSR mismatch
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (!mounted) {
    return null;
  } // avoid hydration error

  const handleYearChange = (value: number) => {
    setYear(value);
    // You can add additional logic when year changes here
  };

  // Example years from 2020 to current year
  const yearOptions = [];
  for (let y = 2020; y <= new Date().getFullYear(); y++) {
    yearOptions.push(y);
  }

  return (
    <Layout
      hasSider
      className="h-screen overflow-hidden max-w-[1580px] mx-auto"
    >
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
          className="h-[100px] px-4 flex items-center"
          style={{ background: "#ffffff", height: "100px" }}
        >
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
        </Header>

        <Content
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            height: "calc(100vh - 200px)", // adjusted for Header height
            overflowY: "auto",
          }}
        >
          <div className="bg-zinc-50 h-auto px-5">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
