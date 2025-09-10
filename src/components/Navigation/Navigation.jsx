import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/spacecrafts', label: 'Spacecrafts' },
    { path: '/construction', label: 'Construction' },
    { path: '/planets', label: 'Planets' }
  ];

  return (
    <nav className={styles.navigation}>
      <div className={styles.navigation__container}>
        <Link to="/" className={styles.navigation__logo}>
          🚀 Space Travel
        </Link>
        <ul className={styles.navigation__list}>
          {navItems.map((item) => (
            <li key={item.path} className={styles.navigation__item}>
              <Link
                to={item.path}
                className={`${styles.navigation__link} ${
                  location.pathname === item.path ? styles['navigation__link--active'] : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
