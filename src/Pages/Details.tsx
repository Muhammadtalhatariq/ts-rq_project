import { useQuery } from "@tanstack/react-query";
import React from "react";
import { featchProduct } from "../Api/Api";
import { Link, useParams } from "react-router-dom";
import type { ProductDetails } from "../Types";
import Loading from "../components/Loading";

const Details: React.FC = () => {
  const { id } = useParams();
  const {
    data: carts,
    isError,
    isPending,
    error,
  } = useQuery<ProductDetails>({
    queryKey: ["Cards", id],
    queryFn: () => featchProduct(id),
    staleTime: 20000,
  });

  if (isPending)
    return (
      <div className="h-screen text-2xl text-black flex items-center justify-center">
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
    <div className="p-4 flex flex-wrap w-full items-center gap-4 text-black">
      <div className="w-full md:w-[900px] h-full md:h-full flex flex-col md:flex-row bg-gray-100 text-black rounded-lg border-b-4 border-gray-300">
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
          <div className="md:pt-16 pt-4 text-center w-full">
            <Link to="/products">
              {" "}
              <div className="p-2 bg-gray-200 cursor-pointer rounded-lg text-white font-semibold">
                Go back
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
