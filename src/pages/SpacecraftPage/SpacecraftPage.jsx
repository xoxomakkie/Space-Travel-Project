import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSpaceTravel } from '../../context/SpaceTravelContext.jsx';
import styles from './SpacecraftPage.module.css';

const SpacecraftPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSpacecraftById, planets, destroySpacecraft, error } = useSpaceTravel();
  const [spacecraft, setSpacecraft] = useState(null);

  useEffect(() => {
    const fetchSpacecraft = async () => {
      const data = await getSpacecraftById(id);
      if (!data) {
        navigate('/spacecrafts');
        return;
      }
      setSpacecraft(data);
    };
    fetchSpacecraft();
  }, [id, getSpacecraftById, navigate]);

  const handleDestroy = async () => {
    if (window.confirm(`Are you sure you want to destroy ${spacecraft.name}?`)) {
      const success = await destroySpacecraft(spacecraft.id);
      if (success) {
        navigate('/spacecrafts');
      }
    }
  };

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error loading spacecraft: {error}</p>
        <Link to="/spacecrafts" className={styles.backButton}>
          Back to Spacecrafts
        </Link>
      </div>
    );
  }

  if (!spacecraft) {
    return <div className={styles.loading}>Loading spacecraft details...</div>;
  }

  const currentPlanet = planets.find(p => p.id === spacecraft.currentLocation);

  return (
    <div className={styles.spacecraft}>
      <div className={styles.spacecraft__header}>
        <Link to="/spacecrafts" className={styles.spacecraft__backButton}>
          ← Back to Spacecrafts
        </Link>
        <div className={styles.spacecraft__actions}>
          <Link to="/planets" className={styles.spacecraft__button}>
            Send to Planet
          </Link>
          <button 
            onClick={handleDestroy} 
            className={`${styles.spacecraft__button} ${styles['spacecraft__button--danger']}`}
          >
            Destroy Spacecraft
          </button>
        </div>
      </div>

      <div className={styles.spacecraft__content}>
        <h1 className={styles.spacecraft__title}>{spacecraft.name}</h1>
        
        {spacecraft.pictureUrl && (
          <div className={styles.spacecraft__imageContainer}>
            <img 
              src={spacecraft.pictureUrl} 
              alt={spacecraft.name} 
              className={styles.spacecraft__image}
            />
          </div>
        )}

        <div className={styles.spacecraft__details}>
          <div className={styles.spacecraft__info}>
            <h2 className={styles.spacecraft__sectionTitle}>Specifications</h2>
            <div className={styles.spacecraft__specs}>
              <div className={styles.spacecraft__spec}>
                <strong>Capacity:</strong> {spacecraft.capacity.toLocaleString()} people
              </div>
              <div className={styles.spacecraft__spec}>
                <strong>Current Location:</strong> {currentPlanet?.name || 'Unknown'}
              </div>
              <div className={styles.spacecraft__spec}>
                <strong>Spacecraft ID:</strong> {spacecraft.id}
              </div>
            </div>
          </div>

          <div className={styles.spacecraft__description}>
            <h2 className={styles.spacecraft__sectionTitle}>Description</h2>
            <p className={styles.spacecraft__descriptionText}>{spacecraft.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpacecraftPage;
