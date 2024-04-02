import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShowProducts = ({ newProductList }) => {
  const navigate = useNavigate();
  const getProducts = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    return res;
  };

  const { data, error, isLoading } = useQuery("product", getProducts);

  let finalProducts = [];
  if (data) {
    finalProducts = [
      ...finalProducts,
      ...data.data.products,
      ...newProductList,
    ];
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="font-bold text-4xl text-emerald-800">All Products</h1>
        <button
          className="p-4 bg-emerald-800 text-white rounded-md font-semibold"
          onClick={() => navigate("/addProduct")}
        >
          Add a Product
        </button>
      </div>
      {error ? (
        <div className="text-2xl text-center mt-8 font-semibold">Request Failed</div>
      ) : isLoading ? (
        <div className="text-2xl text-center mt-8 font-semibold">Loading...</div>
      ) : (
        <table className="table-fixed border-collapse border border-slate-500 w-4/5 mx-auto my-8">
          <thead className="border-collapse border border-slate-500 border-spacing-1">
            <tr>
              <th className="py-2">Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Ratings</th>
            </tr>
          </thead>
          <tbody>
            {finalProducts.map((product) => {
              return (
                <tr key={product.id}>
                  <td className="p-2 text-center">{product.id}</td>
                  <td className="p-2 text-center">{product.title}</td>
                  <td className="p-2">
                    {product.description.length > 40
                      ? product.description.substring(0, 40) + "..."
                      : product.description}
                  </td>
                  <td className="p-2 text-center">
                    {"Rs. "}
                    {product.price}
                  </td>
                  <td className="p-2 text-center">{product.rating}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowProducts;
