"use client";

import { EyeOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Avatar, Modal, Space, Table, Tooltip } from "antd";
import React, { useState } from "react";

interface DataType {
  key: React.Key;
  serial: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  avatar: string;
  action: React.ReactNode;
}

const RecentUser: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);

  const users = [
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "0123456789",
      address: "123 Main Street, Dhaka",
      createdAt: "2025-07-15T10:00:00Z",
      profileImage: "",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "0987654321",
      address: "456 Elm Street, Chittagong",
      createdAt: "2025-07-16T12:30:00Z",
      profileImage: "",
    },
  ];

  const handleViewUser = (user: DataType) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (text) => <span className="pl-4">{text}</span>,
      width: "10%",
      align: "center",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      render: (text, record) => (
        <Space className="justify-start flex w-full">
          <Avatar src={record.avatar || "/default-avatar.png"} size={32} />
          {text}
        </Space>
      ),
      width: "25%",
      align: "start",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "25%",
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
      title: "Action",
      dataIndex: "action",
      width: "10%",
      align: "center",
    },
  ];

  const dataSource: DataType[] = users.map((user, index) => ({
    key: user._id,
    serial: `#${(index + 1).toString().padStart(2, "0")}`,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address,
    createdAt: user.createdAt,
    avatar:
      user.profileImage ||
      "https://res.cloudinary.com/dhp4mffqp/image/upload/v1740493576/man-2_scexda.png",
    action: (
      <Tooltip title="View Details">
        <EyeOutlined
          onClick={() =>
            handleViewUser({
              key: user._id,
              serial: `#${(index + 1).toString().padStart(2, "0")}`,
              name: user.name,
              email: user.email,
              phoneNumber: user.phoneNumber,
              address: user.address,
              createdAt: user.createdAt,
              avatar:
                user.profileImage ||
                "https://res.cloudinary.com/dhp4mffqp/image/upload/v1740493576/man-2_scexda.png",
              action: <></>,
            })
          }
          className="text-lg cursor-pointer"
        />
      </Tooltip>
    ),
  }));

  // Custom header cell with Tailwind classes
  const components = {
    header: {
      cell: (props: any) => {
        return (
          <th
            {...props}
            className="bg-emerald-500 text-white font-semibold text-center py-3"
          >
            {props.children}
          </th>
        );
      },
    },
  };

  return (
    <div className="py-5 pt-10">
      <div className="py-[10px] rounded-[20px] bg-[#F5F5F5] overflow-hidden">
        <Table<DataType>
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          style={{ borderRadius: "20px", overflow: "hidden" }}
          components={components}
        />
      </div>

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
    </div>
  );
};

export default RecentUser;
