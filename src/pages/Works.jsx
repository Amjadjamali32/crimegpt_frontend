import { imagesPath } from "../utils/Images.js"; 
const communityImage = imagesPath.find((img) => img.id === 7)?.url;

const Works = () => {
  return (
    <>
      <div className="pt-16 sm:pt-20 md:pt-24">
        <div className="">
          <h2 className="font-poppins font-extrabold text-center text-2xl underline decoration-4 text-custom-teal">
            <span className="text-black">How it</span> Works?
          </h2>
          <p className="font-inter font-medium my-4 text-center md:text-sm">
            Discover how to effectively use our portal to report crimes, respond
            to incidents, and access valuable crime statistics in Nawabshah
          </p>
          <div className="sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            <div className="w-4/6 mx-auto my-2 sm:p-4 sm:text-center lg:my-3">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-custom-teal mx-auto"
                  viewBox="0 0 448 512"
                  width={20}
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>
              </p>
              <h2 className="font-poppins text-center font-semibold mt-2">
                Register or Login
              </h2>
              <p className="text-center font-poppins md:text-sm">
                Create an account or log in to access our features
              </p>
            </div>
            <div className="w-4/6 mx-auto my-4 sm:p-3 sm:my-0 sm:text-center lg:my-3">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-custom-teal mx-auto"
                  viewBox="0 0 384 512"
                  width={20}
                >
                  <path d="M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z" />
                </svg>
              </p>
              <h2 className="font-poppins text-center font-semibold mt-2">
                Report Crime
              </h2>
              <p className="text-center font-poppins md:text-sm">
                Easily register your complaint and report crimes through our
                intuitive interface using AI.
              </p>
            </div>
            <div className="w-4/6 mx-auto my-4 sm:p-4 sm:text-center">
              <p>
                <svg
                  className="fill-custom-teal mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={20}
                >
                  <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                </svg>
              </p>
              <h2 className="font-poppins text-center font-semibold mt-2">
                Response to Crimes
              </h2>
              <p className="text-center font-poppins md:text-sm">
                Engage with the community by responding to crime reports and
                sharing information.
              </p>
            </div>
            <div className="w-4/6 mx-auto my-4 sm:p-4 sm:text-center lg:my-4">
              <p>
                <svg
                  className="fill-custom-teal mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={20}
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
              </p>
              <h2 className="font-poppins text-center font-semibold mt-2">
                View Crime Statistics
              </h2>
              <p className="text-center font-poppins md:text-sm">
                Access detailed crime statistics and insights specific to
                Nawabshah.
              </p>
            </div>
          </div>
          <div className="relative">
            <img src={communityImage} alt="image" className="w-full mx-auto" />
            <h2 className="absolute inset-0 flex items-center justify-center font-poppins font-extrabold text-center text-xl text-white mx-2 md:text-3xl lg:text-4xl">
              Good Life Begins With A Safe Community
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Works;
