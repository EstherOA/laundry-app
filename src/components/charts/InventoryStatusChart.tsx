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
  Cell,
} from "recharts";
import { useInventorySummary } from "../../hooks/useInventory";

const statusColorMap: Record<string, string> = {
  "in-stock": "#81C784", // Light Green
  "low-stock": "#81D4FA", // Light Blue
  "out-of-stock": "#EF9A9A", // Light Red
};

const CustomLegend = () => {
  const legendItems = [
    { value: "In Stock", color: statusColorMap["in-stock"] },
    { value: "Low Stock", color: statusColorMap["low-stock"] },
    { value: "Out of Stock", color: statusColorMap["out-of-stock"] },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        paddingLeft: 30,
        marginBottom: 10,
      }}
    >
      {legendItems.map((item) => (
        <div key={item.value} style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: item.color,
              marginRight: 6,
              borderRadius: 2,
            }}
          />
          <span style={{ fontSize: 14 }}>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

const InventoryStatusChart = () => {
  const { summary: data, isLoading } = useInventorySummary();
  if (isLoading) return <div>Loading...</div>;
  return (
    <ResponsiveContainer width="100%">
      <BarChart
        data={data}
        margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="item" />
        <YAxis
          allowDecimals={false}
          label={{ value: "Quantity", angle: -90, position: "insideLeft" }}
        />
        <Tooltip
          formatter={(value: number, name: string, props: any) => [
            value,
            `Qty (${props.payload.status.replace("-", " ")})`,
          ]}
        />
        <Legend content={<CustomLegend />} />
        <Bar dataKey="quantity" barSize={40}>
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={statusColorMap[entry.status]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default InventoryStatusChart;
