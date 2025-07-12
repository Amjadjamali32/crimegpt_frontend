import { Link } from "react-router-dom";
import { imagesPath } from "../../utils/Images.js";
import { motion } from "framer-motion";

const firstImage = imagesPath.find((img) => img.id === 9)?.url;
const secondImage = imagesPath.find((img) => img.id === 13)?.url;

const Content_section = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* First Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12"
      >
        <motion.div variants={item} className="order-2 lg:order-1">
          <img 
            src={firstImage} 
            alt="Community safety illustration" 
            className="w-full rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
          />
        </motion.div>

        <motion.div variants={item} className="order-1 lg:order-2 lg:pl-8">
          <h1 className="text-3xl md:text-4xl font-bold font-poppins text-gray-800 mb-4">
            Enhancing Community Safety Together
          </h1>
          <div className="w-16 h-1 bg-custom-teal mb-6"></div>
          <p className="text-gray-600 font-inter text-lg leading-relaxed mb-6">
            At the heart of our mission is the belief that a safer community is built through collaboration and technology. Our AI-powered crime reporting system empowers individuals to take an active role in improving public safety. By providing a secure, user-friendly platform, we make it easy for you to report incidents, share evidence, and stay informed about the safety of your neighborhood.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link 
              to="/about" 
              className="text-custom-teal font-poppins font-bold text-lg hover:opacity-80 transition-opacity"
            >
              Learn More →
            </Link>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Second Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="bg-custom-teal text-white rounded-xl overflow-hidden shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            variants={item}
            className="p-8 md:p-12 flex flex-col justify-center"
          >
            <h1 className="text-2xl md:text-3xl font-bold font-poppins mb-4">
              Uniting for Safety: Your Portal to Crime-Free Living
            </h1>
            <p className="text-white/90 font-inter text-lg mb-8">
              Insight into Neighborhood Security
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="self-start"
            >
              <Link 
                to="/login" 
                className="bg-white text-gray-800 rounded-full px-8 py-3 font-poppins font-medium shadow-md hover:bg-gray-100 transition-colors"
              >
                Report a Crime
              </Link>
            </motion.button>
          </motion.div>

          <motion.div 
            variants={item}
            className="flex justify-end items-end"
          >
            <img 
              src={secondImage} 
              alt="Safety portal illustration" 
              className="w-full h-full object-cover object-center max-h-96"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Content_section;