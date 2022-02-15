// friend card
import styles from '../styles/FriendCard.module.css';
const FriendCard = (props) => {
    return (
        <div className={styles.card}>
            <p>{props.friend.name}</p>
            <p>
                {' '}
                Coordinates: {props.friend.coordinates.latitude},
                {props.friend.coordinates.longitude}
            </p>
            <p>
                {new Date().toLocaleTimeString([], {
                    timeZone: props.friend.timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </p>
            <p>Timezone: {props.friend.timezone}</p>
        </div>
    );
};

export default FriendCard;
