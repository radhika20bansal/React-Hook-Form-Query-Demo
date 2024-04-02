import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state";
import { FaLock, FaTrash } from "react-icons/fa";

const SecondStepForm = () => {
  const [state, setState] = useAppState();
  const navigate = useNavigate();
  const [isAddMemberClicked, setIsAddMemberClicked] = useState(false);
  const [addedMemberList, setAddedMemberList] = useState([]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmitForm = (data) => {
    setAddedMemberList([...addedMemberList, data]);
    reset();
  };

  const handleDelete = (name) => {
    const filteredAddedMemberList = addedMemberList.filter(
      (member) => member.name !== name
    );
    setAddedMemberList(filteredAddedMemberList);
  };

  const handleNextButton = () => {
    setState({ ...state, familyMembers: [...addedMemberList] });
    navigate("/details");
  };

  console.log("isAddMemberClicked", isAddMemberClicked);
  console.log("addedMemberList", addedMemberList);
  console.log("State", state);

  const addedMembersListComponent = (
    <div className="px-8 py-4 mx-auto my-5 w-4/6 bg-gray-300">
      {addedMemberList && addedMemberList.length > 0 ? (
        addedMemberList.map((member) => {
          return (
            <div className="flex justify-between">
              <div className="font-semibold text-lg mb-4">
                <p>Name: {member.name}</p>
                <p>Relationship: {member.relationship}</p>
              </div>
              <FaTrash
                color={"gray"}
                className="cursor-pointer"
                onClick={() => handleDelete(member.name)}
              />
            </div>
          );
        })
      ) : (
        <p className="font-semibold">No new family member added</p>
      )}
    </div>
  );

  const formComponent = (
    <form onSubmit={handleSubmit(onSubmitForm)} className="px-8 mx-auto w-4/6">
      <div className="form-control mb-4">
        <label htmlFor="Name" className="font-bold mb-2">
          Parent Name
        </label>
        <input
          type="text"
          name="name"
          className="block w-full border border-slate-700 p-1 outline-none mt-2 rounded-sm"
          {...register("name", {
            required: "Please provide Parent Name",
            pattern: {
              value: /^[a-zA-Z\s]*$/,
              message: "Parent Name should contain letters only",
            },
          })}
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
      </div>
      <div className="form-control mb-4">
        <label htmlFor="Relationship" className="font-bold mb-2">
          Relationship
        </label>
        <input
          type="text"
          name="relationship"
          className="block w-full border border-slate-700 p-1 outline-none mt-2 rounded-sm"
          {...register("relationship", {
            required: "Please provide relationship",
            pattern: {
              value: /^[a-zA-Z\s]*$/,
              message: "Realtionship should contain letters only",
            },
          })}
        />
        {errors.relationship && (
          <p className="text-red-600">{errors.relationship.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 mt-5 bg-emerald-800 text-white rounded-md font-semibold mr-5"
      >
        Add
      </button>
      <button
        type="button"
        className="px-4 py-2 mt-5 bg-emerald-800 text-white rounded-md font-semibold"
        onClick={() => {
          setIsAddMemberClicked(!isAddMemberClicked);
        }}
      >
        Cancel
      </button>
    </form>
  );

  return (
    <div className="p-4">
      <h1 className="font-bold text-4xl text-emerald-800 mb-7 text-center">
        Family Details
      </h1>
      <div className="flex justify-between px-8 py-4 mx-auto my-5 w-4/6 bg-gray-300 ">
        <div className="font-bold text-xl text-gray-600">
          <p>Name: {state.parentName}</p>
          <p>Relationship: Father</p>
        </div>
        <FaLock color={"gray"} />
      </div>

      <div className="flex items-end justify-between mb-5 w-4/6 mx-auto">
        <h3 className="text-lg font-medium">Family Members</h3>
        <button
          className="block px-4 py-2 mt-5 bg-emerald-800 text-white rounded-md font-semibold"
          onClick={() => {
            setIsAddMemberClicked(!isAddMemberClicked);
          }}
        >
          Add Family Member
        </button>
      </div>

      {isAddMemberClicked ? formComponent : addedMembersListComponent}

      <button
        className="block mx-auto px-4 py-2 mt-5 bg-emerald-800 text-white rounded-md font-semibold"
        onClick={handleNextButton}
      >
        Next
      </button>
    </div>
  );
};

export default SecondStepForm;
