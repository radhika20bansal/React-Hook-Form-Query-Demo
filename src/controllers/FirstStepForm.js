import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state";

const FirstStepForm = () => {
  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmitForm = (data) => {
    setState({ ...state, ...data });
    reset();
    navigate("/secondStep");
  };
console.log("State", state);
  return (
    <div className="p-4">
      <h1 className="font-bold text-4xl text-emerald-800 mb-7 text-center">
        Personal Details
      </h1>
      <form onSubmit={handleSubmit(onSubmitForm)} className="px-8 mx-auto w-4/6">
        <div className="form-control mb-4">
          <label htmlFor="FirstName" className="font-bold mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            className="block w-full border border-slate-700 p-1 outline-none mt-2 rounded-sm"
            {...register("firstName", {
              required: "Please provide First Name",
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "First Name should contain letters only",
              },
            })}
          />
          {errors.firstName && (
            <p className="text-red-600">{errors.firstName.message}</p>
          )}
        </div>
        <div className="form-control mb-4">
          <label htmlFor="LastName" className="font-bold mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            className="block w-full border border-slate-700 p-1 outline-none mt-2 rounded-sm"
            {...register("lastName", {
              required: "Please provide Last Name",
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Last Name should contain letters only",
              },
            })}
          />
          {errors.lastName && (
            <p className="text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div className="form-control mb-4">
          <label htmlFor="ParentName" className="font-bold mb-2">
            Parents Name
          </label>
          <input
            type="text"
            name="parentName"
            className="block w-full border border-slate-700 p-1 outline-none mt-2 rounded-sm"
            {...register("parentName", {
              required: "Please provide Parents Name",
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Parent Name should contain letters only",
              },
            })}
          />
          {errors.parentName && (
            <p className="text-red-600">{errors.parentName.message}</p>
          )}
        </div>

        <div className="form-control mb-4">
          <label htmlFor="PhoneNumber" className="font-bold mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            className="block w-full border border-slate-700 p-1 outline-none mt-2 rounded-sm"
            {...register("phoneNumber", {
              required: "Please provide Phone Number",
              pattern: {
                value: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
                message: "Please provide valid phone number",
              },
            })}
          />
          {errors.phoneNumber && (
            <p className="text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="form-control mb-4">
          <label htmlFor="Email" className="font-bold mb-2">
            Email
          </label>
          <input
            type="text"
            name="email"
            className="block w-full border border-slate-700 p-1 outline-none mt-2 rounded-sm"
            {...register("email", {
              required: "Please provide Email",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Please provide valid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="form-control mb-4">
          <label htmlFor="Address" className="font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            className="block w-full border border-slate-700 p-1 mt-2 outline-none rounded-sm"
            {...register("address", {
              required: "Please provide Address",
            })}
          />
          {errors.address && (
            <p className="text-red-600">{errors.address.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 mt-5 bg-emerald-800 text-white rounded-md font-semibold"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default FirstStepForm;
