import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../Services/productService";
import { addItemToCart } from "../Services/cartService";
import Footer from "../components/Footer";
import CartToast from "../components/CartToast";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const data = await fetchProductById(id);

      setProduct(data);

      if (data.images.length > 0) {
        setSelectedImage(data.images[0].imageUrl);
      }

      if (data.variants.length > 0) {
        setSelectedVariant(data.variants[0]);
      }

    } catch (err) {
      console.error("Failed to load product", err);
    }
  };

  if (!product) return <div className="p-10 text-center text-white">Loading...</div>;

  const handleAddToCart = async () => {
    try {

      await addItemToCart({
        variantId: selectedVariant.id,
        quantity: quantity
      });

      setShowToast(true);

      // auto hide after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

    } catch (err) {
      console.error(err);
    }
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/signin");
    else navigate("/payment");
  };

  console.log(product);
  return (

    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">

      <main className="flex-grow px-10 py-16">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 pb-30">

          {/* LEFT SIDE IMAGES */}
          <div className="flex gap-6">

            {/* THUMBNAILS */}
            <div className="flex flex-col gap-4">

              {product.images.map((img) => (
                <img
                  key={img.id}
                  src={img.imageUrl}
                  alt="thumb"
                  onClick={() => setSelectedImage(img.imageUrl)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
                  ${selectedImage === img.imageUrl
                    ? "border-blue-500"
                    : "border-gray-700"}`}
                />
              ))}

            </div>

            {/* MAIN IMAGE */}
            <div className="flex-1">

              <img
                src={selectedImage}
                alt={product.name}
                className="w-full rounded-2xl shadow-xl"
              />

            </div>

          </div>



          {/* RIGHT SIDE DETAILS */}
          <div className="flex flex-col">

            <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">
              WOLSERA
            </p>

            <h1 className="text-4xl font-bold mb-4">
              {product.name}
            </h1>

            <span className="inline-block bg-[#1e293b] text-gray-300 text-xs px-3 py-1 rounded-full mb-6 w-fit">
              {product.gender}
            </span>

            <p className="text-gray-300 mb-8 leading-relaxed">
              {product.description}
            </p>



            {/* SIZE */}
            <div className="mb-8">

              <p className="text-sm font-medium mb-3">
                Select Size
              </p>

              <div className="flex gap-3">

                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-lg border transition
                    ${selectedVariant.id === variant.id
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-600 hover:border-blue-500"}`}
                  >
                    {variant.size}
                  </button>
                ))}

              </div>

            </div>



            {/* PRICE */}
            <div className="flex items-center gap-4 mb-4">

              <span className="text-3xl font-bold">
                ₹{selectedVariant.price}
              </span>

            </div>



            {/* STOCK */}
            <p
              className={`mb-6 font-medium ${
                selectedVariant.stockQuantity > 0
                  ? "text-green-400"
                  : "text-red-500"
              }`}
            >
              {selectedVariant.stockQuantity > 0
                ? "✔ In Stock"
                : "❌ Out of Stock"}
            </p>



            {/* QUANTITY */}
            <div className="flex items-center gap-4 mb-8">

              <button
                onClick={() =>
                  setQuantity(quantity > 1 ? quantity - 1 : 1)
                }
                className="w-12 h-12 bg-[#1e293b] rounded-lg hover:bg-[#334155]"
              >
                -
              </button>

              <span className="text-lg font-semibold w-6 text-center">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 bg-[#1e293b] rounded-lg hover:bg-[#334155]"
              >
                +
              </button>

            </div>



            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2
              bg-gradient-to-r from-blue-500 to-purple-600
              py-4 rounded-xl font-semibold
              hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/30
              transition mb-4"
            >
              Add to Cart
            </button>



            {/* BUY NOW */}
            <button
              onClick={handleBuyNow}
              className="bg-green-600 py-4 rounded-xl font-semibold
              hover:bg-green-700 transition"
            >
              Buy Now
            </button>

          </div>

        </div>

      </main>

      <Footer />

      <CartToast show={showToast} message="Item added to cart" />

    </div>

    

  );
}

export default ProductDetails;