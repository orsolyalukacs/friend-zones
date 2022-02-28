import styles from '../styles/Loader.module.css';

const Loader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.lds_dual_ring}></div>
            <p>Loading . . . </p>
        </div>
    );
};

export default Loader;
