import Chart from "react-apexcharts";

const GenderBarChart = ({ genderChartData }) => {
  const { male = 0, female = 0, other = 0 } = genderChartData || {};

  const genderBarChartOptions = {
    chart: {
      height: 450,
      type: "bar",
    },
    colors: ["#1E88E5", "#E91E63", "#FFC107"],
    series: [
      { name: "Male", data: [male] }, 
      { name: "Female", data: [female] }, 
      { name: "Other", data: [other] }, 
    ],
    xaxis: {
      categories: ["Gender Distribution"], 
    },
    title: { text: "User Statistics based on Gender", align: "center" },
    yaxis: { title: { text: "Number of Users" } },
    tooltip: { shared: true, intersect: false },
    legend: { position: "top" },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true, 
      formatter: function (value) {
        return value;
      },
      style: {
        fontSize: "12px", 
        fontFamily: "Helvetica, Arial, sans-serif", 
        fontWeight: "bold", 
        colors: ["#fff"], 
      },
      offsetX: 0, 
      offsetY: -10, 
    },
  };

  return (
    <div className="py-4 sm:ms-[38%] sm:w-[58%] md:ms-[30%] md:w-[68%] lg:ms-[23%] lg:w-[76%] xl:ms-[21%] xl:w-[78%] font-inter">
      <div className="w-full bg-white rounded shadow-lg p-4 border border-custom-teal">
        <Chart
          options={genderBarChartOptions}
          series={genderBarChartOptions.series} 
          type="bar"
          height={450}
        />
      </div>
    </div>
  );
};

export default GenderBarChart;