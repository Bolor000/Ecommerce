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

const Page = () => {
  const [products, setProuduct] = useState([]);
  const router = useRouter();

  const fetchProduct = async () => {
    const response = await fetch(
      "https://dummyjson.com/products?limit=4&skip=0"
    );
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
                <div className="p-4">
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

      <div className="flex justify-center mt-8 ">
        <Link href="/products">
          <Button>View all products</Button>
        </Link>
      </div>
    </div>
  );
};
export default Page;
