import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useInventoryMonthlyStats } from "../../hooks";

const InventoryMonthlyChart = () => {
  const { stats, isLoading, itemNames } = useInventoryMonthlyStats() as {
    stats: any[];
    isLoading: boolean;
    error?: any;
    itemNames: string[];
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <ResponsiveContainer width="100%">
      <LineChart
        data={stats}
        margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis
          allowDecimals={false}
          label={{ value: "New Bought", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend />
        {(itemNames as string[]).map((itemName, idx) => (
          <Line
            key={itemName}
            type="monotone"
            dataKey={itemName as string}
            stroke={`hsl(${(idx * 60) % 360}, 70%, 50%)`}
            strokeWidth={2}
            dot={{ r: 3 }}
            name={itemName}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default InventoryMonthlyChart;
