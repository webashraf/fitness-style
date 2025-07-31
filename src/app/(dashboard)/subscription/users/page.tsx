"use client";

import type { TableColumnsType } from "antd";
import { Avatar, Modal, Space, Table } from "antd";
import { useState } from "react";

import { BsHeartHalf } from "react-icons/bs";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { RiHeart2Line } from "react-icons/ri";

// ✅ Type definition
type DataType = {
  key: string;
  serial: string;
  name: string;
  email: string;
  tiers: string;
  amount: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  avatar?: string;
  status?: string;
};

const PremiumUsers = () => {
  const defaultAvatar =
    "https://res.cloudinary.com/dhp4mffqp/image/upload/v1740493576/man-2_scexda.png";

  const stats = [
    {
      icon: <FaHandHoldingDollar size={28} />,
      label: "Total Subscriber",
      value: "124",
    },
    {
      icon: <RiHeart2Line size={28} />,
      label: "Single- Tier",
      value: "92",
    },
    {
      icon: <BsHeartHalf size={28} />,
      label: "All Tiers",
      value: "687",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);

  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [blockUserData, setBlockUserData] = useState<DataType | null>(null);

  // ✅ Dummy Users
  const users = Array.from({ length: 20 }).map((_, i) => {
    const num = i + 1;
    return {
      _id: `${num}`,
      name: `User ${num}`,
      email: `user${num}@example.com`,
      phoneNumber: `017000000${num.toString().padStart(2, "0")}`,
      tiers: i % 2 === 0 ? "Awaken" : "Balance",
      amount: `$${(num * 10).toFixed(2)}`,
      address: `${num} Road, City ${num}`,
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toISOString(),
      profileImage: "",
      status: i % 2 === 0 ? "Active" : "Inactive",
    };
  });

  const handleViewUser = (user: DataType) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleBlockUser = (user: DataType) => {
    setBlockUserData(user);
    setBlockModalVisible(true);
  };

  const dataSource: DataType[] = users.map((user, index) => ({
    key: user._id,
    serial: `#${(index + 1).toString().padStart(2, "0")}`,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    tiers: user.tiers,
    amount: user.amount,
    address: user.address,
    createdAt: user.createdAt,
    avatar: user.profileImage || defaultAvatar,
    status: user.status,
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (text) => <span className="pl-4">{text}</span>,
      width: "7%",
      align: "center",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      render: (text, record) => (
        <Space className="justify-start flex w-full">
          <Avatar src={record.avatar} size={32} />
          {text}
        </Space>
      ),
      width: "20%",
      align: "start",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      align: "start",
    },
    {
      title: "Tiers",
      dataIndex: "tiers",
      width: "10%",
      align: "start",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "10%",
      align: "start",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      width: "20%",
      align: "center",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "15%",
      align: "center",
      render: (status: string) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            status === "Active"
              ? "text-green-600 bg-green-100"
              : "text-red-600 bg-red-100"
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  const components = {
    header: {
      cell: (props: any) => (
        <th
          {...props}
          className="bg-red-600 text-white text-center font-semibold py-3"
        >
          {props.children}
        </th>
      ),
    },
  };

  return (
    <div>
      {/* Stats */}
      <div className="w-full px-4 py-6">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-5 bg-brand-primary text-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-3 bg-white text-brand-primary rounded-full shadow-md flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">
                  {item.label}
                </p>
                <h1 className="text-3xl font-semibold tracking-wide">
                  {item.value}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="py-5 pt-10">
        <div className="py-[10px] rounded-[20px] bg-[#F5F5F5] overflow-hidden">
          <Table<DataType>
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 5 }}
            style={{ borderRadius: "20px", overflow: "hidden" }}
            components={components}
          />
        </div>

        {/* Modal */}
        <Modal
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={440}
          className="mt-32 userInfoModal"
          centered
        >
          {selectedUser && (
            <div className="space-y-2">
              <h4 className="text-center text-[16px] mb-5">User Details</h4>
              {[
                {
                  label: "Date",
                  value: new Date(selectedUser.createdAt).toLocaleString(),
                },
                { label: "User Name", value: selectedUser.name },
                { label: "Email", value: selectedUser.email },
                { label: "Phone Number", value: selectedUser.phoneNumber },
                { label: "Address", value: selectedUser.address },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between border-b py-3">
                  <span className="font-semibold">{item.label}:</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </Modal>

        {/* Custom Block Confirmation Modal */}
        <Modal
          open={blockModalVisible}
          onCancel={() => setBlockModalVisible(false)}
          onOk={() => {
            if (blockUserData) {
              console.log("Blocked user:", blockUserData);
            }
            setBlockModalVisible(false);
          }}
          okText="Block"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
          centered
          width={300}
          closable={false}
        >
          {blockUserData && (
            <div className="">
              <p>Are you sure you want to block</p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default PremiumUsers;
