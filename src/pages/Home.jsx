import React from "react";
import Navbar from "../components/Navbar";
import heroImage from "../assets/hero-cloth.jpeg";
import ProductSection from "../components/ProductSection";

function Home() {
  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <div className="relative h-screen w-full overflow-hidden">

        {/* Background Image */}
        <img
          src={heroImage}
          alt="Hero"
          className="absolute w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">

          <h1 className="text-5xl md:text-7xl font-bold tracking-[0.35em] mb-10">
            WOLSERA
          </h1>

          <div className="w-full max-w-2xl relative">
            <input
              type="text"
              placeholder="Search for clothing, styles, collections..."
              className="w-full py-4 px-6 rounded-full bg-white/90 text-black 
                         focus:outline-none focus:ring-2 focus:ring-white 
                         text-lg shadow-xl"
            />

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 
                         bg-black text-white px-6 py-2 rounded-full 
                         hover:bg-zinc-800 transition duration-300 cursor-pointer"
            >
              Search
            </button>
          </div>

        </div>
      </div>

      {/* PRODUCT SECTION BELOW HERO */}
      <ProductSection />

    </div>
  );
}

export default Home;
