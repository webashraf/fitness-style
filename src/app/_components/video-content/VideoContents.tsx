"use client";

// app/workouts/page.tsx

import VideoCard from "./VideoCard";
import VideoFilter from "./VideoFilter";

const mockData = [
  {
    title: "Skills Workouts - 1",
    subtitle: "Shooting Form",
    image: "/images/auth/basket_ball1.png",
  },
  {
    title: "Skills Workouts - 2",
    subtitle: "Dribbling Basics",
    image: "/images/auth/basket_ball2.png",
  },
  {
    title: "Skills Workouts - 3",
    subtitle: "Passing Drills",
    image: "/images/auth/basket_ball3.png",
  },
];

const VideoContents = () => {
  return (
    <div className="p-6">
      <VideoFilter />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {Array.from({ length: 2 }).flatMap(() =>
          mockData.map((item, idx) => (
            <VideoCard
              key={idx}
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
              onDelete={() => alert("Delete " + item.title)}
              onEdit={() => alert("Edit " + item.title)}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 text-sm text-gray-600">
        <button className="px-3 py-1 border rounded bg-black text-white">
          1
        </button>
        <button className="px-3 py-1 border rounded">2</button>
        <button className="px-3 py-1 border rounded">3</button>
        <button className="px-3 py-1 border rounded">4</button>
        <select className="ml-4 border px-2 py-1 rounded">
          <option>30</option>
          <option>60</option>
          <option>120</option>
        </select>
      </div>
    </div>
  );
};

export default VideoContents;
//
