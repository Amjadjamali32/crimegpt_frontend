import icon from "../assets/icons/icon.png"
import connection from "../assets/icons/connection.png"

import { imagesPath } from "../utils/Images.js"; 
const aboutImage = imagesPath.find((img) => img.id === 5)?.url;
const robot = imagesPath.find((img) => img.id === 12)?.url;
const secondCommunity = imagesPath.find((img) => img.id === 8)?.url;

const About = () => {
  return (
    <>
        <div className="pt-12 sm:pt-14 lg:pt-16">
                <section className="bg-custom-teal text-white"> 
                    <div className="p-3 text-center">
                        <h1 className="font-poppins font-extrabold text-2xl py-4 text-center">About Us</h1>
                        <p className="font-poppins font-normal sm:text-sm md:pb-5 lg:text-center">We envision a world where reporting crimes is effortless, empowering citizens to contribute to a safer and more transparent society. Through innovation and technology, we aim to bridge the gap between communities and law enforcement.
                        </p>
                    </div>
                </section>
                <section>
                    <div className="md:grid md:grid-cols-2 md:justify-center md:items-center">
                        <div className="font-poppins font-extrabold text-2xl my-3 text-start md:items-center md:justify-center md:flex relative md:-top-48 md:-left-9 mx-auto">
                            <p className="mx-auto ml-20">
                                What <span className="text-custom-teal underline underline-offset-4 decoration-4">We Do?</span>
                            </p>
                        </div>
                        <div className="p-2 text-center text-custom-teal sm:my-4 ">
                            <p className="font-poppins font-medium sm:mx-4 sm:mb-4 md:text-left">
                                We deliver advanced monitoring solutions for comprehensive crime management. Our platform empowers communities with crime data insights, enabling proactive crime complaints and responses. Stay ahead of threats and protect your community.
                            </p>
                            <img
                                src={aboutImage}
                                alt="image"
                                className="w-full rounded-sm my-3 mx-auto sm:w-5/6 md:mx-4 lg:4/6"
                            />
                        </div>
                    </div>
                </section>
                <section>
                    <div className="sm:grid sm:grid-cols-2 sm:justify-center sm:items-center">
                        <div className="p-4 sm:mx-auto sm:p-8">
                            <h2 className="font-bold font-poppins text-2xl text-center mb-4 sm:text-left md:mt-0 lg:my-8">What <span className="text-custom-teal">Crime-GPT</span> Do?</h2>
                            <p className="font-poppins font-medium">Crime-GPT provides a user-friendly and secure platform to:</p>
                            <ul className="list-disc pl-5 marker:text-custom-teal font-poppins font-medium">
                                <li>Report crimes quickly and anonymously.</li>
                                <li>Upload images or evidence with AI-powered classification for accurate insights.
                                </li>
                                <li>Generate detailed crime reports automatically using Natural Language Processing (NLP).
                                </li>
                                <li>
                                    Analyze patterns and trends to assist law enforcement and policy makers in proactive decision-making.
                                </li>
                            </ul>
                        </div>
                        <div className="sm:flex sm:justify-end">
                            <img src={robot} alt="image" className="mx-auto my-2 sm:w-5/6 sm:mx-2 md:w-4/6 lg:w-3/6" />
                        </div>
                    </div>
                </section>
                <section>
                    <div>
                    <h2 className="font-poppins font-extrabold text-2xl text-center my-6 md:my-4 lg:my-8">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 sm:justify-center sm:items-center">
                        <div className="w-11/12 sm:w-5/6 lg:w-4/5 bg-custom-gray rounded-sm shadow-lg text-center mx-auto p-4 sm:p-5 sm:py-6 md:py-6">
                            <p className="items-center text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={35} className="fill-custom-teal mx-auto">
                                    <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8l0 378.1C394 378 431.1 230.1 432 141.4L256 66.8s0 0 0 0z"/>
                                </svg>
                            </p>
                            <h2 className="font-poppins font-semibold text-md text-center my-2">Secure & Confidential</h2>
                            <p className="font-poppins text-center md:text-sm">Your reports are protected with robust security measures.</p>
                        </div>
                        <div className="w-11/12 sm:w-5/6 lg:w-4/5 bg-custom-gray rounded-sm shadow-lg text-center mx-auto p-4 sm:p-5">
                            <p>
                                <img src={connection} alt="icon" className="w-2/12 mx-auto sm:w-2/12" />
                            </p>
                            <h2 className="font-poppins font-semibold text-md text-center my-2">AI-Powered Efficiency</h2>
                            <p className="font-poppins text-center md:text-sm">Cutting-edge AI simplifies reporting and analysis.</p>
                        </div>
                        <div className="w-11/12 sm:w-5/6 lg:w-4/5 bg-custom-gray rounded-sm shadow-lg text-center mx-auto p-4 sm:py-3 md:py-2">
                            <p>
                                <img src={icon} alt="icon" className="w-2/12 mx-auto" />
                            </p>
                            <h2 className="font-poppins font-semibold text-md text-center my-2">Community-Oriented</h2>
                            <p className="font-poppins text-center md:text-sm">Designed to strengthen trust and collaboration between citizens and law enforcement.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="p-3">
                        <h2 className="font-poppins font-extrabold text-center text-2xl sm:text-3xl my-3 md:text-xl md:my-6 lg:text-2xl">
                            <span className="text-custom-teal">Join Us</span> in Building Safer Communities
                        </h2>
                        <p className="font-inter text-center font-medium text-sm sm:text-base lg:text-sm">
                            Crime-GPT is more than just a reporting system. It's a movement toward a safer, smarter, and more connected society. Together, we can make a difference.
                        </p>
                    </div>
                    <div>
                        <img
                            src={secondCommunity}
                            alt="Community"
                            className="w-full h-auto mx-auto my-4 rounded-lg shadow-lg md:w-3/6"
                        />
                        <p className="font-inter font-medium text-center text-sm sm:text-base lg:text-sm my-2 p-2 md:text-sm">
                            Let’s take the first step towards creating a safer tomorrow.
                        </p>
                    </div>
                </div>
            </section>           
        </div>
    </>
  )
}

export default About
