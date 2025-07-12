import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDashboard } from "../../app/features/user/userSlice.js";
import Chart from "react-apexcharts";
import { FaFileAlt, FaBan, FaCheckCircle } from "react-icons/fa";
import { HashLoader } from "react-spinners";

const ProgressBar = ({ title, value, maxValue, color }) => {
  const percentage = maxValue > 0 ? Math.round((value / maxValue) * 100) : 0;

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <span className="text-sm font-medium text-gray-700">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const DashboardCard = ({ icon: Icon, count, title, bgColor }) => {
  return (
    <div
      className={`p-6 ${bgColor} shadow-md rounded-lg flex flex-col items-center text-white transition-all hover:shadow-lg hover:-translate-y-1`}
    >
      <Icon size={40} className="mb-3" />
      <p className="text-3xl font-bold">{count}</p>
      <h5 className="text-lg font-semibold text-center">{title}</h5>
    </div>
  );
};

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { userDashboard, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUserDashboard());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <HashLoader color="#173F5C" size={60} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <p className="text-red-500 text-2xl font-bold mb-4 font-inter">
            Failed to load dashboard data!
          </p>
          <p className="text-gray-600 text-lg font-inter">{message}</p>
        </div>
      </div>
    );
  }

  // Safely extract data from API response with default values
  const {
    totalReports = 0,
    totalRejected = 0,
    totalResolved = 0,
    totalPending = 0,
    totalInvestigating = 0,
    totalClosed = 0,
  } = userDashboard?.data || {};

  // Map API response to expected structure with default values
  const mappedData = {
    totalReports,
    rejectedReports: totalRejected,
    solvedReports: totalResolved,
    caseStatus: [
      { label: "Pending", count: totalPending },
      { label: "Investigating", count: totalInvestigating },
      { label: "Resolved", count: totalResolved },
      { label: "Rejected", count: totalRejected },
      { label: "Closed", count: totalClosed },
    ],
  };

  const isDataEmpty = mappedData.caseStatus.every(
    (status) => status.count === 0
  );

  const cardData = [
    {
      icon: FaFileAlt,
      count: mappedData.totalReports,
      title: "Total Reports Filled",
      bgColor: "bg-blue-500",
    },
    {
      icon: FaBan,
      count: mappedData.rejectedReports,
      title: "Total Reports Rejected",
      bgColor: "bg-red-500",
    },
    {
      icon: FaCheckCircle,
      count: mappedData.solvedReports,
      title: "Total Reports Solved",
      bgColor: "bg-green-500",
    },
  ];

  const chartOptions = {
    series: isDataEmpty
      ? [1]
      : mappedData.caseStatus.map((status) => status.count),
    labels: isDataEmpty
      ? ["No Data"]
      : mappedData.caseStatus.map((status) => status.label),
    colors: isDataEmpty
      ? ["#a1a297"]
      : ["#3434ff", "#ff6a34", "#34ff34", "#ff3437", "#a1a297"],
    chart: { height: 420, type: "pie" },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
      markers: { shape: "square", width: "16px" },
      labels: { style: { fontSize: "14px" } },
    },
    dataLabels: { enabled: true, style: { fontFamily: "Inter, sans-serif" } },
  };

  // Calculate additional statistics based on your existing data
  const resolutionRate =
    mappedData.totalReports > 0
      ? Math.round((mappedData.solvedReports / mappedData.totalReports) * 100)
      : 0;

  const averageResolutionTime = "N/A"; // You would calculate this if you had date data

  return (
    <div className="flex min-h-screen w-full mx-auto z-50">
      <div className="flex-1 md:pl-72 pt-6 p-6 max-w-full w-full font-inter">
        <h1 className="text-3xl font-extrabold text-center mb-6 mt-16">
          My Dashboard
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6 mt-6">
          {cardData.map((card, index) => (
            <DashboardCard
              key={index}
              icon={card.icon}
              count={card.count}
              title={card.title}
              bgColor={card.bgColor}
            />
          ))}
        </div>

        {/* Progress Bars Section */}
        <div className="bg-blue-50 shadow-md rounded-xl p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Report Resolution Progress</h2>
          <ProgressBar
            title="Resolution Rate"
            value={mappedData.solvedReports}
            maxValue={mappedData.totalReports}
            color="bg-green-500"
          />
          <ProgressBar
            title="Investigation Progress"
            value={mappedData.totalInvestigating + mappedData.solvedReports}
            maxValue={mappedData.totalReports}
            color="bg-blue-500"
          />
          <ProgressBar
            title="Pending Resolution"
            value={mappedData.totalPending}
            maxValue={mappedData.totalReports}
            color="bg-yellow-500"
          />
        </div>

        {/* Stats and Chart Section */}
        {/* Stats and Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Section - Now in single column */}
          <div className="bg-blue-50 shadow-md rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Key Statistics</h2>
            <div className="space-y-4">
              {" "}
              {/* Changed from grid to space-y for vertical spacing */}
              <div className="p-4 bg-custom-teal rounded-lg">
                <p className="text-sm text-white">Resolution Rate</p>
                <p className="text-2xl font-bold text-white">
                  {resolutionRate}%
                </p>
              </div>
              <div className="p-4 bg-custom-teal rounded-lg">
                <p className="text-sm text-white">Rejection Rate</p>
                <p className="text-2xl font-bold text-white">
                  {mappedData.totalReports > 0
                    ? Math.round(
                        (mappedData.rejectedReports / mappedData.totalReports) *
                          100
                      )
                    : 0}
                  %
                </p>
              </div>
              <div className="p-4 bg-custom-teal rounded-lg">
                <p className="text-sm text-white">Pending Rate</p>
                <p className="text-2xl font-bold text-white">
                  {mappedData.totalReports > 0
                    ? Math.round(
                        (mappedData.totalPending / mappedData.totalReports) *
                          100
                      )
                    : 0}
                  %
                </p>
              </div>
              <div className="p-4 bg-custom-teal rounded-lg">
                <p className="text-sm text-white">Avg Resolution</p>
                <p className="text-2xl font-bold text-white">
                  {averageResolutionTime}
                </p>
              </div>
            </div>
          </div>

          {/* Chart Section - Takes 2/3 width on large screens */}
          <div className="lg:col-span-2 bg-blue-50 shadow-md rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-center mb-4">
              Case Resolution Status
            </h2>
            {isDataEmpty ? (
              <div className="text-center text-gray-600 py-10">
                <p>No data available to display.</p>
              </div>
            ) : (
              <Chart
                options={chartOptions}
                series={chartOptions.series}
                type="pie"
                height={350}
                className="w-full"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
