import styles from '../styles/dashboard.module.css';
const timeSettings = { hour: '2-digit', minute: '2-digit' };

function DisplayOffsets(props) {
  const offsets = props.offsets;
  const friendList = props.friendList;
  // Create zones of friends to check against
  const zones = [];
  friendList.map((friend) => zones.push(friend.timezone));
  // Display offsets
  return (
    offsets.map((offset) =>
      <div className={styles.zones} key={offset.utc_offset}>
        {offset.utc_offset}
        <hr className={styles.line_break}></hr>
        {(zones.includes(offset.utc_offset)) ? new Date().toLocaleTimeString([],
          { timeZone: (offset.timezone), ...timeSettings }) : ''}
      </div>
    )
  );
}

export default DisplayOffsets;
