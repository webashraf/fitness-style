"use client";

import { useState } from "react";
import DynamicModal from "../shared/DynamicModal";
import WorkoutCard from "./WorkoutCard";

export type TFormData = {
  id?: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  tiers: "Awaken" | "Ascend" | "Actualize" | "Balance";
  type: "Skill Workout" | "Strength Workout" | "Plyometrics Workout";
};

const initialFormData: TFormData = {
  image: "",
  title: "",
  subtitle: "",
  description: "",
  tiers: "Balance",
  type: "Skill Workout",
};

const WorkoutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<TFormData>(initialFormData);
  const [tiers, setCategory] = useState("all");
  const [workoutType, setWorkoutType] = useState("all");

  const workouts: TFormData[] = [
    {
      id: 1,
      title: "Vertical Leap Boost",
      subtitle: "Plyometrics Workout",
      type: "Plyometrics Workout",
      tiers: "Ascend",
      image: "/images/auth/basket_ball1.png",
      description: "Explosive lower body drills for vertical jump.",
    },
    {
      id: 2,
      title: "Shooting Accuracy",
      subtitle: "Skill Workout",
      type: "Skill Workout",
      tiers: "Awaken",
      image: "/images/auth/basket_ball1.png",
      description: "Improve shooting precision with target drills.",
    },
    {
      id: 3,
      title: "Skills Workout - 1",
      subtitle: "Shooting Form",
      image: "/images/auth/basket_ball1.png",
      type: "Skill Workout",
      tiers: "Actualize",
      description: "Perfect your form for consistent shots.",
    },
    {
      id: 4,
      title: "Skills Workout - 2",
      subtitle: "Dribbling",
      image: "/images/auth/basket_ball2.png",
      type: "Skill Workout",
      tiers: "Balance",
      description: "Master dribbling through structured drills.",
    },
    {
      id: 5,
      title: "Strength Training",
      subtitle: "Core Focused",
      image: "/images/auth/basket_ball3.png",
      type: "Strength Workout",
      tiers: "Awaken",
      description: "Build strong core muscles for stability.",
    },
  ];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
    console.log("New Workout:", formData);
    setFormData(initialFormData);
    setIsModalOpen(false);
  };

  const handleResetFilter = () => {
    setCategory("all");
    setWorkoutType("all");
  };

  const filteredWorkouts = workouts.filter((w) => {
    const matchesTier =
      tiers === "all" || w.tiers.toLowerCase() === tiers.toLowerCase();
    const matchesType =
      workoutType === "all" ||
      w.type.toLowerCase() === workoutType.toLowerCase();
    return matchesTier && matchesType;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex gap-2 flex-wrap"
        >
          <select
            value={tiers}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="all">All Categories</option>
            <option value="Awaken">Awaken</option>
            <option value="Ascend">Ascend</option>
            <option value="Actualize">Actualize</option>
            <option value="Balance">Balance</option>
          </select>

          <select
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="all">All Types</option>
            <option value="Skill Workout">Skill Workout</option>
            <option value="Strength Workout">Strength Workout</option>
            <option value="Plyometrics Workout">Plyometrics Workout</option>
          </select>

          <button
            type="button"
            onClick={handleResetFilter}
            className="border border-red-400 text-red-500 px-4 py-2 rounded hover:bg-red-100"
          >
            Reset
          </button>
        </form>

        <button
          className="bg-brand-primary !text-white px-4 py-3 rounded hover:bg-green-800"
          onClick={handleOpenModal}
        >
          + Add New Workout
        </button>
      </div>

      <div className="flex flex-wrap gap-6 bg-">
        {filteredWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>

      <DynamicModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleAddWorkout} className="space-y-4">
          {/* Image Upload */}
          <label className="block text-sm font-medium text-gray-700">
            Workout Image
          </label>
          <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center relative">
            <div className="text-3xl text-gray-400 mb-2">⬆️</div>
            <p className="text-gray-600">
              Drop your image here or{" "}
              <span className="text-green-600 font-semibold">browse</span>
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
              placeholder="e.g. Plyometric Power"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Workout Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              placeholder="e.g. Plyometrics Workout"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Tiers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiers
            </label>
            <input
              type="text"
              name="tiers"
              value={formData.tiers}
              onChange={handleInputChange}
              placeholder="e.g. beginner / intermediate / advanced"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Workout Type
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              placeholder="e.g. explosive / cardio"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
              placeholder="Workout description..."
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-primary text-white py-3 px-4 rounded-lg hover:bg-green-800"
          >
            Submit
          </button>
        </form>
      </DynamicModal>
    </div>
  );
};

export default WorkoutPage;
