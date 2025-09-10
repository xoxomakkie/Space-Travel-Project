import React, { createContext, useContext, useState, useEffect } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi.js';

const SpaceTravelContext = createContext();

export const useSpaceTravel = () => {
  const context = useContext(SpaceTravelContext);
  if (!context) {
    throw new Error('useSpaceTravel must be used within a SpaceTravelProvider');
  }
  return context;
};

export const SpaceTravelProvider = ({ children }) => {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSpacecrafts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await SpaceTravelApi.getSpacecrafts();
      if (response.isError) {
        throw new Error('Failed to fetch spacecrafts');
      }
      setSpacecrafts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlanets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await SpaceTravelApi.getPlanets();
      if (response.isError) {
        throw new Error('Failed to fetch planets');
      }
      setPlanets(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSpacecraftById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await SpaceTravelApi.getSpacecraftById({ id });
      if (response.isError) {
        throw new Error('Failed to fetch spacecraft');
      }
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const buildSpacecraft = async (spacecraftData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await SpaceTravelApi.buildSpacecraft(spacecraftData);
      if (response.isError) {
        throw new Error('Failed to build spacecraft');
      }
      await fetchSpacecrafts();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const destroySpacecraft = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await SpaceTravelApi.destroySpacecraftById({ id });
      if (response.isError) {
        throw new Error('Failed to destroy spacecraft');
      }
      await fetchSpacecrafts();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const sendSpacecraftToPlanet = async (spacecraftId, targetPlanetId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await SpaceTravelApi.sendSpacecraftToPlanet({ spacecraftId, targetPlanetId });
      if (response.isError) {
        throw new Error(response.data?.message || 'Failed to send spacecraft');
      }
      await Promise.all([fetchSpacecrafts(), fetchPlanets()]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpacecrafts();
    fetchPlanets();
  }, []);

  const value = {
    spacecrafts,
    planets,
    loading,
    error,
    fetchSpacecrafts,
    fetchPlanets,
    getSpacecraftById,
    buildSpacecraft,
    destroySpacecraft,
    sendSpacecraftToPlanet,
    setError
  };

  return (
    <SpaceTravelContext.Provider value={value}>
      {children}
    </SpaceTravelContext.Provider>
  );
};
