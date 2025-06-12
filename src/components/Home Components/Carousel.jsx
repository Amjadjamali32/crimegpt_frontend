import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../utils/Carousel.css"; 
import { imagesPath } from "../../utils/Images.js"; 

// Manually select required images
const firstImage = imagesPath.find((img) => img.id === 1)?.url;
const secondImage = imagesPath.find((img) => img.id === 2)?.url;
const thirdImage = imagesPath.find((img) => img.id === 3)?.url;
const fourthImage = imagesPath.find((img) => img.id === 4)?.url;
const fifthImage = imagesPath.find((img) => img.id === 10)?.url;
const sixthImage = imagesPath.find((img) => img.id === 14)?.url;

const Carousel = () => {
  return (
    <div className="w-full pt-12 md:pt-20 lg:pt-16">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        spaceBetween={30}
        slidesPerView={1}
        className="shadow-lg w-full"
        style={{ height: "250px", width: "100%" }}
      >
        <SwiperSlide>
          <div className="relative">
            <img
              src={firstImage}
              alt="Slide 1"
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
            <div className="absolute bottom-0 left-0 w-full bg-opacity-50 text-white p-4 text-center">
              <h5 className="text-lg font-semibold font-inter"> Secure and Anonymous Reporting</h5>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              src={secondImage}
              alt="Slide 2"
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
            <div className="absolute bottom-0 left-0 w-full bg-opacity-50 text-white p-4 text-center">
              <h5 className="text-lg font-semibold font-inter">Real-Time Crime Alerts</h5>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              src={thirdImage}
              alt="Slide 3"
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
            <div className="absolute bottom-0 left-0 w-full bg-opacity-50 text-white p-4 text-center">
              <h5 className="text-lg font-semibold font-inter">Instant Report Generation</h5>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              src={fourthImage}
              alt="Slide 3"
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
            <div className="absolute bottom-0 left-0 w-full bg-opacity-50 text-white p-4 text-center">
              <h5 className="text-lg font-semibold font-inter">Latest Updates about crimes</h5>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              src={fifthImage}
              alt="Slide 3"
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
            <div className="absolute bottom-0 left-0 w-full bg-opacity-50 text-white p-4 text-center">
              <h5 className="text-lg font-semibold font-inter">Track Your Crime Reprot</h5>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              src={sixthImage}
              alt="Slide 3"
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
            <div className="absolute bottom-0 left-0 w-full bg-opacity-50 text-white p-4 text-center">
              <h5 className="text-lg font-semibold font-inter">Give Feedback or any Query related to Crimes</h5>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
