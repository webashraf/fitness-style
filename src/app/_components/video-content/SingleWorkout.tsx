"use client";

import Image from "next/image";
import { useState } from "react";

// Type definition
type Workout = {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  type: string;
  tiers: string;
  image: string;
  description: string;
  duration: string;
};

const SingleWorkout = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: 1,
      title: "Skills Workouts – 1",
      subtitle: "Shooting Form",
      category: "Awaken",
      type: "Shooting",
      tiers: "Beginner",
      image: "/images/auth/run_couple.png",
      description: "Improve your shooting form and build consistency.",
      duration: "25 Minutes",
    },
    {
      id: 2,
      title: "Cardio Blast",
      subtitle: "High Intensity Training",
      category: "Awaken",
      type: "Cardio",
      tiers: "Intermediate",
      image: "/images/auth/run_couple.png",
      description: "Get your heart rate up and burn fat fast.",
      duration: "20 Minutes",
    },
  ]);

  const [formData, setFormData] = useState<
    Partial<Workout> & { id: number | null }
  >({
    id: Date.now(),
    title: "",
    subtitle: "",
    category: "",
    type: "",
    tiers: "",
    image: "/images/auth/run_couple.png",
    description: "",
    duration: "",
  });

  const isEditing = formData.id !== null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && typeof formData.id === "number") {
      // Update mode
      setWorkouts((prev) =>
        prev.map((item) =>
          item.id === formData.id
            ? { ...(formData as Workout), id: formData.id }
            : item
        )
      );
    } else {
      // Add mode
      const newId = Date.now();
      setWorkouts((prev) => [...prev, { ...(formData as Workout), id: newId }]);
    }

    // Reset the form
    setFormData({
      id: Date.now(),
      title: "",
      subtitle: "",
      category: "",
      type: "",
      tiers: "",
      image: "/images/auth/run_couple.png",
      description: "",
      duration: "",
    });
  };

  const handleEdit = (id: number) => {
    const selected = workouts.find((item) => item.id === id);
    if (selected) {
      setFormData(selected);
    }
  };

  const handleDelete = (id: number) => {
    setWorkouts((prev) => prev.filter((item) => item.id !== id));
    if (formData.id === id) {
      setFormData({
        id: Date.now(),
        title: "",
        subtitle: "",
        category: "",
        type: "",
        tiers: "",
        image: "/images/auth/run_couple.png",
        description: "",
        duration: "",
      });
    }
  };

  return (
    <div className="flex gap-10">
      {/* Left Form */}
      <div className="w-1/3 p-6 rounded-lg">
        <Image
          src="/images/auth/basket_ball2.png"
          alt="Workout Hero Image"
          width={800}
          height={300}
          className="w-full h-40 object-cover rounded-lg mb-6"
        />
        <form onSubmit={handleSubmit} className="space-y-4 mt-5">
          <h2 className="text-2xl mb-2">
            {isEditing ? "Update Video Session" : "Add Video Session"}
          </h2>

          {[
            {
              label: "Workout Title",
              name: "title",
              placeholder: "e.g. Plyometrics Power",
            },
            {
              label: "Subtitle",
              name: "subtitle",
              placeholder: "e.g. Shooting Form",
            },
            { label: "Category", name: "category", placeholder: "e.g. Ignite" },
            { label: "Type", name: "type", placeholder: "e.g. Strength" },
            { label: "Tier", name: "tiers", placeholder: "e.g. Beginner" },
            {
              label: "Duration",
              name: "duration",
              placeholder: "e.g. 25 Minutes",
            },
            {
              label: "Description",
              name: "description",
              placeholder: "Short description",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name as keyof Workout] || ""}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required={field.name === "title"}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 px-4 rounded-lg hover:bg-green-800"
          >
            {isEditing ? "Update Workout" : "Submit Workout"}
          </button>
        </form>
      </div>

      {/* Right List */}
      <div className="p-6 w-full mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Workout Library
        </h1>

        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="bg-white shadow-md rounded-lg p-5 mb-5 flex items-start gap-4"
          >
            <div className="w-32 h-32 relative shrink-0">
              <Image
                src={workout.image}
                alt={workout.title}
                fill
                className="object-cover rounded-md"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">
                {workout.title}
              </h2>
              <p className="text-gray-600">{workout.subtitle}</p>
              <p className="text-sm text-gray-500 mt-1">
                {workout.duration} • {workout.category} • {workout.type} •{" "}
                {workout.tiers}
              </p>
              <p className="text-gray-700 mt-2">{workout.description}</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleDelete(workout.id)}
                  className="px-4 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(workout.id)}
                  className="px-4 py-1 bg-green-800 text-white rounded hover:bg-green-700"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleWorkout;
