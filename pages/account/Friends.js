// friends
// Pull in timezones from a json file and display them:
// import
import styles from '../../styles/Home.module.css'
const UTC_OFFSETS = require('/data/timezones.json');

const Friends = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h3>Friends Page</h3>
            </main>
        </div>
    );
}

export default Friends;
