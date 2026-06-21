import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import { fetchPromotionProducts } from "../Services/productService";

function PromotionProducts() {

  const { id } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [id]);

  const loadProducts = async () => {

    try {

      const data =
        await fetchPromotionProducts(id);

      const mappedProducts =
        data.map(product => {

          let price =
            Number(product.price);

          let originalPrice =
            null;

          if (
            product.promotionType === "DISCOUNT" &&
            product.discountedPrice
          ) {

            originalPrice = price;

            price =
              Number(
                product.discountedPrice
              );
          }

          return {
            id: product.id,
            name: product.name,
            image: product.thumbnailUrl,
            price,
            originalPrice,
            promotionType:
              product.promotionType,
            discountPercentage:
              product.discountPercentage
          };
        });

      setProducts(
        mappedProducts
      );

    } catch (error) {

      console.error(error);
    }

  };

  return (

    <div className="min-h-screen bg-zinc-950">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-10">

        <h1 className="text-4xl font-bold text-white mb-8">
          Promotion Products
        </h1>

        {products.length === 0 ? (

          <p className="text-white">
            No products found
          </p>

        ) : (

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-6
            "
          >

            {products.map(product => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

        )}

      </div>

      <Footer />

    </div>

  );
}

export default PromotionProducts;