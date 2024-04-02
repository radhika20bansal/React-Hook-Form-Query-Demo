import { useNavigate } from "react-router-dom";
import { useAppState } from "../state";

const ShowDetails = () => {
  const [state, setState] = useAppState();
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="font-bold text-4xl text-emerald-800 mb-7 text-center">
        Complete Profile Details
      </h1>
      <div className="w-4/6 bg-gray-200 p-5 mx-auto rounded-md shadow-md">
        <div className="text-lg mb-2">
          <span className="font-semibold mr-2">Name:</span>
          <span>
            {state.firstName} {state.lastname}
          </span>
        </div>
        <div className="text-lg mb-2">
          <span className="font-semibold mr-2">Email:</span>
          <span>{state.email}</span>
        </div>
        <div className="text-lg mb-2">
          <span className="font-semibold mr-2">Phone Number:</span>
          <span>{state.phoneNumber}</span>
        </div>
        <div className="text-lg mb-2">
          <span className="font-semibold mr-2">Address:</span>
          <span>{state.address}</span>
        </div>
        <div className="text-lg mb-2">
          <span className="font-semibold mr-2">Parents Name:</span>
          <span>{state.parentName}</span>
        </div>
        <div className="text-lg mb-2">
          <span className="font-semibold mr-2">Family Members:</span>
          <span>
            {state.familyMembers && state.familyMembers.length > 0
              ? state.familyMembers.map((member) => {
                  return (
                    <div className="ml-4">
                      <span>Name: {member.name}</span> &nbsp; &nbsp; 
                      <span>Relationship: {member.relationship}</span>
                    </div>
                  );
                })
              : "No family member added"}
          </span>
        </div>
      </div>
      <button
        className="block mx-auto px-4 py-2 mt-5 bg-emerald-800 text-white rounded-md font-semibold"
        onClick={() => navigate("/showProduct")}
      >
        Move to Product Page
      </button>
    </div>
  );
};

export default ShowDetails;
