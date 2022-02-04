import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from '../../styles/Friends.module.css';
import Pin from '../../components/Pin';
import NewFriend from '../../components/NewFriend';
import FriendPin from '../../components/FriendPin';
import FriendInfo from '../../components/FriendInfo';

const MAP_TOKEN = process.env.NEXT_PUBLIC_MAP_TOKEN;

const Friends = () => {
    // Initialize map
    // TODO: set default lat and long based on user location
    const [viewport, setViewport] = useState({
        latitude: 37.490079,
        longitude: -77.466484,
        width: '80vw',
        height: '80vh',
        zoom: 2
    });
    const [friendList, setFriendList] = useState([]);
    const [marker, setMarker] = useState(null);
    const [addingFriend, setAddingFriend] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    // Populate the friendsList
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/get_friends');
            if (response.status != 200) {
                throw new Error('cannot fetch data');
            }
            const data = await response.json();
            return data;
        };
        fetchData()
            .then((data) => {
                console.log('resolved', data);
                setFriendList(data);
            })
            .catch((err) => {
                console.log('rejected', err.message);
            });
    }, [updated]);

    // Update the map clicks for newFriendMarker
    const handleClick = (e) => {
        e.preventDefault();
        // Parse coordinates for api compatibility
        const longitude = parseFloat((e.lngLat[0]).toFixed(4));
        const latitude = parseFloat((e.lngLat[1]).toFixed(4));
        setMarker({
            longitude: longitude,
            latitude: latitude
        });
    };

    return (
        <div>
            <div>
                <h3>Friends</h3>
                <div className={styles.MapContainer}>
                    <ReactMapGL
                        mapboxApiAccessToken={MAP_TOKEN}
                        {...viewport}
                        mapStyle="mapbox://styles/mcclellangg/ckyubo7gf000v14pgskavjqhz"
                        onViewportChange={viewport => setViewport(viewport)}
                        onClick={handleClick}>

                        {marker &&
                            <Marker
                                latitude={marker.latitude}
                                longitude={marker.longitude}>
                                <Pin setAddingFriend={setAddingFriend} size={20}></Pin>
                            </Marker>
                        }

                        {addingFriend &&
                            <Popup
                                latitude={marker.latitude}
                                longitude={marker.longitude}
                                onClose={() => setAddingFriend(false)}
                                closeOnClick={true}>
                                <NewFriend
                                    marker={marker}
                                    setUpdated={setUpdated}
                                    updated={updated}
                                    setAddingFriend={setAddingFriend}>
                                </NewFriend>
                            </Popup>
                        }

                        {friendList.map(friend => (
                            <Marker
                                key={friend._id}
                                latitude={friend.coordinates.latitude}
                                longitude={friend.coordinates.longitude}>
                                <FriendPin setSelectedFriend={setSelectedFriend}
                                    size={20}
                                    friend={friend}>
                                </FriendPin>
                            </Marker>
                        ))}

                        {selectedFriend &&
                            <Popup
                                latitude={selectedFriend.coordinates.latitude}
                                longitude={selectedFriend.coordinates.longitude}
                                onClose={() => setSelectedFriend(null)}
                                closeOnClick={true}>
                                <FriendInfo friend={selectedFriend}
                                    updated={updated}
                                    setUpdated={setUpdated}
                                    setSelectedFriend={setSelectedFriend}>
                                </FriendInfo>
                            </Popup>
                        }

                    </ReactMapGL>
                </div>
            </div>
        </div>
    );
};

export default Friends;
