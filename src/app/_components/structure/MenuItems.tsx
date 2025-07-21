import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { CiBadgeDollar } from "react-icons/ci";
import { FaUserShield } from "react-icons/fa6";
import { IoSettingsOutline, IoVideocamOutline } from "react-icons/io5";
import { RiBarChart2Line } from "react-icons/ri";
import { TbLayoutDashboardFilled } from "react-icons/tb";

export const sidebarMenuItems = [
  {
    key: "/dashboard",
    icon: <TbLayoutDashboardFilled size={22} />,
    label: <Link href="/">Dashboard</Link>,
  },
  {
    key: "/users",
    icon: <FaUserShield size={22} />,
    label: <Link href="/users">Users</Link>,
  },
  {
    key: "/tiers",
    icon: <RiBarChart2Line size={22} />,
    label: <Link href="/tiers">Tiers</Link>,
  },
  {
    key: "/subscription",
    icon: <CiBadgeDollar size={22} />,
    label: <Link href="/subscription">Subscription</Link>,
  },
  {
    key: "/video-content",
    icon: <IoVideocamOutline size={22} />,
    label: <Link href="/video-content">Video Content</Link>,
  },
  {
    key: "/settings",
    icon: <IoSettingsOutline size={22} />,
    label: <Link href="/settings">Settings</Link>,
  },
  {
    key: "/logout",
    icon: (
      <span className="text-red-600">
        <BiLogOut color="red" size={22} />
      </span>
    ), // ✅ red icon
    label: (
      <Link href="/login">
        <span className="text-red-500">Logout</span> {/* ✅ red text */}
      </Link>
    ),
  },
];
