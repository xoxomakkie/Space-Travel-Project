import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__hero}>
        <h1 className={styles.home__title}>Welcome to Space Travel Command Center</h1>
        <p className={styles.home__subtitle}>
          Managing humanity's exodus from Earth to habitable worlds across the solar system
        </p>
      </div>
      
      <div className={styles.home__content}>
        <div className={styles.home__section}>
          <h2 className={styles.home__sectionTitle}>Mission Overview</h2>
          <p className={styles.home__text}>
            In a future where Earth has become uninhabitable due to environmental degradation, 
            humanity has successfully terraformed other planets in our solar system. As a commander, 
            you are responsible for coordinating the evacuation of Earth's remaining population 
            to these new worlds.
          </p>
        </div>

        <div className={styles.home__features}>
          <div className={styles.home__feature}>
            <h3 className={styles.home__featureTitle}>🚀 Spacecraft Management</h3>
            <p className={styles.home__featureText}>
              View, build, and manage your fleet of spacecraft. Each vessel is designed to 
              transport thousands of people safely across the solar system.
            </p>
            <Link to="/spacecrafts" className={styles.home__button}>
              View Spacecrafts
            </Link>
          </div>

          <div className={styles.home__feature}>
            <h3 className={styles.home__featureTitle}>🏗️ Construction Bay</h3>
            <p className={styles.home__featureText}>
              Design and build new spacecraft to expand your evacuation capabilities. 
              Customize capacity, appearance, and specifications for each mission.
            </p>
            <Link to="/construction" className={styles.home__button}>
              Build Spacecraft
            </Link>
          </div>

          <div className={styles.home__feature}>
            <h3 className={styles.home__featureTitle}>🪐 Planetary Operations</h3>
            <p className={styles.home__featureText}>
              Monitor population distribution across planets and coordinate spacecraft 
              movements to ensure efficient evacuation operations.
            </p>
            <Link to="/planets" className={styles.home__button}>
              View Planets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
