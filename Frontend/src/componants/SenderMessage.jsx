

import React, { useContext } from "react";
import { Contextt } from "../Context/AppContext";

const SenderMessage = ({ message }) => {
  const { user } = useContext(Contextt);

  return (
    <div className="flex w-full items-end justify-end gap-3 px-3 mb-4">

      <div className="flex flex-col items-end gap-2">

        {message?.content && (
          <div
            className="
              w-fit
              max-w-[85%] sm:max-w-[70%] md:max-w-[60%]
              lg:max-w-[450px]     /* 💯 Large width me limit */
              bg-blue-600 text-white 
              px-4 py-2 rounded-2xl rounded-br-none 
              shadow-md text-sm sm:text-base 
              break-words leading-relaxed
              animate-fadeIn border border-white/20
            "
          >
            {message.content}
          </div>
        )}

        {message?.image && (
          <div
            className="
              w-36 sm:w-44 md:w-52 lg:w-60
              rounded-2xl overflow-hidden
              shadow-md border border-white/10
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

      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden shadow-md border border-white/20">
        <img
          src={user?.image}
          alt="sender"
          className="h-full w-full object-cover"
        />
      </div>

    </div>
  );
};

export default SenderMessage;
