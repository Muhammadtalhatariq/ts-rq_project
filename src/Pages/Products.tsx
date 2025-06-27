import { useQuery } from "@tanstack/react-query";
import React from "react";
import { featchProducts } from "../Api/Api";
import { Link } from "react-router-dom";
import type { Product } from "../Types";

const Products: React.FC = () => {
  const { data, isError, error, isPending } = useQuery<Product[]>({
    queryKey: ["Cards"],
    queryFn: () => featchProducts(),
    staleTime: 20000,
  });

  if (isPending) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.message || "Page not found"}</h1>;

  return (
    <div className="p-4 flex flex-wrap w-full items-center justify-center gap-4">
      {data?.map((item) => (
        <div
          key={item.id}
          className="md:w-72 w-80 h-[300px] bg-gray-100 text-black rounded-b-lg"
        >
          <div className=" text-black w-full h-52 overflow-hidden hover:opacity-75 duration-700 cursor-pointer">
            <Link to={`/product/${item.id}`}>
              {" "}
              <img className="p-4" src={item.image} alt="" />
            </Link>
          </div>
          <div className="flex flex-col py-4 px-2">
            <h1>{item.title.split(" ").slice(0, 3).join(" ")}</h1>
            <p> PKR : {item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
