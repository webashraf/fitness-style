"use client";

import { Button } from "antd";
import { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import DynamicModal from "../shared/DynamicModal";
import AddTiersForm from "./AddTiersModal";
import EditTiersForm from "./EditTiersModal";
import { tiersContent } from "./tiers.const";
import "./tiers.css";

export default function Tiers() {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null); // If not null, modal is in edit mode

  const handleAddNew = () => {
    setEditData(null); // reset editData
    setIsOpen(true);
  };

  const handleEdit = (tier: any) => {
    setEditData(tier);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditData(null);
  };

  return (
    <div className="min-h-screen bg-white py-10 px-20">
      {/* Top Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {tiersContent.map((tier) => (
          <div
            key={tier.name}
            className="bg-[#0B3F28] text-white rounded-lg p-4 text-center shadow-md"
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <FaLeaf className="text-2xl" />
              <h2 className="text-sm font-semibold">{tier.name}</h2>
              <p className="text-lg font-bold">
                {tier.workouts.toLocaleString()} workouts
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Tier Button */}
      <div className="flex justify-center mb-8">
        <button onClick={handleAddNew} className="tiers-btn">
          + Add New Tiers
        </button>
      </div>

      {/* Unified Modal for Add/Edit */}
      <DynamicModal isOpen={isOpen} onClose={handleClose}>
        {editData ? (
          <EditTiersForm defaultData={editData} onClose={handleClose} />
        ) : (
          <AddTiersForm defaultData={null} onClose={handleClose} />
        )}
      </DynamicModal>

      {/* Detailed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tiersContent.map((tier) => (
          <div key={tier.name} className="bg-[#F3F4F6] rounded-xl shadow p-6">
            <div className="flex flex-col items-center justify-center gap-2 mb-3">
              <div className="bg-green-100 text-green-700 rounded-full p-3">
                <FaLeaf size={24} />
              </div>
              <h3 className="text-md font-semibold text-[#0B3F28]">
                {tier.name}
              </h3>
            </div>
            <p className="text-sm text-gray-800 font-medium mb-2 text-center">
              {tier.description}
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              {tier.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <Button className="tiers-btn-lt w-full">Delete</Button>
              <Button
                className="tiers-btn-rt w-full"
                onClick={() => handleEdit(tier)}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
