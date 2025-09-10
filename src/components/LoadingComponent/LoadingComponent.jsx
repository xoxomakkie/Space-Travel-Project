import styles from './LoadingComponent.module.css';

const LoadingComponent = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__spinner}></div>
      <p className={styles.loading__text}>Loading...</p>
    </div>
  );
};

export default LoadingComponent;
