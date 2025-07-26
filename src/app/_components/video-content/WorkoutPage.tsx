"use client";

import { useState } from "react";
import DynamicModal from "../shared/DynamicModal";
import VideoCard from "./VideoCard";

type FormData = {
  image: string | null;
  title: string;
  subtitle: string;
  description: string;
};

const initialFormData: FormData = {
  image: null,
  title: "",
  subtitle: "",
  description: "",
};

const WorkoutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddWorkout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your submit logic here
    setFormData(initialFormData);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Workouts</h1>
        <button
          className="bg-brand-primary !text-white px-4 py-3 rounded hover:bg-green-800"
          onClick={handleOpenModal}
        >
          + Add New Workout
        </button>
      </div>

      {/* Only one component that handles loop */}
      <VideoCard />

      <DynamicModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleAddWorkout} className="space-y-4">
          {/* Image Dropzone */}
          <label className="block text-sm font-medium text-gray-700">
            Workout Image
          </label>
          <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center relative">
            <div className="text-3xl text-gray-400 mb-2">⬆️</div>
            <p className="text-gray-600">
              Drop your image here or{" "}
              <span className="text-green-600 font-semibold">browse</span> —
              JPG, PNG allowed
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="h-40 object-contain mx-auto"
            />
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Workout Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g. Crossover Drills Basics"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Workout Type
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              placeholder="e.g. Shooting / Dribbling"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-green-600 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter workout description..."
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-primary !text-white py-3 px-4 rounded-lg hover:bg-green-800 transition-all"
          >
            Submit
          </button>
        </form>
      </DynamicModal>
    </div>
  );
};

export default WorkoutPage;
