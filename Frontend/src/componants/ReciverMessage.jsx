

import React from "react";

const ReceiverMessage = ({ message, receiver }) => {
  return (
    <div className="flex w-full items-start gap-3 px-3 mb-4">

      {/* Receiver Avatar */}
      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden shadow-md border border-black/10">
        <img
          src={receiver?.image}
          alt="receiver"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Message Area */}
      <div className="flex flex-col items-start gap-2">

        {/* Text Message */}
        {message?.content && (
          <div
            className="
              w-fit
              max-w-[85%] sm:max-w-[70%] md:max-w-[60%] 
              lg:max-w-[450px]     /* 🔥 large screen width limit */
              bg-gray-300 text-black 
              px-4 py-2 rounded-2xl rounded-bl-none 
              shadow-md text-sm sm:text-base 
              break-words leading-relaxed
              animate-fadeIn
            "
          >
            {message.content}
          </div>
        )}

        {/* Image Message */}
        {message?.image && (
          <div
            className="
              w-32 sm:w-40 md:w-48 lg:w-56
              rounded-2xl overflow-hidden 
              shadow-md border border-black/10 
              animate-fadeIn
            "
          >
            <img
              src={message.image}
              alt="message"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiverMessage;
