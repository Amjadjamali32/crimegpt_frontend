
const DashboardCard = ({ icon: Icon, count, title, bgColor }) => {
  return (
    <div className={`p-4 bg-${bgColor} shadow-lg text-xl shadow-gray-500 border-gray-200 rounded`}>
      <Icon size={40} className="text-white mx-auto mb-4" />
      <p className="mb-3 text-center text-white  font-inter font-extrabold">{count}</p>
      <h5 className="mb-2 text-center  font-inter text-white">
        {title}
      </h5>
    </div>
  );
};
export default DashboardCard;