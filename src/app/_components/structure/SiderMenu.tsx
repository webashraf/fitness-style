"use client";

import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { sidebarMenuItems } from "./MenuItems";

const SiderMenu = ({ collapsed }: { collapsed: boolean }) => {
  const [selectedKey, setSelectedKey] = useState("");

  const getItemClassName = () =>
    collapsed ? "pl-3 text-red-600" : "pl-6 text-gray-900";

  const mapItemsWithClass = (items: typeof sidebarMenuItems): any[] =>
    items.map((item) => {
      if (item.children) {
        // For parent items, keep label as string to match type expectations
        return {
          ...item,
          children: mapItemsWithClass(item.children),
        };
      }
      // For leaf items, convert label to JSX.Element
      const { children, ...rest } = item;
      return {
        ...rest,
        label:
          typeof item.label === "string" ? (
            <span>{item.label}</span>
          ) : (
            item.label
          ),
      };
    });

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
          className="custom-sidebar-menu bg-transparent pt-10 px-5"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
          items={mapItemsWithClass(sidebarMenuItems)}
        />
      </div>
    </Sider>
  );
};

export default SiderMenu;
