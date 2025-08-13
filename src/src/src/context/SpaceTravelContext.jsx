import { createContext, useState, useEffect } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";

export const SpaceTravelContext = createContext();

export function SpaceTravelProvider({ children }) {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSpacecrafts = async () => {
    setLoading(true);
    const res = await SpaceTravelApi.getSpacecrafts();
    if (!res.isError) setSpacecrafts(res.data);
    setLoading(false);
  };

  const fetchPlanets = async () => {
    setLoading(true);
    const res = await SpaceTravelApi.getPlanets();
    if (!res.isError) setPlanets(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSpacecrafts();
    fetchPlanets();
  }, []);

  return (
    <SpaceTravelContext.Provider value={{ spacecrafts, planets, loading, fetchSpacecrafts, fetchPlanets }}>
      {children}
    </SpaceTravelContext.Provider>
  );
}
