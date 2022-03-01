// friend card
import { useEffect, useState } from 'react';
import { fetchLocation } from '../util/map-utils';

const FriendCard = ({ friend }) => {
    const { latitude, longitude } = friend.coordinates;
    const [GMT, setGMT] = useState(null);
    const [location, setLocation] = useState(null);
    const offset = friend.timezone_offset;

    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetchLocation(latitude, longitude)
            .then((data) => {
                console.log('resolved', data);
                setLocation(data.features[0].place_name);
            })
            .catch((err) => {
                console.log('rejected', err.message);
            });
    }, [latitude, longitude]);


    useEffect(() => {
        const getGMT = (offset) => {
            if (offset < 0) {
                setGMT("GMT");
            } else {
                setGMT("GMT+");
            }
        };

        getGMT(offset);
    }, [offset]);



    return (
        <div className="card friend-card">
            {friend ?
                (<>
                    <div className="card-title-container">
                        <h3 className="card-title">{friend.name}</h3>
                        <h3 className="bold card-time">
                            {new Date().toLocaleTimeString([], {
                                timeZone: friend.timezone,
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </h3>
                    </div>
                    <p><span className="bold italic">Location:  </span>{location}</p>
                    <p><span className="bold italic">Timezone:  </span> ({GMT}{friend.timezone_offset}) {friend.timezone}</p>
                </>
                ) : (<h3>No data found.</h3>)}
        </div>
    );
};

export default FriendCard;
