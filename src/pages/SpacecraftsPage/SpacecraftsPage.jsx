import { Link } from 'react-router-dom';
import { useSpaceTravel } from '../../context/SpaceTravelContext.jsx';
import SpacecraftCard from '../../components/SpacecraftCard/SpacecraftCard.jsx';
import styles from './SpacecraftsPage.module.css';

const SpacecraftsPage = () => {
  const { spacecrafts, error } = useSpaceTravel();

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error loading spacecrafts: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.spacecrafts}>
      <div className={styles.spacecrafts__header}>
        <h1 className={styles.spacecrafts__title}>Spacecraft Fleet</h1>
        <Link to="/construction" className={styles.spacecrafts__button}>
          Build New Spacecraft
        </Link>
      </div>
      
      {spacecrafts.length === 0 ? (
        <div className={styles.spacecrafts__empty}>
          <p>No spacecraft available. Build your first spacecraft to begin evacuation operations.</p>
          <Link to="/construction" className={styles.spacecrafts__button}>
            Build Spacecraft
          </Link>
        </div>
      ) : (
        <div className={styles.spacecrafts__grid}>
          {spacecrafts.map((spacecraft) => (
            <SpacecraftCard key={spacecraft.id} spacecraft={spacecraft} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SpacecraftsPage;
