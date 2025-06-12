import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchSingleEvidence, reset } from "../../../app/features/evidence/evidenceSlice";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";

const EvidenceDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { evidence, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.evidence
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleEvidence(id));
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && message) {
      toast.success("All evidences fetched Successfully");
      dispatch(reset());
    }
  }, [isError, isSuccess, message, dispatch]);

  const handleDownload = () => {
    if (evidence?.data?.evidencefileUrl) {
      const link = document.createElement('a');
      link.href = evidence.data.evidencefileUrl;
      const fileName = `evidence-${evidence.data._id}${
        evidence.data.type === 'raw' ? '.pdf' : 
        evidence.data.type === 'image' ? '.jpg' : 
        '.file'}`;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast.error("No file available for download");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#173F5C" size={60} />
      </div>
    );
  }

  if (!evidence?.data) {
    return (
      <div className="pt-20 p-4 text-center">
        <p>No evidence found</p>
        <Link to="/evidences" className="text-blue-500 hover:underline">
          Back to Evidence List
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 p-4 font-inter">
      <div className="bg-gray-200 shadow-lg mb-4 sm:ms-[41%] sm:w-[58%] md:ms-[32%] md:w-[64%] lg:ms-[24%] lg:w-[72%] xl:ms-[20%] xl:w-[75%] border p-6 rounded-md">
        <h2 className="text-xl font-bold mb-5">Evidence Details</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col">
            <span className="text-gray-600">Evidence ID</span>
            <span className="font-medium">{evidence.data._id}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">User Name</span>
            <span className="font-medium">{evidence.data.userId?.fullname || 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">User Email</span>
            <span className="font-medium">{evidence.data.userId?.email || 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Case Number</span>
            <span className="font-medium">{evidence.data.caseNumber || 'N/A'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Evidence Type</span>
            <span className="font-medium">
              {evidence.data.type === 'raw' ? 'Document' : 
               evidence.data.type?.charAt(0).toUpperCase() + evidence.data.type?.slice(1)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Submitted At</span>
            <span className="font-medium">
              {evidence.data.createdAt ? new Date(evidence.data.createdAt).toLocaleString() : 'N/A'}
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <Link
            to="/evidences"
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-full transition-colors"
          >
            Back to List
          </Link>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-2 text-sm bg-custom-teal hover:opacity-80 text-white rounded-full shadow-sm transition-colors"
            disabled={!evidence.data.evidencefileUrl}
          >
            Download
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvidenceDetails;