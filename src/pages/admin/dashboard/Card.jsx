
const Card = ({ title, count, Icon }) => {
  return (
    <div className="max-w-full p-4 bg-custom-teal rounded-md shadow-lg text-center font-inter">
      {Icon && <Icon className="w-10 h-10 text-white mx-auto mb-3" />}
      <p className="font-extrabold text-white font-poppins text-xl">{count}</p>
      <h5 className="text-lg tracking-tight text-white">{title}</h5>
    </div>
  );
};

export default Card;
