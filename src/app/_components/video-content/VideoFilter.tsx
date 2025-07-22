// components/WorkoutFilter.tsx
"use client";

const VideoFilter = () => {
  const handleClear = () => {
    // TODO: Implement real clear logic, for now just console log
    console.log("Filters cleared!");
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
      <div className="flex gap-4 flex-wrap">
        <select className="border border-gray-300 px-4 py-2 rounded text-sm">
          <option>Awaken</option>
          <option>Elite</option>
        </select>
        <select className="border border-gray-300 px-4 py-2 rounded text-sm">
          <option>Skills workout</option>
          <option>Strength workout</option>
        </select>
        <button className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100">
          Change
        </button>
        <button
          onClick={handleClear}
          className="border border-red-800 !text-red-800 bg-red-300 font-semibold !px-6 !py-1 rounded   text-sm hover:bg-red-50 transition"
        >
          Clear
        </button>
      </div>

      <button className="flex items-center gap-1 bg-green-900 !text-white px-6 py-3 !text-lg rounded hover:bg-green-800">
        <span>＋</span> Add new Workout
      </button>
    </div>
  );
};

export default VideoFilter;
