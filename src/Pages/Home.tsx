import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteProduct, featchProducts, updateProduct } from "../Api/Api";
import type { Product } from "../Types";
import Loading from "../components/Loading";
const Home: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useQuery<Product[], Error>({
    queryKey: ["Cards"],
    queryFn: () => featchProducts(),
    staleTime: 20000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: (data, id: number) => {
      queryClient.setQueryData<Product[] | undefined>(["Cards"], (item) => {
        return item.filter((cart) => cart.id !== id);
      });
    },
  });
  const updateMutation = useMutation({
    mutationFn: (id: number) => updateProduct(id),
    onSuccess: (apiData, id: number) => {
      queryClient.setQueryData<Product[] | undefined>(["Cards"], (items) => {
        return items.map((curElm) => {
          return curElm.id === id
            ? { ...curElm, title: apiData.data.title }
            : curElm;
        });
      });
    },
  });

  if (isPending)
    return (
      <div className="h-screen text-2xl flex items-center justify-center">
        <Loading />
      </div>
    );
  if (isError)
    return (
      <div className="h-screen text-xl text-red-500">
        {error.message || "Page not found"}
      </div>
    );

  return (
    <div className="p-4 flex flex-wrap w-full items-center justify-center gap-4">
      {data?.map((item) => (
        <div
          key={item.id}
          className="md:w-72 w-80 h-[350px] bg-gray-100 text-black rounded-lg border-b-4 border-gray-300"
        >
          <div className=" text-black w-full h-52 overflow-hidden hover:opacity-75 duration-700 cursor-pointer">
            <img className="p-4" src={item.image} alt="" />
          </div>
          <div className="flex flex-col py-4 px-2">
            <h1>{item.title.split(" ").slice(0, 3).join(" ")}</h1>
            <p> PKR : {item.price}</p>
          </div>
          <div className="flex gap-4 px-2">
            <button
              onClick={() => deleteMutation.mutate(item.id)}
              className="p-2 bg-red-400 cursor-pointer rounded-lg text-white font-semibold"
            >
              Delete
            </button>
            <button
              onClick={() => updateMutation.mutate(item.id)}
              className="p-2 bg-green-400 cursor-pointer rounded-lg text-white font-semibold"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
