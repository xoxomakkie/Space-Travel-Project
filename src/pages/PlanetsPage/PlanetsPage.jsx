import { useState } from 'react';
import { useSpaceTravel } from '../../context/SpaceTravelContext.jsx';
import styles from './PlanetsPage.module.css';

const PlanetsPage = () => {
  const { planets, spacecrafts, sendSpacecraftToPlanet, error } = useSpaceTravel();
  const [selectedSpacecraft, setSelectedSpacecraft] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendSpacecraft = async (e) => {
    e.preventDefault();
    
    if (!selectedSpacecraft || !selectedPlanet) {
      return;
    }

    const spacecraft = spacecrafts.find(s => s.id === selectedSpacecraft);
    const targetPlanetId = parseInt(selectedPlanet);

    if (spacecraft.currentLocation === targetPlanetId) {
      alert('The spacecraft is already on this planet!');
      return;
    }

    setIsSending(true);
    const success = await sendSpacecraftToPlanet(selectedSpacecraft, targetPlanetId);
    
    if (success) {
      setSelectedSpacecraft('');
      setSelectedPlanet('');
      alert('Spacecraft sent successfully!');
    }
    
    setIsSending(false);
  };

  const getSpacecraftsOnPlanet = (planetId) => {
    return spacecrafts.filter(s => s.currentLocation === planetId);
  };

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error loading planets: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.planets}>
      <h1 className={styles.planets__title}>Planetary Operations Center</h1>
      
      <div className={styles.planets__controls}>
        <h2 className={styles.planets__subtitle}>Send Spacecraft to Planet</h2>
        <form onSubmit={handleSendSpacecraft} className={styles.planets__form}>
          <div className={styles.planets__field}>
            <label htmlFor="spacecraft" className={styles.planets__label}>
              Select Spacecraft:
            </label>
            <select
              id="spacecraft"
              value={selectedSpacecraft}
              onChange={(e) => setSelectedSpacecraft(e.target.value)}
              className={styles.planets__select}
            >
              <option value="">Choose a spacecraft...</option>
              {spacecrafts.map((spacecraft) => (
                <option key={spacecraft.id} value={spacecraft.id}>
                  {spacecraft.name} (Capacity: {spacecraft.capacity.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.planets__field}>
            <label htmlFor="planet" className={styles.planets__label}>
              Destination Planet:
            </label>
            <select
              id="planet"
              value={selectedPlanet}
              onChange={(e) => setSelectedPlanet(e.target.value)}
              className={styles.planets__select}
            >
              <option value="">Choose a destination...</option>
              {planets.map((planet) => (
                <option key={planet.id} value={planet.id}>
                  {planet.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={!selectedSpacecraft || !selectedPlanet || isSending}
            className={styles.planets__button}
          >
            {isSending ? 'Sending...' : 'Send Spacecraft'}
          </button>
        </form>
      </div>

      <div className={styles.planets__grid}>
        {planets.map((planet) => {
          const spacecraftsOnPlanet = getSpacecraftsOnPlanet(planet.id);
          
          return (
            <div key={planet.id} className={styles.planet}>
              <div className={styles.planet__header}>
                <h3 className={styles.planet__name}>{planet.name}</h3>
                <span className={styles.planet__population}>
                  Population: {planet.currentPopulation.toLocaleString()}
                </span>
              </div>
              
              {planet.pictureUrl && (
                <img 
                  src={planet.pictureUrl} 
                  alt={planet.name}
                  className={styles.planet__image}
                />
              )}
              
              <div className={styles.planet__spacecrafts}>
                <h4 className={styles.planet__spacecraftsTitle}>
                  Stationed Spacecraft ({spacecraftsOnPlanet.length})
                </h4>
                {spacecraftsOnPlanet.length === 0 ? (
                  <p className={styles.planet__noSpacecrafts}>No spacecraft stationed</p>
                ) : (
                  <ul className={styles.planet__spacecraftsList}>
                    {spacecraftsOnPlanet.map((spacecraft) => (
                      <li key={spacecraft.id} className={styles.planet__spacecraftItem}>
                        <strong>{spacecraft.name}</strong>
                        <br />
                        Capacity: {spacecraft.capacity.toLocaleString()}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanetsPage;
