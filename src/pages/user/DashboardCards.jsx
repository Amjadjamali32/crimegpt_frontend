const DashboardCard = ({ icon: Icon, count, title, bgColor }) => {
  return (
    <div className={`relative p-6 ${bgColor} rounded-xl shadow-lg overflow-hidden group`}>
      {/* Animated background element */}
      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10 group-hover:scale-150 transition-all duration-300"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="p-3 mb-4 rounded-lg bg-white/20 backdrop-blur-sm">
          <Icon size={30} className="text-white" />
        </div>
        <p className="text-4xl font-bold mb-1 text-white">{count}</p>
        <h5 className="text-lg font-medium text-center text-white/90">{title}</h5>
      </div>
    </div>
  );
};

export default DashboardCard;