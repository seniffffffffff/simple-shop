import { useEffect, useState } from "react";
import axios from "axios";
import NewTable from "../src/components/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { data } = useQuery("products", async () => {
    return await axios.get("https://fakestoreapi.com/products");
  });

  const mutation = useMutation(
    (id) => axios.delete(`https://fakestoreapi.com/products/${id}`),
    {
      onSuccess: (mutationData) => {
        const newData = data;
        const filteredData = data?.data.filter(
          (product) => product.id !== mutationData.data.id
        );
        newData.data = filteredData;
        queryClient.setQueriesData("products", newData);
      },
    }
  );
  const queryClient = useQueryClient();
  const deleteSingleProduct = (id) => {
    mutation.mutate(id);
  };
  return (
    <div className="App">
      <NewTable data={data?.data} deleteSingleProduct={deleteSingleProduct} />
    </div>
  );
}

export default App;
