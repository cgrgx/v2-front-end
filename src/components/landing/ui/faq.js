import React, { useState } from "react";

const faqs = [
  {
    question: "Is lunch provided free of cost ?",
    answer:
      "Yes, it is, if you have a membership with us. Otherwise, it is charged as per the menu. Some limits do apply as to how much items can be included in your lunch. This limit is enough for any one person and merely exists to discourage abuse of the system.",
  },
  {
    question: "Do you have 2 Bedroom suites ?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "Are Wi-Fi costs included in the price ?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "Where can I reach you for support ?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

function Faq() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);
  const toggleQuestion = (questionIndex) => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };

  return (
    <div className="px-4 sm:px-8 lg:px-12">
      <div className="flex flex-col items-center">
        <h2 className="mb-4 text-center">FAQS</h2>
        <h3 className="w-full">You have Questions ?</h3>
        <p className="w-full text-center">
          And we have got answers to all of them. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>
      </div>
      <div className="mt-5 max-w-4xl relative">
        {faqs.map((faq, index) => (
          <div
            key={index}
            onClick={() => {
              toggleQuestion(index);
            }}
            className="cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300 group"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg lg:text-xl font-semibold">
                {faq.question}
              </span>
              <span
                className="ml-2 transition duration-300"
                variants={{
                  collapsed: { rotate: 0 },
                  open: { rotate: -180 },
                }}
                initial="collapsed"
                animate={activeQuestionIndex === index ? "open" : "collapsed"}
                transition={{
                  duration: 0.02,
                  ease: [0.04, 0.62, 0.23, 0.98],
                }}
              ></span>
            </div>
            <div
              className="pointer-events-none text-sm sm:text-base leading-relaxed"
              variants={{
                open: { opacity: 1, height: "auto", marginTop: "16px" },
                collapsed: { opacity: 0, height: 0, marginTop: "0px" },
              }}
              initial="collapsed"
              animate={activeQuestionIndex === index ? "open" : "collapsed"}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
