import GIF from "../../assets/images/ai robot.gif";
import { Typed } from "react-typed";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom"

const Hero = () => {
  const el = useRef(null); 

  useEffect(() => {
    const options = {
      strings: ["Welcome to Crime-GPT", "A Crime reporting system", "Report crimes Instantly", "Get automated crime reports", "Share evidence securely"],
      typeSpeed: 120,
      backSpeed: 50,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
      // showCursor: false
    };

    const typed = new Typed(el.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center md:space-x-6">
        <div className="w-full md:w-6/12 flex justify-center mb-6 md:mb-0 md:order-2">
          <img
            src={GIF}
            alt="ai robot"
            className="w-full max-w-xs md:w-4/6 h-auto "
          />
        </div>

        <div className="w-full md:w-6/12 text-center md:text-left p-2">
          <h1 ref={el} className="text-custom-teal font-extrabold text-2xl inline-block mb-2 font-poppins md:mt-4"></h1> 
          <h3 className="font-poppins font-semibold text-xl my-2">Revolutionizing Crime Reporting with AI</h3>
          <p className="mb-4 font-poppins font-md text-md text-gray-600">
            At Crime GPT, we believe in a safer world where every voice matters. Our platform allows individuals to report crimes, share evidence, and receive automated crime reports—all while maintaining anonymity. With the power of Artificial Intelligence (AI) and Natural Language Processing (NLP), Crime GPT simplifies the crime reporting process, making it faster, more efficient, and accessible to everyone.
          </p>
          <div className="flex flex-col items-center justify-center sm:flex-row">
            <button className="bg-custom-teal text-white rounded-full px-4 py-2 shadow-lg w-full border border-black font-inter font-normal hover:bg-blue-900 lg:w-3/6">
              <Link to="/register">Get Started</Link>
            </button>
            <button className="bg-white text-custom-teal rounded-full px-4 py-2 shadow-lg w-full my-2 border border-black font-inter font-normal hover:bg-custom-teal hover:text-white sm:mx-2 lg:w-3/6">
              <Link to="/about">Learn More</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
