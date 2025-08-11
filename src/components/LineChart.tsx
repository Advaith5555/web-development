import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTooltip, Legend);

const LineChart: React.FC<{ data: any }> = ({ data }) => {
  return <Line data={data} options={{ responsive: true, plugins: { legend: { display: false }}}} />;
};

export default LineChart;


