import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js';

interface BaseChartProps {}

const DATA_COUNT = 12;
const labels = [];
for (let i = 0; i < DATA_COUNT; ++i) {
  labels.push(i.toString());
}
const datapoints = [0, 20, 20, 60, 60, 40, 20, 50, 55, 66, 45, 85];

const data: Chart.ChartData = {
  labels: labels,

  datasets: [
    {
      label: 'Words per Minute',
      data: datapoints,
      borderColor: '#a8dadc',
      fill: true,
      tension: 0.4,
      borderWidth: 2,
      backgroundColor: '#219ebc',
    },
  ],
};

const options: Chart.ChartOptions = {
  responsive: true,

  plugins: {
    title: {
      display: true,
      text: 'Words per Minute Improvement',
    },
  },
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'WPM',
      },
      suggestedMin: 0,
      suggestedMax: 120,
    },
  },
};

export const BaseChart: React.FC<BaseChartProps> = ({}) => {
  return (
    <>
      <Line data={data} options={options} width={500} height={300} />
    </>
  );
};
