// friends
// Pull in timezones from a json file and display them:
// import
import styles from '../../styles/Home.module.css'
const UTC_OFFSETS = require('/data/timezones.json');

const ProtoHome = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h3>Proto Home</h3>
            </main>
        </div>
    );
}

export default ProtoHome;
