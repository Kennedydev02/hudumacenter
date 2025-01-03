import styles from '@/styles/Dashboard.module.css';

const DashboardStats = () => {
  return (
    <div className={styles.cardGrid}>
      {/* Total Visitors Card */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <span role="img" aria-label="visitors">👥</span> Total Visitors Today
        </div>
        <div className={styles.cardValue}>50</div>
        <div className={`${styles.percentageChange} ${styles.positive}`}>
          +12% from yesterday
        </div>
      </div>

      {/* Pending Appointments Card */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <span role="img" aria-label="pending">⏳</span> Pending Appointments
        </div>
        <div className={styles.cardValue}>8</div>
        <div className={`${styles.percentageChange} ${styles.negative}`}>
          -5% from yesterday
        </div>
      </div>

      {/* Completed Visits Card */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <span role="img" aria-label="completed">✅</span> Completed Visits
        </div>
        <div className={styles.cardValue}>42</div>
        <div className={`${styles.percentageChange} ${styles.positive}`}>
          +8% from yesterday
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;