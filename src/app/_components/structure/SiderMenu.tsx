"use client";

import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { sidebarMenuItems } from "./MenuItems";

const SiderMenu = ({ collapsed }: { collapsed: boolean }) => {
  const [selectedKey, setSelectedKey] = useState("");

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      collapsedWidth={80}
      style={{ background: "#fff" }}
    >
      {/* Logo */}
      <div
        className="flex justify-center items-center mt-5"
        style={{ height: "120px" }}
      >
        <Link href="/">
          <Image
            src="/images/auth/logo.png"
            alt="KBA Logo"
            width={collapsed ? 40 : 100}
            height={collapsed ? 40 : 100}
            style={{ objectFit: "contain", transition: "all 0.3s ease-in-out" }}
          />
        </Link>
      </div>

      {/* Menu */}
      <div className="px-5">
        <Menu
          className="custom-sidebar-menu bg-transparent pt-10 px-5]"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
          items={sidebarMenuItems}
        />
      </div>
    </Sider>
  );
};

export default SiderMenu;
