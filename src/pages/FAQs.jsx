import { useState } from "react";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="pt-16 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-20">
        <h2 className="font-poppins font-extrabold text-center my-3 text-custom-teal text-2xl mx-2">
          Frequently Asked Questions ?
        </h2>
        <div id="accordion-open" data-accordion="open" className="my-4">
          <h2 id="accordion-open-heading-1">
            <button
              type="button"
              className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right gap-3 ${
                openIndex === 1 ? "bg-custom-gray" : "hover:bg-custom-gray"
              } border-0 sm:w-9/12 sm:mx-auto`}
              onClick={() => handleToggle(1)}
              aria-expanded={openIndex === 1}
              aria-controls="accordion-open-body-1"
            >
              <span className="flex items-center font-poppins">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={24}
                  className="mx-6 fill-custom-teal flex-shrink-0"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                What is Crime-GPT?
              </span>
              <svg
                className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                  openIndex === 1 ? "rotate-180" : ""
                }`}
                data-accordion-icon
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-open-body-1"
            className={`${openIndex === 1 ? "block" : "hidden"}`}
            aria-labelledby="accordion-open-heading-1"
          >
            <div className="p-6 text-center sm:text-left sm:w-9/12 mx-auto">
              <p className="mb-2 text-custom-teal font-poppins lg:text-sm">
                CrimeGPT is an AI-powered crime reporting system that generates
                detailed reports based on user prompts, categorizes crimes, and
                allows users to submit multimedia evidence. It is built using
                the MERN stack with advanced generative AI models like Llama 3.0
                70B.
              </p>
            </div>
          </div>

          <h2 id="accordion-open-heading-2">
            <button
              type="button"
              className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right gap-3 ${
                openIndex === 2 ? "bg-custom-gray" : "hover:bg-custom-gray"
              } border-0 sm:w-9/12 sm:mx-auto`}
              onClick={() => handleToggle(2)}
              aria-expanded={openIndex === 2}
              aria-controls="accordion-open-body-2"
            >
              <span className="flex items-center font-poppins">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={24}
                  className="mx-6 fill-custom-teal flex-shrink-0"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Who can use Crime-GPT?
              </span>
              <svg
                className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                  openIndex === 2 ? "rotate-180" : ""
                }`}
                data-accordion-icon
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-open-body-2"
            className={`${openIndex === 2 ? "block" : "hidden"}`}
            aria-labelledby="accordion-open-heading-2"
          >
            <div className="p-5 text-center sm:text-left sm:w-9/12 mx-auto">
              <p className="mb-2 text-custom-teal font-poppins lg:text-sm">
                Anyone who needs to report a crime can use CrimeGPT, including
                individuals, organizations, and communities seeking a
                streamlined reporting process.
              </p>
            </div>
          </div>

          <h2 id="accordion-open-heading-3">
            <button
              type="button"
              className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right gap-3 ${
                openIndex === 3 ? "bg-custom-gray" : "hover:bg-custom-gray"
              } border-0 sm:w-9/12 sm:mx-auto`}
              onClick={() => handleToggle(3)}
              aria-expanded={openIndex === 3}
              aria-controls="accordion-open-body-3"
            >
              <span className="flex items-center font-poppins text-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={24}
                  className="mx-6 fill-custom-teal flex-shrink-0"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Will my personal details be shared with law enforcement?
              </span>
              <svg
                className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                  openIndex === 3 ? "rotate-180" : ""
                }`}
                data-accordion-icon
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-open-body-3"
            className={`${openIndex === 3 ? "block" : "hidden"}`}
            aria-labelledby="accordion-open-heading-3"
          >
            <div className="p-5 text-center sm:text-left sm:w-9/12 mx-auto">
              <p className="mb-2 text-custom-teal font-poppins lg:text-sm">
                Your personal details will only be shared with law enforcement
                agencies when necessary and in compliance with legal protocols.
              </p>
            </div>
          </div>

          <h2 id="accordion-open-heading-4">
            <button
              type="button"
              className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right gap-3 ${
                openIndex === 4 ? "bg-custom-gray" : "hover:bg-custom-gray"
              } border-0 sm:w-9/12 sm:mx-auto`}
              onClick={() => handleToggle(4)}
              aria-expanded={openIndex === 4}
              aria-controls="accordion-open-body-4"
            >
              <span className="flex items-center font-poppins">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={24}
                  className="mx-6 fill-custom-teal flex-shrink-0"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                How do I report a crime?
              </span>
              <svg
                className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                  openIndex === 4 ? "rotate-180" : ""
                }`}
                data-accordion-icon
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-open-body-4"
            className={`${openIndex === 4 ? "block" : "hidden"}`}
            aria-labelledby="accordion-open-heading-3"
          >
            <div className="p-5 text-center sm:text-left sm:w-9/12 mx-auto">
              <p className="mb-2 text-custom-teal font-poppins lg:text-sm">
                Simply provide details about the incident through our
                prompt-based input system, attach any supporting evidence, and
                submit the report.
              </p>
            </div>
          </div>

          <h2 id="accordion-open-heading-5">
            <button
              type="button"
              className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right gap-3 ${
                openIndex === 5 ? "bg-custom-gray" : "hover:bg-custom-gray"
              } border-0 sm:w-9/12 sm:mx-auto`}
              onClick={() => handleToggle(5)}
              aria-expanded={openIndex === 5}
              aria-controls="accordion-open-body-5"
            >
              <span className="flex items-center font-poppins">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={24}
                  className="mx-6 fill-custom-teal flex-shrink-0"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                What types of crimes can I report?
              </span>
              <svg
                className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                  openIndex === 5 ? "rotate-180" : ""
                }`}
                data-accordion-icon
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-open-body-5"
            className={`${openIndex === 5 ? "block" : "hidden"}`}
            aria-labelledby="accordion-open-heading-3"
          >
            <div className="p-5 text-center sm:text-left sm:w-9/12 mx-auto">
              <p className="mb-2 text-custom-teal font-poppins lg:text-sm">
                You can report a wide range of crimes, including theft,
                harassment, fraud, and more. CrimeGPT uses AI to classify crimes
                into appropriate categories.
              </p>
            </div>
          </div>

          <h2 id="accordion-open-heading-6">
            <button
              type="button"
              className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right gap-3 ${
                openIndex === 6 ? "bg-custom-gray" : "hover:bg-custom-gray"
              } border-0 sm:w-9/12 sm:mx-auto`}
              onClick={() => handleToggle(6)}
              aria-expanded={openIndex === 6}
              aria-controls="accordion-open-body-6"
            >
              <span className="flex items-center font-poppins text-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={24}
                  className="mx-6 fill-custom-teal flex-shrink-0"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                How does Crime-GPT work with law enforcement?
              </span>
              <svg
                className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                  openIndex === 6 ? "rotate-180" : ""
                }`}
                data-accordion-icon
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-open-body-6"
            className={`${openIndex === 6 ? "block" : "hidden"}`}
            aria-labelledby="accordion-open-heading-3"
          >
            <div className="p-5 font-poppins text-center sm:text-left sm:w-9/12 mx-auto">
              <p className="mb-2 text-custom-teal font-poppins lg:text-sm">
                CrimeGPT assists law enforcement by generating structured crime
                reports and categorizing incidents, making it easier for
                agencies to take appropriate action.
              </p>
            </div>
          </div>

          <h2 id="accordion-open-heading-7">
            <button
              type="button"
              className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right gap-3 ${
                openIndex === 7 ? "bg-custom-gray" : "hover:bg-custom-gray"
              } border-0 sm:w-9/12 sm:mx-auto`}
              onClick={() => handleToggle(7)}
              aria-expanded={openIndex === 7}
              aria-controls="accordion-open-body-7"
            >
              <span className="flex items-center font-poppins">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={24}
                  className="mx-6 fill-custom-teal flex-shrink-0"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Can I track the status of my report?
              </span>
              <svg
                className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                  openIndex === 7 ? "rotate-180" : ""
                }`}
                data-accordion-icon
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-open-body-7"
            className={`${openIndex === 7 ? "block" : "hidden"}`}
            aria-labelledby="accordion-open-heading-3"
          >
            <div className="p-5 font-poppins text-center sm:text-left sm:w-9/12 mx-auto">
              <p className="mb-2 text-custom-teal lg:text-sm">
                Yes, you can track the status of your report through your
                account dashboard, where updates are regularly provided.
              </p>
            </div>
          </div>

          <h2 id="accordion-open-heading-8">
            <button
              type="button"
              className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right gap-3 ${
                openIndex === 8 ? "bg-custom-gray" : "hover:bg-custom-gray"
              } border-0 sm:w-9/12 sm:mx-auto`}
              onClick={() => handleToggle(8)}
              aria-expanded={openIndex === 8}
              aria-controls="accordion-open-body-8"
            >
              <span className="flex items-center font-poppins text-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={24}
                  className="mx-6 fill-custom-teal flex-shrink-0"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Why am I not receiving confirmation for my report?
              </span>
              <svg
                className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                  openIndex === 8 ? "rotate-180" : ""
                }`}
                data-accordion-icon
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-open-body-8"
            className={`${openIndex === 8 ? "block" : "hidden"}`}
            aria-labelledby="accordion-open-heading-8"
          >
            <div className="p-5 font-poppins text-center sm:text-left sm:w-9/12 mx-auto">
              <p className="mb-2 text-custom-teal lg:text-sm">
                Ensure that the email address or contact information you
                provided is correct. Check your spam or junk folder for
                confirmation emails.
              </p>
            </div>
          </div>

          <h2 id="accordion-open-heading-9">
            <button
              type="button"
              className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right gap-3 ${
                openIndex === 9 ? "bg-custom-gray" : "hover:bg-custom-gray"
              } border-0 sm:w-9/12 sm:mx-auto`}
              onClick={() => handleToggle(9)}
              aria-expanded={openIndex === 9}
              aria-controls="accordion-open-body-9"
            >
              <span className="flex items-center font-poppins text-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={24}
                  className="mx-6 fill-custom-teal flex-shrink-0"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                I’m having trouble uploading an image. What should I do?
              </span>
              <svg
                className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                  openIndex === 9 ? "rotate-180" : ""
                }`}
                data-accordion-icon
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-open-body-9"
            className={`${openIndex === 9 ? "block" : "hidden"}`}
            aria-labelledby="accordion-open-heading-9"
          >
            <div className="p-5 font-poppins text-center sm:text-left sm:w-9/12 mx-auto">
              <p className="mb-2 text-custom-teal lg:text-sm">
                Verify the file format and size of the image. CrimeGPT supports
                common formats like JPEG, PNG, and GIF, with a size limit of
                5MB. If the issue persists, contact support.
              </p>
            </div>
          </div>

          <h2 id="accordion-open-heading-10">
            <button
              type="button"
              className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right gap-3 ${
                openIndex === 19 ? "bg-custom-gray" : "hover:bg-custom-gray"
              } border-0 sm:w-9/12 sm:mx-auto`}
              onClick={() => handleToggle(10)}
              aria-expanded={openIndex === 10}
              aria-controls="accordion-open-body-10"
            >
              <span className="flex items-center font-poppins">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={24}
                  className="mx-6 fill-custom-teal flex-shrink-0"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Can I report a crime anonymously?
              </span>
              <svg
                className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                  openIndex === 10 ? "rotate-180" : ""
                }`}
                data-accordion-icon
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-open-body-10"
            className={`${openIndex === 10 ? "block" : "hidden"}`}
            aria-labelledby="accordion-open-heading-3"
          >
            <div className="p-5 font-poppins text-center sm:text-left sm:w-9/12 mx-auto">
              <p className="mb-2 text-custom-teal lg:text-sm">
                No, first you have to be registered on our system make sure your
                identity will be kept secret.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQs;
