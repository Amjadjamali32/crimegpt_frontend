import { features } from "../../utils/features.js";
import { motion } from "framer-motion";

const Features = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const hoverEffect = {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  };

  return (
    <div className="bg-custom-gray pb-2 md:pb-8">
      <h1 className="text-center font-extrabold text-2xl py-4 font-inter">
        Features
      </h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-8 gap-4 w-10/12 mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={hoverEffect}
            className="bg-white shadow-xl rounded-sm p-4 hover:cursor-default transition-colors duration-300"
          >
            <motion.img
              src={feature.iconUrl}
              alt="icon"
              className="w-12 mx-auto my-2 lg:w-1/12"
              whileHover={{ rotate: 10 }}
            />
            <h3 className="text-center font-bold font-poppins mt-2">
              {feature.title}
            </h3>
            <p className="text-center font-normal my-2 font-poppins lg:text-sm text-gray-600">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features;
