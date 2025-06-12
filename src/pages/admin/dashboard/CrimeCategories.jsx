import Chart from "react-apexcharts";

const CrimeCategoriesChart = ({ crimeCategories }) => {
  const chartSeries = crimeCategories?.map((crime) => crime.count) || [];
  const chartOptions = {
    chart: {
      type: "donut", 
    },
    labels: crimeCategories?.map((crime) => crime._id || "Unknown") || [],
    title: {
      text: "Category Based Crime Distribution", 
      align: "center",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%", 
        },
      },
    },
    dataLabels: {
      enabled: true, 
      formatter: function (val, opts) {
        return opts.w.globals.labels[opts.seriesIndex] + ": " + val.toFixed(1) + "%";
      },
    },
    legend: {
      position: "right", 
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "right",
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white border border-custom-teal font-inter text-violet-950 p-4 rounded-lg shadow-lg mx-2 sm:ms-[38%] sm:w-[58%] md:ms-[30%] md:w-[68%] lg:ms-[23%] lg:w-[76%] xl:ms-[21%] xl:w-[78%]">
      <Chart options={chartOptions} series={chartSeries} type="donut" height={350} />
    </div>
  );
};

export default CrimeCategoriesChart;