// friends
// Pull in timezones from a json file and display them:
// import
import styles from '../../styles/dashboard.module.css';
import AddFriend from '../../components/AddFriend';
import { useUser } from '../../lib/hooks';

const UTC_OFFSETS = require('/data/timezones.json');
const timeSettings = { hour: '2-digit', minute: '2-digit' };

function DisplayOffsets(props) {
    const offsets = props.offsets;
    // Display offsets
    return (
        offsets.map((offset) =>
            <div className={styles.zones} key={offset}>
                {offset}
                <hr className={styles.line_break}></hr>
                {/* TODO: Check this against friend functionalities not magic number +02:00*/}
                {(offset === '+02:00') ? new Date().toLocaleTimeString([], { ...timeSettings }) : ''}
            </div>
        )
    );
}

const Dashboard = () => {
    const user = useUser();

    return (
        <div>
            <div>
                {user && (
                    <div className="container">
                        <h2>Dashboard</h2>
                        <p>Currently logged in as:</p>
                        <pre>{JSON.stringify(user, null, 2)}</pre>
                    </div>
                )}

                <div className={styles.grid}>
                    <div className={styles.zone_container}>
                        <DisplayOffsets offsets={UTC_OFFSETS}></DisplayOffsets>
                    </div>
                </div>
                <div className={styles.card}>
                    <AddFriend></AddFriend>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;