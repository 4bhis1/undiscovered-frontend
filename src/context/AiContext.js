// src/contexts/MyContext.js
import React, {createContext, useState} from 'react';

// Create the context
export const AiContext = createContext();

// Create the provider component
export const AiProvider = ({children}) => {
  const [aidata, updateAiData] = useState({});
  const [isBotClose, setIsBotClose] = useState(false);

  return (
    <AiContext.Provider
      value={{aidata, updateAiData, isBotClose, setIsBotClose}}>
      {children}
    </AiContext.Provider>
  );
};
