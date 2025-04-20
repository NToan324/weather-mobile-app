import { createContext, useState } from "react";

const WeatherContext = createContext({
  isLoading: false,
  setIsLoading: (_: boolean) => {},
});

const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <WeatherContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherProvider };
