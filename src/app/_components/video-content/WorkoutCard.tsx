"use client";

import { Button, Upload } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa6";
import DynamicModal from "../shared/DynamicModal";
import { TFormData } from "./WorkoutPage";

interface EditingWorkout {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const WorkoutCard = ({ workout }: { workout: TFormData }) => {
  const [workouts, setWorkouts] = useState<TFormData[]>([]);

  const [editingWorkout, setEditingWorkout] = useState<EditingWorkout | null>(
    null
  );

  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [itemImage, setItemImage] = useState<string | null>(null);

  const handleDelete = (id: number) => {
    setWorkouts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEditClick = (
    id: number,
    currentTitle: string,
    currentSubtitle: string,
    currentImage: string
  ) => {
    setEditingWorkout({
      id,
      title: currentTitle,
      subtitle: currentSubtitle,
      image: currentImage,
    });
    setNewTitle(currentTitle);
    setNewSubtitle(currentSubtitle);
    setItemImage(currentImage);
  };

  const handleUploadImage = (info: any) => {
    const file = info.file.originFileObj;
    const reader = new FileReader();

    reader.onload = () => {
      setItemImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWorkout) {
      return;
    }

    setWorkouts((prev) =>
      prev.map((item) =>
        item.id === editingWorkout.id
          ? {
              ...item,
              title: newTitle,
              subtitle: newSubtitle,
              image: itemImage || item.image,
            }
          : item
      )
    );

    setEditingWorkout(null);
    setItemImage(null);
  };

  return (
    <Link href={`/video-content/${workout.id}`}>
      <div className="min-w-[30%]">
        <div
          key={workout.id}
          className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden shadow-lg transition hover:scale-[1.01] hover:shadow-xl"
        >
          <div className="relative h-64 w-full">
            <Image
              src={workout.image}
              alt={`${workout.title} workout preview`}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-white/0 backdrop-blur-md text-white">
              <h3 className="text-xl font-semibold">{workout.title}</h3>
              <p className="!text-md leading-0 text-gray-200">
                {workout.subtitle}
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-10 py-8 bg-white/10 backdrop-blur-sm border-t border-white/20 px-5">
            <button
              type="button"
              onClick={() => handleDelete((workout as any).id)}
              className="!text-brand-primary border border-brand-primary font-semibold px-10 py-3 rounded hover:bg-white/20 transition w-full"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() =>
                handleEditClick(
                  (workout as any).id,
                  workout.title,
                  workout.subtitle,
                  workout.image
                )
              }
              className="bg-brand-primary !text-white px-10 py-3 rounded hover:bg-green-800 transition w-full"
            >
              Edit
            </button>
          </div>
        </div>

        <DynamicModal
          isOpen={!!editingWorkout}
          onClose={() => {
            setEditingWorkout(null);
            setItemImage(null);
          }}
        >
          <form onSubmit={handleEditSubmit} className=" p-5 space-y-3">
            <div className="w-full h-[200px] border rounded-lg flex flex-col items-center justify-center relative overflow-hidden ">
              <Image
                src={itemImage || "/images/placeholder.png"}
                alt="workout-image"
                fill
                className="object-cover"
              />
              <Upload
                className="w-full h-full absolute"
                onChange={handleUploadImage}
                showUploadList={false}
              >
                <Button
                  className="!w-full !h-full !absolute top-0 !bg-zinc-900 opacity-40 hover:opacity-40"
                  icon={<FaUpload />}
                >
                  Click to Upload
                </Button>
              </Upload>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Workout Title
              </label>
              <input
                type="text"
                name="title"
                value={workout.title}
                onChange={(e) => setNewSubtitle(e.target.value)}
                placeholder="e.g. Plyometrics Power"
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
                value={workout.subtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
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
                value={workout.tiers}
                onChange={(e) => setNewSubtitle(e.target.value)}
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
                value={workout.type}
                onChange={(e) => setNewSubtitle(e.target.value)}
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
                value={workout.description}
                onChange={(e) => setNewSubtitle(e.target.value)}
                placeholder="Workout description..."
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-primary !text-white py-3 px-4 rounded-lg hover:bg-green-800"
            >
              Update
            </button>
          </form>
        </DynamicModal>
      </div>
    </Link>
  );
};

export default WorkoutCard;
