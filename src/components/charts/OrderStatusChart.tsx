import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useWeeklyOrderSummary } from "../../hooks/useOrders";

const OrderStatusChart = () => {
  const { summary: data, isLoading } = useWeeklyOrderSummary();
  if (isLoading) return <div>Loading...</div>;

  return (
    <ResponsiveContainer width="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" stackId="a" fill="#4CAF50" name="Completed" />
        <Bar dataKey="pending" stackId="a" fill="#FFC107" name="Pending" />
        <Bar dataKey="cancelled" stackId="a" fill="#F44336" name="Cancelled" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OrderStatusChart;
