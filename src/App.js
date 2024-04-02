import { QueryClientProvider, QueryClient } from "react-query";
import ShowProducts from "./controllers/ShowProducts";
import AddProduct from "./controllers/AddProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { AppProvider } from "./state";
import FirstStepForm from "./controllers/FirstStepForm";
import SecondStepForm from "./controllers/SecondStepForm";
import ShowDetails from "./controllers/ShowDetails";

const queryClient = new QueryClient();
function App() {
  const [newProductList, setNewProductList] = useState([]);
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<FirstStepForm />} />
              <Route path="/secondStep" element={<SecondStepForm />} />
              <Route path="/details" element={<ShowDetails />} />
              <Route
                path="/showProduct"
                element={<ShowProducts newProductList={newProductList} />}
              />
              <Route
                path="/addProduct"
                element={
                  <AddProduct
                    newProductList={newProductList}
                    setNewProductList={setNewProductList}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
