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
import { useRouter } from "next/navigation";
import Link from "next/link";

const PAGE_SIZE = 12;

const Page = () => {
  const [products, setProuduct] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const fetchProduct = async () => {
    const PASS = PAGE_SIZE * (currentPage - 1);
    let url = `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${PASS}`;

    if (searchValue !== "") {
      url = `https://dummyjson.com/products/search?q=${searchValue}&limit=${PAGE_SIZE}&skip=${PASS}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setProuduct(data.products);
    setTotalProduct(data.total);
    // console.log(data);
  };
  useEffect(() => {
    fetchProduct();
  }, [currentPage, searchValue]);

  const pages = Array.from(
    { length: Math.ceil(totalProduct / 12) },
    (_, i) => i + 1
  );

  return (
    <div className="p-10">
      <div className="text-center mb-8">
        <div className="text-2xl font-bold">E-Commerce</div>
      </div>
      <input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          setCurrentPage(1);
        }}
        className="bg-gray-100 px-4 py-2 rounded-md w-64 mb-6"
        placeholder="Search..."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <Card
                key={product.id}
                className="shadow-sm hover:shadow-lg h-[400px]"
              >
                <div className="p-4 flex flex-col flex-grow">
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
                    <Button>View Details</Button>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          next
        </Button>
        {pages.map((page) => {
          return (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 mx-1 mt-7 rounded-lg border text-sm font-medium transition`}
              variant={page === currentPage ? "default" : "secondary"}
            >
              {page}
            </Button>
          );
        })}
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === 17}
        >
          next
        </Button>
      </div>
    </div>
  );
};
export default Page;
