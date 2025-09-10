import { Link } from 'react-router-dom';
import { useSpaceTravel } from '../../context/SpaceTravelContext.jsx';
import styles from './SpacecraftCard.module.css';

const SpacecraftCard = ({ spacecraft }) => {
  const { planets, destroySpacecraft } = useSpaceTravel();
  
  const currentPlanet = planets.find(p => p.id === spacecraft.currentLocation);

  const handleDestroy = async () => {
    if (window.confirm(`Are you sure you want to destroy ${spacecraft.name}?`)) {
      await destroySpacecraft(spacecraft.id);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <h3 className={styles.card__title}>{spacecraft.name}</h3>
        <div className={styles.card__actions}>
          <Link to={`/spacecraft/${spacecraft.id}`} className={styles.card__button}>
            View Details
          </Link>
          <button onClick={handleDestroy} className={`${styles.card__button} ${styles['card__button--danger']}`}>
            Destroy
          </button>
        </div>
      </div>
      {spacecraft.pictureUrl && (
        <img src={spacecraft.pictureUrl} alt={spacecraft.name} className={styles.card__image} />
      )}
      <div className={styles.card__content}>
        <p className={styles.card__info}>
          <strong>Capacity:</strong> {spacecraft.capacity.toLocaleString()} people
        </p>
        <p className={styles.card__info}>
          <strong>Current Location:</strong> {currentPlanet?.name || 'Unknown'}
        </p>
        <p className={styles.card__description}>{spacecraft.description}</p>
      </div>
    </div>
  );
};

export default SpacecraftCard;
