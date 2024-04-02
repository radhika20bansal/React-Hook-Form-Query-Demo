import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const createProduct = async (data) => {
  const addedProduct = await axios.post(
    "https://dummyjson.com/products/add",
    data
  );
  const response = addedProduct.data;
  return response;
};

const AddProduct = ({newProductList, setNewProductList }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const { mutate } = useMutation(createProduct, {
    onSuccess: (data) => {
      console.log("Success", data);
      setNewProductList([...newProductList, {
        ...data,
        id: Math.floor(100 + Math.random() * 900),
      }]);
      alert("Success!!");
      navigate("/showProduct");
    },
    onError: () => {
      alert("there was an error");
    },
  });

  const onSubmitForm = (product) => {
    const newProduct = {
      ...product,
      price: parseInt(product.price),
      rating: parseFloat(product.rating),
    };
    mutate(newProduct);
    reset();
  };

  return (
    <div className="p-4">
      <h1 className="font-bold text-4xl text-emerald-800 mb-7">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="form-control mb-4">
          <label htmlFor="Title" className="font-bold">
            Product Title:
          </label>
          <input
            type="text"
            name="title"
            className="border border-slate-700 p-1 outline-none ml-4 rounded-sm"
            {...register("title", { required: true })}
          />
          {errors.title?.type === "required" && (
            <p className="text-red-600">Please provide title</p>
          )}
        </div>

        <div className="form-control mb-4">
          <label htmlFor="Description" className="font-bold">
            Product Description:
          </label>
          <input
            type="text"
            name="description"
            className="border border-slate-700 p-1 outline-none ml-4 rounded-sm"
            {...register("description", {
              required: true, validate:{
                checkLength: (value) => value.length < 100
              }
            })}
          />
          {errors.description?.type === "required" && (
            <p className="text-red-600">Please provide description</p>
          )}
          {errors.description?.type === "checkLength" && (
            <p className="text-red-600">Description should be under 100 character length</p>
          )}
        </div>

        <div className="form-control mb-4">
          <label htmlFor="Price" className="font-bold">
            Product Price:
          </label>
          <input
            type="text"
            name="price"
            className="border border-slate-700 p-1 outline-none ml-4 rounded-sm"
            {...register("price", { required: true })}
          />
          {errors.price?.type === "required" && (
            <p className="text-red-600">Please provide price</p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="rating" className="font-bold">
            Product Rating:{" "}
          </label>
          <input
            type="text"
            name="rating"
            className="border border-slate-700 p-1 outline-none ml-4 rounded-sm"
            {...register("rating", { required: true, validate: {
                checkRating: (value) => value <= 5
            } })}
          />
          {errors.rating?.type === "required" && (
            <p className="text-red-600 mb-5">Please provide rating</p>
          )}
          {errors.rating?.type === "checkRating" && (
            <p className="text-red-600 mb-5">Rating should be under 5</p>
          )}
        </div>
        
        <button
          type="submit"
          className="px-4 py-2 mt-5 bg-emerald-800 text-white rounded-md font-semibold"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
