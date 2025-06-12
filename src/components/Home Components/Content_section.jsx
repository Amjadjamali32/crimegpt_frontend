import { Link } from "react-router-dom"
import { imagesPath } from "../../utils/Images.js"; 

const firstImage = imagesPath.find((img) => img.id === 9)?.url;
const secondImage = imagesPath.find((img) => img.id === 13)?.url;

const Content_section = () => {
  return (
    <>
        <div>
            <div className="md:flex lg:grid lg:grid-cols-2 lg:justify-center ">
                <div className="w-full">
                    <img src={firstImage} alt="image" className="w-11/12 mx-auto mt-2 rounded-sm md:my-4 lg:w-5/6 lg:mx-4" />
                </div>
                <div className="w-5/6 mx-auto">
                    <h1 className="font-poppins text-2xl font-extrabold my-2 mx-auto md:my-4 md:mx-2">Enhancing Community Safety Together</h1>
                    <p className="font-poppins text-sm font-normal md:my-6 md:mx-2 lg:text-md lg:my-2">At the heart of our mission is the belief that a safer community is built through collaboration and technology. Our AI-powered crime reporting system empowers individuals to take an active role in improving public safety. By providing a secure, user-friendly platform, we make it easy for you to report incidents, share evidence, and stay informed about the safety of your neighborhood.
                    Together, we can bridge the gap between citizens and law enforcement, fostering trust, transparen</p>
                    <button className="my-4 md:my-0 md:mx-2">
                        <Link to="/about" className="text-custom-teal font-poppins font-bold underline underline-offset-4 decoration-4 text-md hover:opacity-80">Learn More</Link>
                    </button>
                </div>
            </div>
            <div className="bg-custom-teal text-white pb-2 md:grid md:grid-cols-2 md:mx-4 md:p-4 md:rounded-sm md:my-4 lg:grid-cols-2 lg:justify-center lg:items-center lg:p-0 lg:my-0 lg:mb-4">
                 <div className="my-2 w-5/6 mx-auto text-center md:flex md:flex-col md:justify-center md:items-start lg:justify-start lg:items-start">
                    <h1 className="font-inter text-xl font-bold py-4 lg:text-2xl lg:text-left lg:my-4 md:text-left">Uniting for Safety: Your Portal to Crime-Free Living</h1>
                    <p className="font-poppins text-sm">Insight into Neighborhood Security</p>
                    <button className="bg-white rounded-full shadow-lg border border-black text-black px-6 py-1 font-poppins font-medium my-4 hover:bg-custom-teal hover:text-white md:w-3/6 md:my-6 lg:w-3/6">
                        <Link to="/login">Report a Crime</Link>
                    </button>
                </div>
                <div className="flex md:items-end text-right md:justify-end">
                    <img src={secondImage} alt="image" className="mx-auto w-11/12 rounded-sm md:w-full lg:w-3/6 lg:mx-2 md:self-end"/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Content_section
