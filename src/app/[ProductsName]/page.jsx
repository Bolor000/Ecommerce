"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [products, setProuduct] = useState([]);
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const fetchData = async () => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    setProuduct(data.products);
    console.log(data);

  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      
        <div className="text-center mb-8 p-10">
          <div className="text-2xl font-bold">E-Commerce</div>
          <div className="w-1000px border-1 border-gray-200 my-4"></div>
        </div>
         <div>
          <div>{products?.title}</div>
        </div>
    </div>
  );
};

export default Page;
