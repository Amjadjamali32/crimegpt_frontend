import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

const Contact = () => {
  return (
    <>
      <div className="pt-16 sm:pt-20 md:pt-24">
        <div>
          <h2 className="font-extrabold font-poppins text-center text-custom-teal underline decoration-4 text-2xl mb-4">
            Contact Us
          </h2>
          <h2 className="font-poppins font-bold text-center mx-2">
            Connect with Us Stay Informed, Stay Safe
          </h2>
          <p className="font-poppins text-center text-sm my-2 md:my-6">
            For immediate assistance or to report a crime, please use our online
            portal.
          </p>
        </div>
        <div>
          <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:mx-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
            <div className="my-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto fill-custom-teal"
                viewBox="0 0 512 512"
                width={20}
              >
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
              </svg>
              <p className="font-inter text-center font-medium my-2">
                +92 3262600358
              </p>
            </div>
            <div className="my-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto fill-custom-teal"
                viewBox="0 0 512 512"
                width={20}
              >
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
              </svg>
              <p className="font-inter text-center font-medium my-2">24/7</p>
            </div>
            <div className="my-4 text-center md:mt-3">
              <AccessTimeFilledIcon className=" fill-custom-teal text-custom-teal mx-auto" />
              <p className="font-inter text-center font-medium my-2">
                support@crimegpt.com
              </p>
            </div>
            <div className="my-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="mx-auto fill-custom-teal"
                width={20}
              >
                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
              </svg>
              <p className="font-inter text-center font-medium my-2">
                Nawabshah, Sindh, Pakistan
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto rounded-sm sm:w-full md:mx-auto h-96 my-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d66650.79897958136!2d68.3206359207878!3d26.24327517874241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394a4cb563f028e5%3A0x93d25e06c0ec002d!2sNawabshah%2C%20Shaheed%20Benazirabad%2C%20Sindh%2C%20Pakistan!5e1!3m2!1sen!2s!4v1735495777781!5m2!1sen!2s"
            style={{
              width: "90%",
              height: "90%",
            }}
            className="rounded-sm mx-auto my-6"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;
