"use client";

import { EyeOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Avatar, Modal, Space, Table, Tooltip } from "antd";
import React, { useState } from "react";
import { GoBlocked } from "react-icons/go";

interface DataType {
  key: React.Key;
  serial: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
  address: string;
  createdAt: string;
  avatar: string;
  action: React.ReactNode;
}

const RecentUser: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);

  // ✅ New state for block confirmation
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [blockUserData, setBlockUserData] = useState<DataType | null>(null);

  const users = [
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "0123456789",
      status: "active",
      address: "123 Main Street, Dhaka",
      createdAt: "2025-07-15T10:00:00Z",
      profileImage: "",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "0987654321",
      status: "active",
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

  const handleBlockUser = (user: DataType) => {
    setBlockUserData(user);
    setBlockModalVisible(true);
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
      title: "Status",
      dataIndex: "status",
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
      title: "Action",
      dataIndex: "action",
      width: "10%",
      align: "center",
    },
  ];

  const dataSource: DataType[] = users.map((user, index) => {
    const userData: DataType = {
      key: user._id,
      serial: `#${(index + 1).toString().padStart(2, "0")}`,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      status: user.status,
      address: user.address,
      createdAt: user.createdAt,
      avatar:
        user.profileImage ||
        "https://res.cloudinary.com/dhp4mffqp/image/upload/v1740493576/man-2_scexda.png",
      action: <></>,
    };

    userData.action = (
      <div className="flex items-center justify-center space-x-2">
        <Tooltip title="View Details">
          <EyeOutlined
            onClick={() => handleViewUser(userData)}
            className="text-lg cursor-pointer"
          />
        </Tooltip>
        <Tooltip title="Block User">
          <GoBlocked
            color="red"
            className="text-lg cursor-pointer"
            onClick={() => handleBlockUser(userData)}
          />
        </Tooltip>
      </div>
    );

    return userData;
  });

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
          dataSource={dataSource}
          pagination={false}
          style={{ borderRadius: "20px", overflow: "hidden" }}
          components={components}
        />
      </div>

      {/* User Details Modal */}
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
  );
};

export default RecentUser;
