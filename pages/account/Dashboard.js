// friends
// Pull in timezones from a json file and display them:
// import
import styles from '../../styles/dashboard.module.css'
import AddFriend from '../../components/AddFriend';

const UTC_OFFSETS = require('/data/timezones.json');
const timeSettings = { hour: '2-digit', minute: '2-digit' };

function DisplayOffsets(props) {
    const offsets = props.offsets
    // Display offsets
    const offsetDisplays = offsets.map((offset) =>
        <div className={styles.zones} key={offset}>
            {offset}
            <hr className={styles.line_break}></hr>
            {/*TODO: Check this against friend functionalities not magic number +02:00*/}
            {(offset === '+02:00') ? new Date().toLocaleTimeString([], { ...timeSettings }) : ''}
        </div>
    );
    return offsetDisplays;
}

const Dashboard = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h3>Dashboard</h3>
                <div className={styles.grid}>
                    <div className={styles.zone_container}>
                        <DisplayOffsets offsets={UTC_OFFSETS}></DisplayOffsets>
                    </div>
                </div>
                <div className={styles.card}>
                    <AddFriend></AddFriend>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
