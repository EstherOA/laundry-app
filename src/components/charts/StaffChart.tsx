import React from "react";
import { Box, Text } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
} from "recharts";
import { useStaffStats } from "../../hooks";

const StaffChart = () => {
  const { data, isLoading, error } = useStaffStats();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading staff stats.</Text>;

  return (
    <ResponsiveContainer width="100%">
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar
          dataKey="new"
          fill="#3182CE"
          radius={[4, 4, 0, 0]}
          name="New Staff"
        />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#A0AEC0"
          strokeWidth={3}
          name="Total Staff"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StaffChart;
