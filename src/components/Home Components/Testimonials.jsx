import { data } from "../../utils/testimonials.js";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-custom-gray py-8 md:py-12 px-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={item} className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 font-poppins mb-3">
            Community Feedback
          </h1>
          <div className="w-20 h-1 bg-custom-teal mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-inter">
            Hear what people say about our complaint resolution system and their
            experiences
          </p>
        </motion.div>

        <motion.div
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex-1">
                  <div className="text-custom-teal mb-4">
                    <FaQuoteLeft size={24} />
                  </div>
                  <h3 className="text-xl font-bold font-poppins text-gray-800 mb-3">
                    {testimonial.title}
                  </h3>
                  <p className="text-gray-600 font-inter mb-6 leading-relaxed">
                    {testimonial.description}
                  </p>
                </div>

                <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                  <div className="mr-4">
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="rounded-full w-14 h-14 object-cover border-2 border-custom-teal"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold font-poppins text-gray-800">
                      {testimonial.name}
                    </p>
                    <div className="flex items-center mt-1">
                      <img
                        src={testimonial.icon}
                        alt="Verification icon"
                        className="w-5 h-5 mr-2"
                      />
                      <span className="text-sm text-gray-500 font-inter">
                        Verified User
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section for additional credibility */}
        <motion.div
          variants={item}
          className="mt-16 bg-custom-teal rounded-xl p-8 text-white text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold font-poppins mb-6">
              Our Impact in Numbers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4">
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-sm font-inter">Satisfaction Rate</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold mb-2">1,200+</div>
                <div className="text-sm font-inter">Complaints Resolved</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold mb-2">24h</div>
                <div className="text-sm font-inter">Average Response Time</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-sm font-inter">Would Recommend</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
