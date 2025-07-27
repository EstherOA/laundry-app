import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMonthlyRevenueSummary } from "../../hooks/useOrders";

const RevenueChart = () => {
  const { summary: data, isLoading } = useMonthlyRevenueSummary(true);
  if (isLoading) return <div>Loading...</div>;
  return (
    <ResponsiveContainer>
      <LineChart
        width={300}
        height={220}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis
          label={{
            value: "GH₵",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="totalRevenue"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
