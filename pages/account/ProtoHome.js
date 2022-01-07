// friends
// Pull in timezones from a json file and display them:
// import
import styles from '../../styles/protohome.module.css'
const UTC_OFFSETS = require('/data/timezones.json');

function DisplayOffsets(props) {
    const offsets = props.offsets

    // Display offsets
    const offsetDisplays = offsets.map((offset) =>
    <div>
        {offset}
    </div>
    );
    return offsetDisplays;
}

const ProtoHome = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h3>Proto Home</h3>
                <DisplayOffsets offsets={UTC_OFFSETS}></DisplayOffsets>
            </main>
        </div>
    );
}

export default ProtoHome;
