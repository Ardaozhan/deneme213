import React, { createContext, useContext, useState } from 'react';

// Context oluşturma
const DataContext = createContext();

// useData custom hook
export const useData = () => useContext(DataContext);

// DataProvider bileşeni
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get('https://api.example.com/data');
    setData(response.data);
  };

  return (
    <DataContext.Provider value={{ data, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
