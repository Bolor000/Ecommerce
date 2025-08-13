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

const Page = () => {
  const [products, setProuduct] = useState([]);

  const fetchProduct = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=4");
    const data = await response.json();
    setProuduct(data.products);
    console.log(data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="p-10">
      <div className="text-center mb-8">
        <div className="text-2xl font-bold">E-Commerce</div>
        <div className="text-3xl font-semibold mt-2">Featured Products</div>
        <div className="text-gray-500">
          Check out our most popular items that customers love.
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <input
          className="bg-gray-200 px-4 py-2 rounded-md w-64"
          placeholder="Search"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => {
          return (
            <Card key={product.id} className="shadow-sm hover:shadow-lg">
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

      <div className="flex justify-center mt-8">
        <Button>View All Products</Button>
      </div>
    </div>
  );
};
export default Page;
