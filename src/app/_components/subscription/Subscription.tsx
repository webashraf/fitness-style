"use client";

import React, { useState } from "react";
import DynamicModal from "../shared/DynamicModal";

interface Plan {
  icon: string;
  title: string;
  tiersName: string[];
  frequency: string;
  price: string;
  originalPrice?: string;
  yearlyPrice?: string;
  yearlyNote?: string;
  inputNote?: string;
  buttonStyle: string;
  features: string[];
  bgColor: string;
  textColor?: string;
  inputValue: string;
  isStrikethrough?: boolean;
}

const initialPlans: Plan[] = [
  {
    icon: "🍓",
    title: "Single Tier Plan",
    tiersName: ["Awaken", "Ascend", "Actualize", "Balance"],
    frequency: "Monthly",
    price: "$19.99 / month",
    inputNote: "Single Tier Price (Monthly)",
    yearlyPrice: "$198.99/year",
    buttonStyle: "border border-2 border-green-900 !rounded-full !mt-2",
    features: [
      "Fundamental basketball drills to build core skills",
      "Introductory strength training to develop a strong base",
      "Easy-to-follow progressions for steady improvement",
    ],
    bgColor: "bg-[#D6DFD8]",
    inputValue: "$198.99/year",
  },
  {
    icon: "👑",
    title: "All Tiers Access",
    tiersName: [],
    frequency: "Yearly",
    price: "$24.99 / month",
    originalPrice: "$29.99 / month",
    yearlyNote: "Yearly option: Coming soon",
    inputNote: "Unlock all tiers + bonus drills",
    inputValue: "$299.99/year",
    isStrikethrough: true,
    buttonStyle: "border border-2 border-green-900 !rounded-full !mt-2",
    features: [
      "Advanced skill drills for in-game application",
      "Easy-to-follow progressions for steady improvement",
      "Fundamental basketball drills to build core skills",
    ],
    bgColor: "bg-white",
  },
];

export default function Subscription() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form inputs
  const [singleTierPrice, setSingleTierPrice] = useState("");
  const [allTiersPrice, setAllTiersPrice] = useState("");
  const [annualPrice, setAnnualPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const openEditModal = (index: number) => {
    const plan = plans[index];
    setEditingIndex(index);
    setIsAdding(false);
    setSingleTierPrice(plan.price || "");
    setAllTiersPrice(plan.originalPrice || "");
    setAnnualPrice(plan.inputValue || "");
    setDiscount("");
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingIndex(null);
    setIsAdding(true);
    setSingleTierPrice("");
    setAllTiersPrice("");
    setAnnualPrice("");
    setDiscount("");
    setIsModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPlan: Plan = {
      icon: "🆕",
      title: "Custom Plan",
      tiersName: [],
      frequency: "Custom",
      price: singleTierPrice,
      originalPrice: allTiersPrice || undefined,
      inputValue: annualPrice,
      inputNote: "New Plan Input Note",
      yearlyPrice: annualPrice,
      features: ["Custom feature 1", "Custom feature 2"],
      buttonStyle: "border border-2 border-green-900 !rounded-full !mt-2",
      bgColor: "bg-white",
    };

    if (isAdding) {
      setPlans([...plans, newPlan]);
    } else if (editingIndex !== null) {
      const updatedPlans = [...plans];
      updatedPlans[editingIndex] = {
        ...updatedPlans[editingIndex],
        price: singleTierPrice,
        originalPrice: allTiersPrice,
        inputValue: annualPrice,
      };
      setPlans(updatedPlans);
    }

    setIsModalOpen(false);
    setEditingIndex(null);
  };

  return (
    <div className="min-h-screen bg-[#E6ECE8] p-6 md:p-12">
      <div className="flex justify-end mb-6">
        <button
          onClick={openAddModal}
          className="bg-green-900 !text-white px-4 py-2 rounded-md font-medium shadow"
        >
          + Add New Plan
        </button>
      </div>

      <DynamicModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleEditSubmit} className="space-y-4 p-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Single Tier Price (Monthly)
            </label>
            <input
              type="text"
              value={singleTierPrice}
              onChange={(e) => setSingleTierPrice(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              All Tiers Price (Monthly)
            </label>
            <input
              type="text"
              value={allTiersPrice}
              onChange={(e) => setAllTiersPrice(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enable Annual Plan
            </label>
            <input
              type="text"
              value={annualPrice}
              onChange={(e) => setAnnualPrice(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount (%)
            </label>
            <input
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="submit"
              className="px-4 py-3 w-full bg-green-800 !text-white rounded hover:bg-green-900"
            >
              {isAdding ? "Add Plan" : "Save Changes"}
            </button>
          </div>
        </form>
      </DynamicModal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 w-full shadow ${plan.bgColor}`}
          >
            <div className="flex flex-col items-center justify-center w-full">
              <h2 className="text-xl font-semibold mb-1">
                {plan.icon} {plan.title}
              </h2>
              <p className="text-lg mb-4">{plan.frequency}</p>
            </div>

            {plan.tiersName.length > 0 && (
              <select className="w-full p-2 border border-gray-300 rounded-md bg-white !mb-3">
                {plan.tiersName.map((tier, idx) => (
                  <option key={idx} value={tier}>
                    {tier}
                  </option>
                ))}
              </select>
            )}

            {plan.inputNote && (
              <div className="w-full rounded-md mb-4">{plan.inputNote}</div>
            )}

            {plan.originalPrice && (
              <p className="text-sm text-gray-400 line-through">
                {plan.originalPrice}
              </p>
            )}
            <p className="text-purple-600 font-semibold text-2xl mb-1">
              {plan.price}
            </p>

            {plan.yearlyNote && (
              <p className="text-sm text-gray-600 mb-1">{plan.yearlyNote}</p>
            )}

            <input
              type="text"
              value={plan.inputValue}
              disabled
              className="w-full p-2 bg-gray-200 text-gray-500 rounded-md mb-4"
            />

            <button
              className={`w-full py-2 rounded-md font-semibold mb-6 ${plan.buttonStyle}`}
            >
              Get started
            </button>

            <ul className="text-sm space-y-2 mb-6 !mt-5">
              {plan.features.map((feature, i) => (
                <li key={i}>✔ {feature}</li>
              ))}
            </ul>

            <div className="flex justify-between gap-6">
              <button
                onClick={() => openEditModal(index)}
                className="bg-brand-primary w-full py-3 !text-white px-4 rounded-md text-lg"
              >
                Edit
              </button>
              <button className="bg-red-200 border w-full py-3 text-red-600 px-4 rounded-md text-lg">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
