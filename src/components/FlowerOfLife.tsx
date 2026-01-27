"use client";
import styles from './FlowerOfLife.module.css';

export default function FlowerOfLife() {
    return (
        <div className={styles.container}>
            <div className={`${styles.circle} ${styles.center}`}></div>
            <div className={`${styles.circle} ${styles.c1}`}></div>
            <div className={`${styles.circle} ${styles.c2}`}></div>
            <div className={`${styles.circle} ${styles.c3}`}></div>
            <div className={`${styles.circle} ${styles.c4}`}></div>
            <div className={`${styles.circle} ${styles.c5}`}></div>
            <div className={`${styles.circle} ${styles.c6}`}></div>
        </div>
    );
}
