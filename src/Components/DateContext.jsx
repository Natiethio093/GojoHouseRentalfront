import React, { createContext, useState } from 'react';

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  return (
    <DateContext.Provider value={{ checkInDate, setCheckInDate, checkOutDate, setCheckOutDate }}>
      {children}
    </DateContext.Provider>
  );
};