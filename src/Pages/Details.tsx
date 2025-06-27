import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import { featchProduct } from "../Api/Api";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../Types";

const Details: React.FC = () => {
  const { id } = useParams();
  const {
    data: carts,
    isError,
    isPending,
    error,
  } = useQuery<Product>({
    queryKey: ["Cards", id],
    queryFn: () => featchProduct(id),
    staleTime: 20000,
    placeholderData:keepPreviousData
  });

  if (isPending) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.message || "Page not found"}</h1>;

  return (
    <div className="p-4 flex flex-wrap w-full items-center gap-4 text-black">
      <div className="w-full md:w-[900px] h-full md:h-[400px] flex flex-col md:flex-row bg-gray-100 text-black rounded-2xl">
        <div className=" md:w-1/2 w-full flex items-center justify-center md:h-[380px] text-black h-52 overflow-hidden">
          <img
            className="p-4 object-center h-full md:w-96 w-72 hover:scale-105 rounded-3xl"
            src={carts?.image}
            alt="image"
          />
        </div>
        <div className="flex flex-col py-4 px-2 md:w-1/2 w-full md:pt-16 pt-0">
          <h1>
            {" "}
            <span className="font-semibold text-lg"> Title : </span>
            {carts?.title}
          </h1>
          <p>
            <span className="font-semibold text-lg">Category : </span>
            {carts.category}
          </p>
          <p>
            <span className="font-semibold text-lg">PKR : </span>
            {carts?.price}
          </p>
          <p>
            <span className="font-semibold text-lg">Description :</span>{" "}
            {carts.description}
          </p>
          <div className="pt-8">
            <Link to="/products">
              {" "}
              <span className="p-2 bg-red-400 cursor-pointer rounded-lg text-white font-semibold">
                Go back
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
