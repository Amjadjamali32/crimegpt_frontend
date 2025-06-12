import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDashboard } from "../../app/features/user/userSlice.js"; 
import Chart from "react-apexcharts";
import { FaFileAlt, FaBan, FaCheckCircle } from "react-icons/fa";
import { HashLoader } from "react-spinners"; // Import HashLoader

const DashboardCard = ({ icon: Icon, count, title, bgColor }) => {
  return (
    <div className={`p-6 ${bgColor} shadow-md rounded-lg flex flex-col items-center text-white`}>
      <Icon size={40} className="mb-3" />
      <p className="text-3xl font-bold">{count}</p>
      <h5 className="text-lg font-semibold text-center">{title}</h5>
    </div>
  );
};

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { userDashboard, isLoading, isError, message } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserDashboard());
  }, [dispatch]);

  // Show loader while data is loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <HashLoader color="#173F5C" size={60} />
      </div>
    );
  }

  // Show error message if there is an error
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <p className="text-red-500 text-2xl font-bold mb-4 font-inter">Failed to load dashboard data!</p>
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

  // Check if all report counts are 0
  const isDataEmpty = mappedData.caseStatus.every((status) => status.count === 0);

  // Dashboard Cards Data
  const cardData = [
    { icon: FaFileAlt, count: mappedData.totalReports, title: "Total Reports Filled", bgColor: "bg-blue-500" },
    { icon: FaBan, count: mappedData.rejectedReports, title: "Total Reports Rejected", bgColor: "bg-red-500" },
    { icon: FaCheckCircle, count: mappedData.solvedReports, title: "Total Reports Solved", bgColor: "bg-green-500" },
  ];

  // Chart Options with API data
  const chartOptions = {
    series: isDataEmpty ? [1] : mappedData.caseStatus.map((status) => status.count), // Default value if no data
    labels: isDataEmpty ? ["No Data"] : mappedData.caseStatus.map((status) => status.label), // Default label if no data
    colors: isDataEmpty ? ["#a1a297"] : ["#3434ff", "#ff6a34", "#34ff34", "#ff3437", "#a1a297"], // Default color if no data
    chart: { height: 420, type: "pie" },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
      markers: { shape: "square", width: "16px" },
      labels: { style: { fontSize: "14px" } },
    },
    dataLabels: { enabled: true, style: { fontFamily: "Inter, sans-serif" } },
  };

  return (
    <div className="flex min-h-screen w-full mx-auto z-50">
      <div className="flex-1 md:pl-72 pt-6 p-6 max-w-full w-full font-inter">
        <h1 className="text-3xl font-extrabold text-center mb-6 mt-16">My Dashboard</h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4 mt-6">
          {cardData.map((card, index) => (
            <DashboardCard key={index} icon={card.icon} count={card.count} title={card.title} bgColor={card.bgColor} />
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white shadow-md rounded-xl p-4 border border-custom-gray">
          <h2 className="text-2xl font-bold text-center mb-4">Case Resolution Status</h2>
          {isDataEmpty ? (
            <div className="text-center text-gray-600 py-10">
              <p>No data available to display.</p>
            </div>
          ) : (
            <Chart options={chartOptions} series={chartOptions.series} type="pie" height={350} className="w-full" />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;