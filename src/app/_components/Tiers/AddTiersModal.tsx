"use client";
import React, { useEffect, useRef } from "react";
import { BiCross } from "react-icons/bi";
import "./tiers.css";

interface AddTiersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTiersModal: React.FC<AddTiersModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    // sourcery skip: avoid-function-declarations-in-blocks
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur Background */}
      <div className="fixed inset-0 bg-white/10 backdrop-blur-sm z-40" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="bg-white z-50 rounded-xl shadow-lg w-full max-w-lg p-6 relative"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
        >
          <BiCross size={20} />
        </button>

        <h2 className="text-center font-semibold text-lg text-green-900 mb-4">
          + Add New Tiers
        </h2>

        <form className="flex flex-col gap-3">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter tiers name"
              className="w-1/2 border border-gray-300 px-4 py-3 rounded-md"
            />
            <input
              type="number"
              placeholder="Monthly Price ($)"
              className="w-1/2 border border-gray-300 px-4 py-3 rounded-md"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              className="border border-gray-300 px-4 py-3 rounded-md w-full"
            />
            <button
              type="button"
              className="tiers-modal-btn bg-[#0b3f28] text-white px-4 py-3 rounded-md text-xl"
            >
              +
            </button>
          </div>

          <textarea
            placeholder="Description..."
            className="w-full border border-gray-300 px-4 py-2 rounded-md min-h-[100px] mb-10"
          ></textarea>

          <button
            type="submit"
            className="tiers-modal-btn add-btn mt-10 w-full bg-[#0b3f28] text-white py-3 rounded-md font-semibold hover:bg-[#0e5033]"
          >
            Add Tiers
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTiersModal;
