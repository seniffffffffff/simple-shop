import { useEffect, useState } from "react";
import axios from "axios";
import NewTable from "../src/components/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [localStateDate, setLocalStateDate] = useState();
  const { data } = useQuery("products", async () => {
    return await axios.get("https://fakestoreapi.com/products");
  });

  useEffect(() => {
    setLocalStateDate(data?.data);
  }, [data]);
  const mutation = useMutation(
    (id) => axios.delete(`https://fakestoreapi.com/products/${id}`),
    {
      onSuccess: (data) => {
        setLocalStateDate((prev) =>
          prev.filter((product) => product.id !== data.data.id)
        );
      },
    }
  );
  const queryClient = useQueryClient();
  const deleteSingleProduct = (id) => {
    mutation.mutate(id);
  };
  return (
    <div className="App">
      <NewTable
        data={localStateDate}
        deleteSingleProduct={deleteSingleProduct}
      />
    </div>
  );
}

export default App;
