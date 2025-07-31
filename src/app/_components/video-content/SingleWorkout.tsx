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

const dummyWorkouts: Workout[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Workout Title ${i + 1}`,
  subtitle: `Subtitle ${i + 1}`,
  category: i % 2 === 0 ? "Awaken" : "Ignite",
  type: i % 3 === 0 ? "Cardio" : "Strength",
  tiers: i % 2 === 0 ? "Beginner" : "Intermediate",
  image: "/images/auth/run_couple.png",
  description: `This is the description for workout ${i + 1}.`,
  duration: `${20 + i} Minutes`,
}));

const ITEMS_PER_PAGE = 4;

const SingleWorkout = () => {
  const [workouts, setWorkouts] = useState<Workout[]>(dummyWorkouts);
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState<
    Partial<Workout> & { id: number | null }
  >({
    id: Date.now(),
    title: "",
    subtitle: "",
    category: "",
    type: "",
    tiers: "",
    image: "",
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
      setWorkouts((prev) =>
        prev.map((item) =>
          item.id === formData.id
            ? { ...(formData as Workout), id: formData.id }
            : item
        )
      );
    } else {
      const newId = Date.now();
      setWorkouts((prev) => [...prev, { ...(formData as Workout), id: newId }]);
    }

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

    setCurrentPage(1); // Reset to first page
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
        image: "",
        description: "",
        duration: "",
      });
    }
  };

  const totalPages = Math.ceil(workouts.length / ITEMS_PER_PAGE);
  const paginatedWorkouts = workouts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
            {
              label: "Workout Type",
              name: "workoutType",
              placeholder: "e.g. Ignite",
            },
            {
              label: "Workout Time",
              name: "workoutTime",
              placeholder: "e.g. Strength",
            },
            { label: "Tier", name: "tiers", placeholder: "e.g. 25 Min" },
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

          {/* Image Upload */}
          <div className="mb-4 ">
            <label className="block text-sm font-medium mb-1">
              Workout Image
            </label>

            {/* Show preview if image exists */}
            {formData.image && (
              <div className="w-full h-40 mb-2">
                <Image
                  src={formData.image}
                  alt="Workout Preview"
                  width={300}
                  height={160}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            )}

            <div className="relative flex items-center gap-2">
              <span className="text-sm w-[90%] text-gray-600 border border-gray-300 h-10 flex items-center rounded-lg pl-2">
                Upload image
              </span>
              <label
                htmlFor="imageUpload"
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200"
              >
                <span className="text-xl font-bold text-gray-500">+</span>
              </label>

              <input
                id="imageUpload"
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
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
                }}
                className="hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-primary !text-white py-3 px-4 rounded-lg hover:bg-green-800"
          >
            {isEditing ? "Update Workout" : "Submit Workout"}
          </button>
        </form>
      </div>

      {/* Right List */}
      <div className="p-6 w-full mx-auto ">
        <div className="!bg-zinc-200 rounded-2xl p-5">
          {paginatedWorkouts.map((workout) => (
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
                    className="px-4 py-1 bg-green-800 !text-white rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-green-700 !text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleWorkout;
