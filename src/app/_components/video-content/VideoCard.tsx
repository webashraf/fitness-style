// components/VideoCard.tsx
"use client";
import Image from "next/image";
import React from "react";

interface WorkoutCardProps {
  title: string;
  subtitle: string;
  image: string;
  onEdit: () => void;
  onDelete: () => void;
}

const VideoCard: React.FC<WorkoutCardProps> = ({
  title,
  subtitle,
  image,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden shadow-lg transition hover:scale-[1.01] hover:shadow-xl ">
      <div className="relative">
        {/* Background image */}
        <div className="relative h-64 w-full">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        {/* Glass overlay with text */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-white/0 backdrop-blur-md text-white">
          <h3 className="text-xl  font-semibold">{title}</h3>
          <p className="!text-md leading-0 text-gray-200">{subtitle}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-10  py-8 bg-white/10 backdrop-blur-sm border-t border-white/20">
        <button
          onClick={onDelete}
          className="!text-brand-primary border border-brand-primary font-semibold px-10 py-3 rounded hover:bg-white/20 transition"
        >
          Delete
        </button>
        <button
          onClick={onEdit}
          className="bg-brand-primary !text-white px-10 py-3 rounded hover:bg-green-800 transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
