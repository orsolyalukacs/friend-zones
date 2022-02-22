// friend card
import { useEffect, useState } from 'react';
const MAP_TOKEN = process.env.NEXT_PUBLIC_MAP_TOKEN;

const FriendCard = ({ friend }) => {
    const { latitude, longitude } = friend.coordinates;
    const [GMT, setGMT] = useState(null);
    const [location, setLocation] = useState(null);
    const offset = friend.timezone_offset;

    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        const fetchLocation = async () => {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAP_TOKEN}`
            );
            if (response.status != 200) {
                throw new Error('cannot fetch friend location');
            }
            const data = await response.json();
            return data;
        };
        fetchLocation()
            .then((data) => {
                console.log('resolved', data);
                // setFriendList(data[0].friendsList);
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
    }, []);



    return (
        <div className="card friend-card">
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
        </div>
    );
};

export default FriendCard;
