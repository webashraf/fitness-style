"use client";
import { Button } from "antd";
import React, { useState } from "react";

const ProgressTracking = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [workoutType, setWorkoutType] = useState("");

  // State for strength-based
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  // State for time-based
  const [duration, setDuration] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      workoutName,
      workoutType,
    };

    if (workoutType === "strength") {
      payload.sets = sets;
      payload.reps = reps;
      payload.weight = weight;
    } else if (workoutType === "cardio") {
      payload.duration = duration;
    }

    console.log(payload);
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[600px] !h-full">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          🏋️ Progress Tracking
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Workout Name */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Workout Name
            </label>
            <input
              type="text"
              placeholder="e.g. Bench Press"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-5 focus:outline-none focus:ring-2 focus:ring-green-700 text-lg placeholder:text-lg"
              required
            />
          </div>

          {/* Workout Type */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Workout Type
            </label>
            <select
              value={workoutType}
              onChange={(e) => {
                setWorkoutType(e.target.value);
                // reset fields on type switch
                setSets("");
                setReps("");
                setWeight("");
                setDuration("");
              }}
              className="w-full border border-gray-300 rounded-md px-4 py-5 focus:outline-none focus:ring-2 focus:ring-green-700 text-lg placeholder:text-lg"
              required
            >
              <option value="">-- Select Workout Type --</option>
              <option value="strength">💪 Strength / Weight-based</option>
              <option value="cardio">🕐 Time-based Drill</option>
            </select>
          </div>

          {/* Conditional Fields */}
          {workoutType === "strength" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Number of Sets
                </label>
                <input
                  type="number"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  placeholder="e.g. 3"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700 text-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Reps per Set (optional)
                </label>
                <input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700 text-lg"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Default Weight (kg) (optional)
                </label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 40, 45, 42.5"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700 text-lg"
                />
              </div>
            </div>
          )}

          {workoutType === "cardio" && (
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">
                Default Duration (in seconds)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 60s"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700 text-lg"
                required
              />
            </div>
          )}

          {/* Save Button */}
          <Button
            htmlType="submit"
            size="large"
            className="w-full !bg-brand-primary hover:!bg-green-800 !text-white py-2 rounded-md font-semibold transition"
          >
            Save Workout
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProgressTracking;
