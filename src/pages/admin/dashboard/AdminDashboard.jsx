import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Card from "./Card.jsx";
import GenderBarChart from "./GenderBarChart.jsx";
import StatisticsLineChart from "./StatisticsLineChart.jsx";
import CrimeCategoriesChart from "./CrimeCategories.jsx";
import CrimeMap from "./CrimeMap.jsx";
import { 
  FileIcon, 
  UserIcon, 
  SolvedIcon, 
  PendingIcon, 
  InvestigationIcon, 
  FeedbackIcon, 
  NotificationIcon,
  EvidenceIcon
} from "./SvgIcons.jsx";
import { getAdminDashboard } from "../../../app/features/user/userSlice.js";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { adminDashboard, isLoading, isError, message } = useSelector((state) => state.user);

  const [cardData, setCardData] = useState([]);
  const [genderChartData, setGenderChartData] = useState({}); 
  const [lineChartData, setLineChartData] = useState({}); 

  // Only dispatch once on component mount if not already loaded
  useEffect(() => {
    if (!adminDashboard && !isLoading) {
      dispatch(getAdminDashboard());
    }
  }, [dispatch, adminDashboard, isLoading]);

  useEffect(() => { 
    if (adminDashboard) {
      // Set card data
      setCardData([
        { title: 'Total Reports', count: adminDashboard?.data?.totalReports || 0, Icon: FileIcon },
        { title: 'Pending Reports', count: adminDashboard?.data?.totalPending || 0, Icon: PendingIcon },
        { title: 'Resolved Reports', count: adminDashboard?.data?.totalResolved || 0, Icon: SolvedIcon },
        { title: 'Investigating', count: adminDashboard?.data?.totalInvestigating || 0, Icon: InvestigationIcon },
        { title: 'Total Users', count: adminDashboard?.data?.totalUsers || 0, Icon: UserIcon },
        { title: 'Feedbacks', count: adminDashboard?.data?.totalFeedbacks || 0, Icon: FeedbackIcon },
        { title: 'Notifications', count: adminDashboard?.data?.totalNotifications || 0, Icon: NotificationIcon },
        { title: 'Evidences', count: adminDashboard?.data?.totalEvidences || 0, Icon: EvidenceIcon },
      ]);

      // Set gender chart data
      setGenderChartData({
        male: adminDashboard?.data?.genderStatistics?.male || 0,
        female: adminDashboard?.data?.genderStatistics?.female || 0,
        other: adminDashboard?.data?.genderStatistics?.other || 0,
      });

      // Extract report status statistics
      const reportStatusStats = adminDashboard?.data?.reportStatusStats || [];
      const statusCounts = {
        pending: 0,
        resolved: 0,
        investigating: 0,
        closed: 0,
        rejected: 0,
      };

      // Map the status counts from the API response
      reportStatusStats.forEach((status) => {
        if (status._id === 'pending') statusCounts.pending = status.count;
        else if (status._id === 'resolved') statusCounts.resolved = status.count;
        else if (status._id === 'investigating') statusCounts.investigating = status.count;
        else if (status._id === 'closed') statusCounts.closed = status.count;
        else if (status._id === 'rejected') statusCounts.rejected = status.count;
      });

      // Set line chart data
      setLineChartData({
        labels: ["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"],
        datasets: [
          {
            label: "Pending",
            data: Array(12).fill(statusCounts.pending), 
            borderColor: "blue",
            backgroundColor: "blue",
            tension: 0.3,
          },
          {
            label: "Resolved",
            data: Array(12).fill(statusCounts.resolved), 
            borderColor: "green",
            backgroundColor: "green",
            tension: 0.3,
          },
          {
            label: "Under Investigation",
            data: Array(12).fill(statusCounts.investigating), 
            borderColor: "orange",
            backgroundColor: "orange",
            tension: 0.3,
          },
          {
            label: "Closed",
            data: Array(12).fill(statusCounts.closed), 
            borderColor: "gray",
            backgroundColor: "gray",
            tension: 0.3,
          },
          {
            label: "Rejected",
            data: Array(12).fill(statusCounts.rejected),
            borderColor: "red",
            backgroundColor: "red",
            tension: 0.3,
          },
        ],
      });

      // Success toast after data load
      toast.success("Admin Dashboard loaded successfully!");
    }
  }, [adminDashboard]);

  return (
    <div className="pt-20">
      {/* Loader */}
      {isLoading ? (
        <div className="flex items-center justify-center h-screen sm:ms-32 md:ms-44 lg:ms-54 xl:ms-64">
          <HashLoader color="#173F5C" size={60} />
        </div>
      ) : isError ? (
        <p className="text-center text-red-500 text-lg sm:ms-48 md:ms-64 lg:ms-96 font-semibold font-inter xl:ms-96">{message || "Failed to load dashboard data!"}</p>
      ) : (
        <>
          <div className="my-2">
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl font-extrabold text-center sm:ms-[35%] md:ms-[30%] xl:ms-[20%] font-inter">Admin Dashboard</h1>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:ms-64 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4 font-inter md:ml-64">
            {cardData.map((card, index) => ( 
              <Card key={index} title={card.title} count={card.count} Icon={card.Icon} />
            ))}
          </div>
          
          {/* Pass chart data as props */}
          <GenderBarChart genderChartData={genderChartData} />
          <StatisticsLineChart lineChartData={lineChartData} />

          {/* Crime Map */}
          <div className="my-2">
            <h2 className="text-xl my-3 font-inter text-center font-extrabold sm:ms-52 md:ms-64 lg:ms-72 xl:ms-80">Crime Locations</h2>
            <CrimeMap reportLocations={adminDashboard?.data?.reportLocations || []} />
          </div>

          {/* Crime Categories Breakdown */}
          <div className="mb-2">
            <h2 className="text-xl my-3 font-inter text-center font-extrabold sm:ms-52 md:ms-64 lg:ms-72 xl:ms-80">Crime Categories</h2>
            <CrimeCategoriesChart crimeCategories={adminDashboard?.data?.crimeCategories || []} />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
