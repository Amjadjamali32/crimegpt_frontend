import { motion } from "framer-motion";
import { FaShieldAlt, FaRobot, FaUsers } from "react-icons/fa";
import { imagesPath } from "../utils/Images.js";

const aboutImage = imagesPath.find((img) => img.id === 5)?.url;
const robot = imagesPath.find((img) => img.id === 12)?.url;
const secondCommunity = imagesPath.find((img) => img.id === 8)?.url;

const About = () => {
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

  const featureCard = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="pt-12 sm:pt-14 lg:pt-16"
    >
      {/* Hero Section */}
      <motion.section
        variants={item}
        className="bg-custom-teal text-white py-12 md:py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            variants={item}
            className="text-3xl md:text-4xl font-bold font-poppins mb-6"
          >
            About Us
          </motion.h1>
          <motion.p
            variants={item}
            className="text-lg md:text-sm font-poppins leading-relaxed max-w-3xl mx-auto"
          >
            We envision a world where reporting crimes is effortless, empowering
            citizens to contribute to a safer and more transparent society.
            Through innovation and technology, we aim to bridge the gap between
            communities and law enforcement.
          </motion.p>
        </div>
      </motion.section>

      {/* What We Do Section */}
      <motion.section
        variants={container}
        className="py-12 md:py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={item} className="lg:order-2">
            <img
              src={aboutImage}
              alt="Crime monitoring solutions"
              className="w-full rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </motion.div>

          <motion.div variants={item} className="lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
              What <span className="text-custom-teal">We Do?</span>
            </h2>
            <div className="w-16 h-1 bg-custom-teal mb-6"></div>
            <p className="text-lg text-gray-700 font-poppins mb-6 leading-relaxed">
              We deliver advanced monitoring solutions for comprehensive crime
              management. Our platform empowers communities with crime data
              insights, enabling proactive crime complaints and responses. Stay
              ahead of threats and protect your community.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Crime-GPT Section */}
      <motion.section
        variants={container}
        className="py-12 md:py-10 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={item}>
              <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
                What <span className="text-custom-teal">Crime-GPT</span> Does?
              </h2>
              <div className="w-16 h-1 bg-custom-teal mb-6"></div>
              <p className="text-lg text-gray-700 font-poppins mb-4">
                Crime-GPT provides a user-friendly and secure platform to:
              </p>
              <ul className="space-y-4">
                <motion.li variants={item} className="flex items-start">
                  <span className="text-custom-teal mr-3 mt-1">•</span>
                  <span className="text-gray-700 font-poppins">
                    Report crimes quickly and anonymously.
                  </span>
                </motion.li>
                <motion.li variants={item} className="flex items-start">
                  <span className="text-custom-teal mr-3 mt-1">•</span>
                  <span className="text-gray-700 font-poppins">
                    Upload images or evidence with AI-powered classification for
                    accurate insights.
                  </span>
                </motion.li>
                <motion.li variants={item} className="flex items-start">
                  <span className="text-custom-teal mr-3 mt-1">•</span>
                  <span className="text-gray-700 font-poppins">
                    Generate detailed crime reports automatically using Natural
                    Language Processing (NLP).
                  </span>
                </motion.li>
                <motion.li variants={item} className="flex items-start">
                  <span className="text-custom-teal mr-3 mt-1">•</span>
                  <span className="text-gray-700 font-poppins">
                    Analyze patterns and trends to assist law enforcement and
                    policy makers in proactive decision-making.
                  </span>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div
              variants={item}
              className="flex justify-center lg:justify-end"
            >
              <img
                src={robot}
                alt="Crime-GPT AI illustration"
                className="w-full max-w-md rounded-lg hover:shadow-2xl transition-shadow duration-300"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        variants={container}
        className="py-12 md:py-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={item}
            className="text-3xl md:text-4xl font-bold font-poppins text-center mb-12"
          >
            Why Choose Us?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-inter">
            {/* Feature 1 */}
            <motion.div
              variants={featureCard}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-custom-teal text-4xl mb-4">
                <FaShieldAlt className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold font-poppins text-center mb-3">
                Secure & Confidential
              </h3>
              <p className="text-gray-600 text-center">
                Your reports are protected with end-to-end encryption and robust
                security measures to ensure complete confidentiality.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={featureCard}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-custom-teal text-4xl mb-4">
                <FaRobot className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold font-poppins text-center mb-3">
                AI-Powered Efficiency
              </h3>
              <p className="text-gray-600 text-center">
                Our cutting-edge AI technology simplifies reporting and provides
                intelligent analysis for faster response times.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={featureCard}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-custom-teal text-4xl mb-4">
                <FaUsers className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold font-poppins text-center mb-3">
                Community-Oriented
              </h3>
              <p className="text-gray-600 text-center">
                Designed to strengthen trust and collaboration between citizens
                and law enforcement for safer neighborhoods.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={container}
        className="py-12 md:py-10 text-gray-600"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            variants={item}
            className="text-3xl md:text-4xl font-bold font-poppins mb-6"
          >
            Join Us in Building{" "}
            <span className="text-white">Safer Communities</span>
          </motion.h2>

          <motion.p
            variants={item}
            className="text-md mb-8 max-w-3xl mx-auto font-inter"
          >
            Crime-GPT is more than just a reporting system. It's a movement
            toward a safer, smarter, and more connected society. Together, we
            can make a difference.
          </motion.p>

          <motion.div variants={item} className="flex justify-center">
            <img
              src={secondCommunity}
              alt="Community coming together"
              className="w-full max-w-2xl rounded-lg shadow-2xl mb-8"
            />
          </motion.div>

          <motion.p variants={item} className="text-xl font-medium">
            Let's take the first step towards creating a safer tomorrow.
          </motion.p>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default About;
