import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StatisticsLineChart = ({ lineChartData }) => {
  const { labels = [], datasets = [] } = lineChartData || {};

  const data = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Reports Statistics based on Status',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Reports',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="py-4 sm:ms-[38%] sm:w-[59%] md:ms-[30%] md:w-[68%] lg:ms-[23%] lg:w-[76%] xl:ms-[21%] xl:w-[79%]">
      <div className="w-full bg-white rounded shadow-lg p-4 border text-white border-custom-teal">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default StatisticsLineChart;