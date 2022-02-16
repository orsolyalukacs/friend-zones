// friend card
const FriendCard = ({ friend }) => {
    return (
        <div className="card">
            <p>{friend.name}</p>
            <p>
                {' '}
                Coordinates: {friend.coordinates.latitude},
                {friend.coordinates.longitude}
            </p>
            <p>
                {new Date().toLocaleTimeString([], {
                    timeZone: friend.timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </p>
            <p>Timezone: {friend.timezone}</p>
        </div>
    );
};

export default FriendCard;
