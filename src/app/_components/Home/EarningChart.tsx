"use client";

import { Select } from "antd";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Dummy data for different years
const earningsDataByYear: Record<string, { name: string; earnings: number }[]> =
  {
    "2022": [
      { name: "Jan", earnings: 2200 },
      { name: "Feb", earnings: 3100 },
      { name: "Mar", earnings: 2700 },
      { name: "Apr", earnings: 3400 },
      { name: "May", earnings: 3900 },
      { name: "Jun", earnings: 3300 },
      { name: "Jul", earnings: 3600 },
      { name: "Aug", earnings: 4100 },
      { name: "Sep", earnings: 3700 },
      { name: "Oct", earnings: 4400 },
      { name: "Nov", earnings: 4000 },
      { name: "Dec", earnings: 4500 },
    ],
    "2023": [
      { name: "Jan", earnings: 2600 },
      { name: "Feb", earnings: 3500 },
      { name: "Mar", earnings: 3100 },
      { name: "Apr", earnings: 3900 },
      { name: "May", earnings: 4200 },
      { name: "Jun", earnings: 4600 },
      { name: "Jul", earnings: 4400 },
      { name: "Aug", earnings: 4700 },
      { name: "Sep", earnings: 4300 },
      { name: "Oct", earnings: 5000 },
      { name: "Nov", earnings: 4800 },
      { name: "Dec", earnings: 5200 },
    ],
    "2024": [
      { name: "Jan", earnings: 200 },
      { name: "Feb", earnings: 4000 },
      { name: "Mar", earnings: 500 },
      { name: "Apr", earnings: 5000 },
      { name: "May", earnings: 4200 },
      { name: "Jun", earnings: 600 },
      { name: "Jul", earnings: 300 },
      { name: "Aug", earnings: 5100 },
      { name: "Sep", earnings: 4700 },
      { name: "Oct", earnings: 5300 },
      { name: "Nov", earnings: 490 },
      { name: "Dec", earnings: 5800 },
    ],
  };

const EarningChart = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  return (
    <div className="bg-red-">
      <div className="w-full h-[460px] bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Monthly Earning Summary
          </h3>
          <Select
            defaultValue="2024"
            style={{ width: 120 }}
            onChange={(value) => setSelectedYear(value)}
            options={[
              { value: "2022", label: "2022" },
              { value: "2023", label: "2023" },
              { value: "2024", label: "2024" },
            ]}
          />
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            barCategoryGap={"20%"}
            data={earningsDataByYear[selectedYear]}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              stroke="#4b5563"
              label={{
                value: "Month",
                position: "insideBottom",
                offset: -5,
                fontSize: 14,
              }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#4b5563"
              label={{
                value: "Earnings ($)",
                angle: -90,
                position: "insideLeft",
                fontSize: 14,
                offset: -5,
              }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "14px",
              }}
              formatter={(value: number) => [`$${value}`, "Earnings"]}
            />
            <Bar dataKey="earnings" fill="#002b14" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningChart;
