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

const generateFakeUsers = (count: number): DataType[] => {
  const users: DataType[] = [];
  for (let i = 0; i < count; i++) {
    const id = `${i + 1}`;
    users.push({
      key: id,
      serial: `#${(i + 1).toString().padStart(2, "0")}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      phoneNumber: `017000000${(i % 10) + 1}`,
      address: `House-${i + 1}, Street-${(i % 10) + 1}, City`,
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toISOString(),
      avatar:
        "https://res.cloudinary.com/dhp4mffqp/image/upload/v1740493576/man-2_scexda.png",
      action: <></>, // placeholder for now
    });
  }
  return users;
};

const User: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);

  const allUsers = generateFakeUsers(100);

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
      width: "10%",
      align: "center",
      render: (text) => <span className="pl-4">{text}</span>,
    },
    {
      title: "Full Name",
      dataIndex: "name",
      width: "25%",
      align: "start",
      render: (text, record) => (
        <Space className="justify-start flex w-full">
          <Avatar src={record.avatar || "/default-avatar.png"} size={32} />
          {text}
        </Space>
      ),
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
      render: (_, record) => (
        <Tooltip title="View Details">
          <EyeOutlined
            onClick={() => handleViewUser(record)}
            className="text-lg cursor-pointer"
          />
        </Tooltip>
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
    <div className="py-5 pt-10">
      <div className="py-[10px] rounded-[20px] bg-[#F5F5F5] overflow-hidden">
        <Table<DataType>
          columns={columns}
          dataSource={allUsers}
          components={components}
          pagination={{ pageSize: 10 }}
          style={{ borderRadius: "20px", overflow: "hidden" }}
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

export default User;
