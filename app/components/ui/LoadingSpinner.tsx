import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.box}></div>
    </div>
  );
};

export default LoadingSpinner;
