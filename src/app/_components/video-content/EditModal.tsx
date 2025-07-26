// components/EditModal.tsx
"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface EditModalProps {
  isOpen: boolean;
  title: string;
  subtitle: string;
  onClose: () => void;
  onSave: (newTitle: string, newSubtitle: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  title,
  subtitle,
  onClose,
  onSave,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newSubtitle, setNewSubtitle] = useState(subtitle);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setNewTitle(title);
      setNewSubtitle(subtitle);
    }
  }, [isOpen, title, subtitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(newTitle, newSubtitle);
    onClose();
  };

  if (!isOpen || !mounted) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="bg-white/80 backdrop-blur-md rounded-lg p-6 w-[90%] max-w-md shadow-2xl border border-white/30">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Video</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subtitle
            </label>
            <input
              type="text"
              value={newSubtitle}
              onChange={(e) => setNewSubtitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-green-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default EditModal;
