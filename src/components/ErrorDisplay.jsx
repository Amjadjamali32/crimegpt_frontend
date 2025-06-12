
const ErrorDisplay = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="bg-red-100 border font-inter border-red-400 text-red-700 px-4 py-3 rounded-lg text-center max-w-md">
        <h2 className="font-bold text-xl mb-2">Error!</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorDisplay;