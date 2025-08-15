"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const PAGE_SIZE = 12;

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const [products, setProuduct] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(pageParam ? pageParam : 1);
  const [searchValue, setSearchValue] = useState("");

  const fetchProduct = async () => {
    console.log("working");
    let skip = 0;
    if (currentPage > 1) {
      skip = PAGE_SIZE * (currentPage - 1);
    }

    let url = `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`;
    const response = await fetch(
      `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`
    );
    const data = await response.json();
    setProuduct(data.products);
    setTotalProducts(data.total);
    console.log(data);
  };
  useEffect(() => {
    fetchProduct();
  }, [currentPage]);

  const pageCount = Math.ceil(totalProducts / PAGE_SIZE);
  const totalPage = Array.from({ length: pageCount }, (_, i) => i + 1);

  const filterProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="p-10">
      <div className="text-center mb-8">
        <div className="text-2xl font-bold">E-Commerce</div>
      </div>
      <div className="flex mb-8">
        <input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          className="bg-gray-200 px-4 py-2 rounded-md w-64"
          placeholder="Search"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filterProducts.map((product) => {
          return (
            <Card
              onClick={() => {
                setSearchValue(page);
                router.push(`?page=${page}`);
              }}
              key={product.id}
              className="shadow-sm hover:shadow-lg"
            >
              <CardContent className="p-4">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-4"
                />
                <CardTitle className="text-lg font-semibold">
                  {product.title}
                </CardTitle>
                <CardDescription className="capitalize">
                  {product.category}
                </CardDescription>
                <div className="flex items-center justify-between mt-4">
                  <div className="font-bold">${product.price}</div>
                  <div className="bg-gray-200 rounded-sm" size="sm">
                    View Details
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: pageCount }, (_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                router.push(`?page=${page}`);
              }}
              className={`px-3 py-1 border rounded ${
                currentPage === page ? "bg-black text-white" : "bg-white"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Page;
