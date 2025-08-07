"use client";

import { EyeOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Avatar, Button, Modal, Space, Table, Tooltip } from "antd";
import React, { useMemo, useState } from "react";
import { GoBlocked } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";

interface DataType {
  key: React.Key;
  serial: string;
  name: string;
  tiers: string;
  address: string;
  createdAt: string;
  status: string;
  avatar: string;
  action: React.ReactNode;
}

const generateFakeBadges = (count: number): DataType[] => {
  const Badges: DataType[] = [];
  for (let i = 0; i < count; i++) {
    const id = `${i + 1}`;
    Badges.push({
      key: id,
      serial: `#${(i + 1).toString().padStart(2, "0")}`,
      name: `Badge ${i + 1}`,
      tiers: i % 2 === 0 ? "Awaken" : "Balance",
      address: `House-${i + 1}, Street-${(i % 10) + 1}, City`,
      status: i % 2 === 0 ? "Active" : "Inactive",
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toISOString(),
      avatar:
        "https://res.cloudinary.com/dhp4mffqp/image/upload/v1740493576/man-2_scexda.png",
      action: <></>,
    });
  }
  return Badges;
};

const BadgeManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<DataType | null>(null);
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [blockBadgeData, setBlockBadgeData] = useState<DataType | null>(null);
  const [addBadgeModalVisible, setAddBadgeModalVisible] = useState(false);

  const allBadges = useMemo(() => generateFakeBadges(100), []);

  const handleViewBadge = (Badge: DataType) => {
    setSelectedBadge(Badge);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedBadge(null);
  };

  const handleBlockBadge = (Badge: DataType) => {
    setBlockBadgeData(Badge);
    setBlockModalVisible(true);
  };

  const tiersFilters = [
    { text: "Awaken", value: "Awaken" },
    { text: "Balance", value: "Balance" },
  ];

  const statusFilters = [
    { text: "Active", value: "Active" },
    { text: "Inactive", value: "Inactive" },
  ];

  const columns: TableColumnsType<DataType> = [
    {
      title: "Serial",
      dataIndex: "serial",
      width: "10%",
      align: "center",
      render: (text) => <span className="pl-4">{text}</span>,
    },
    {
      title: "Badges Name",
      dataIndex: "name",
      width: "20%",
      align: "start",
      render: (text, record) => (
        <Space className="justify-start flex w-full">
          <Avatar src={record.avatar || "/default-avatar.png"} size={32} />
          {text}
        </Space>
      ),
    },
    {
      title: "Tiers",
      dataIndex: "tiers",
      width: "20%",
      align: "start",
      filters: tiersFilters,
      onFilter: (value, record) => record.tiers === value,
      filterSearch: true,
      filterMultiple: false,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "20%",
      align: "start",
      filters: statusFilters,
      onFilter: (value, record) => record.status === value,
      filterSearch: true,
      filterMultiple: false,
    },

    {
      title: "Created Date",
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
        <div className="flex items-center justify-center space-x-2">
          <Tooltip title="View Details">
            <EyeOutlined
              onClick={() => handleViewBadge(record)}
              className="text-lg cursor-pointer"
            />
          </Tooltip>
          <Tooltip title="Block Badge">
            <GoBlocked
              color="red"
              className="text-lg cursor-pointer"
              onClick={() => handleBlockBadge(record)}
            />
          </Tooltip>
        </div>
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
      <div>
        <Button
          className="w-full !py-7 !text-brand-primary !border !border-brand-primary !text-lg"
          size="large"
          icon={<IoMdAddCircleOutline size={22} />}
          onClick={() => setAddBadgeModalVisible(true)}
        >
          Add New Badge
        </Button>
      </div>

      <Modal
        open={addBadgeModalVisible}
        onCancel={() => setAddBadgeModalVisible(false)}
        footer={null}
        centered
        width={400}
        className="rounded-xl"
      >
        <h2 className="text-center text-lg font-semibold mb-6">
          ← Badges Management
        </h2>

        <form className="space-y-5">
          {/* Upload Image */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Upload Image
            </label>
            <input
              type="file"
              className="block w-full border border-gray-300  px-4 py-2 rounded-lg text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-pink-50 file:text-pink-700
        hover:file:bg-pink-100"
            />
          </div>

          {/* Badge Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Badge Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Badge Name..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          {/* Tier Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Tier Name</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary">
              <option value="Awaken">Awaken</option>
              <option value="Balance">Balance</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 text-sm font-medium">Status</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Save Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-brand-primary !text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>

      {/* Search and Filter Row */}
      <div className="flex items-center justify-between my-4">
        <input
          type="text"
          placeholder="Search Badge..."
          className="border border-gray-300 rounded-lg px-4 py-3 w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[300px]"
        />
      </div>

      <div className="py-[10px] rounded-[20px] bg-[#F5F5F5] overflow-hidden">
        <Table<DataType>
          columns={columns}
          dataSource={allBadges}
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
        className="mt-32 BadgeInfoModal"
        centered
      >
        {selectedBadge && (
          <div className="space-y-2">
            <h4 className="text-center text-[16px] mb-5">Badge Details</h4>
            {[
              {
                label: "Date",
                value: new Date(selectedBadge.createdAt).toLocaleString(),
              },
              { label: "Badge Name", value: selectedBadge.name },
              { label: "Tiers", value: selectedBadge.tiers },
              { label: "Address", value: selectedBadge.address },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between border-b py-3">
                <span className="font-semibold">{item.label}:</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <Modal
        open={blockModalVisible}
        onCancel={() => setBlockModalVisible(false)}
        onOk={() => {
          if (blockBadgeData) {
            console.log("Blocked Badge:", blockBadgeData);
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
        {blockBadgeData && (
          <div>
            <p>
              Are you sure you want to block <b>{blockBadgeData.name}</b>?
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BadgeManagement;
