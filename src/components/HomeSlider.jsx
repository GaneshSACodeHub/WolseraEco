import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { fetchSliders } from "../Services/sliderService";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function HomeSlider() {

  const [slides, setSlides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadSliders();
  }, []);

  const loadSliders = async () => {
    try {
      const data = await fetchSliders();
      setSlides(data);
    } catch (err) {
      console.error("Failed to load sliders", err);
    }
  };

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-0">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        loop={true}
        className="w-full overflow-hidden"
      >

        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>

            <div className="relative w-full h-[350px] md:h-[420px]">

              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 flex items-center px-10">

                <div className="text-black">

                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>

                  <p className="mb-6 text-lg">
                    {slide.subtitle}
                  </p>

                  <button
                    onClick={() => {

                      if (slide.promotionId) {

                        navigate(
                          `/promotions/${slide.promotionId}`
                        );

                      }

                    }}
                    className="bg-black text-white px-6 py-2 rounded-full"
                  >
                    {slide.buttonText}
                  </button>

                </div>

              </div>

            </div>

          </SwiperSlide>
        ))}

      </Swiper>

    </div>
  );
}

export default HomeSlider;