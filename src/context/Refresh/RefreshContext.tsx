import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  FAST_INTERVAL,
  MEDIUM_INTERVAL,
  SLOW_INTERVAL,
} from "../../constants/intervals.ts";

const RefreshContext = React.createContext({
  slowRefresh: 0,
  mediumRefresh: 0,
  fastRefresh: 0,
});

const RefreshProvider = ({ children }: PropsWithChildren) => {
  const [slowRefresh, setSlowRefresh] = useState(1);
  const [fastRefresh, setFastRefresh] = useState(1);
  const [mediumRefresh, setMediumRefresh] = useState(1);

  useEffect(() => {
    const interval = setInterval(async () => {
      setFastRefresh((prev) => prev + 1);
    }, FAST_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      setMediumRefresh((prev) => prev + 1);
    }, MEDIUM_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      setSlowRefresh((prev) => prev + 1);
    }, SLOW_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <RefreshContext.Provider
      value={{ slowRefresh, mediumRefresh, fastRefresh }}
    >
      {children}
    </RefreshContext.Provider>
  );
};

export { RefreshContext, RefreshProvider };
