"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
  const [product, setProduct] = useState();
  const [category, setCategory] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();
  const productId = params.productId;

  const fetchProduct = async () => {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await res.json();
    setProduct(data);
    setCategory(data.category);
  };

  const fetchRelatedProduct = async () => {
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}?limit=4`
    );
    const data = await res.json();
    setRelatedProducts(data.products);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    fetchRelatedProduct();
  }, [product]);

  console.log(product);

  return (
    <div>
      <div className="p-10">
        <div className="text-center mb-8">
          <div className="text-2xl font-bold">E-Commerce</div>
        </div>
        <div className="flex">
          <img
            src={product?.images?.[0]}
            className="w-150 h-150 object-cover rounded-md shadow-md bg-gray-100"
          />
          <div className="flex flex-col p-10">
            <div className="text-3xl font-semibold">{product?.title}</div>
            <div className="flex flex-row gap-10 mt-4">
              <div className="font-semibold">Rating:{product?.rating}</div>
              <div className="font-semibold text-gray-400">
                Brand:{product?.brand}
              </div>
            </div>
            <div className="text-2xl mt-4 font-semibold">${product?.price}</div>
            <div className="mt-4  text-gray-600">
              Stock: {product?.description}
            </div>
            <div className="mt-4 font-semibold">
              Availability: {product?.stock}
            </div>
            <div className="mt-4">Quantity</div>
            <select className="w-20">
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <div className="flex gap-10 mt-6">
              <Button className="w-50">Add to cart</Button>
              <Button className="w-50">Add to wishlist</Button>
            </div>
          </div>
        </div>
        <div className="mt-10 mb-5 text-2xl font-bold">Related Products</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => {
            return (
              <div
                key={product.id}
                //onClick={() => router.push(`/products/${product.id}`)}
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
      </div>
    </div>
  );
};

export default Page;
