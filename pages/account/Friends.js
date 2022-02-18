import ReactMapGL, { FlyToInterpolator, Marker, Popup, GeolocateControl, WebMercatorViewport } from 'react-map-gl';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from "next/router";
import 'mapbox-gl/dist/mapbox-gl.css';
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import useSupercluster from 'use-supercluster';
import Geocoder from "react-map-gl-geocoder";
import styles from '../../styles/Friends.module.css';
import Pin from '../../components/Pin';
import NewFriend from '../../components/NewFriend';
import FriendPin from '../../components/FriendPin';
import FriendInfo from '../../components/FriendInfo';
import FriendCard from '../../components/FriendCard';
import { useUser } from '../../lib/hooks';
import { isOutOfMaxBounds, fetchAPI } from '../../util/map-utils';

const MAP_TOKEN = process.env.NEXT_PUBLIC_MAP_TOKEN;

const Friends = () => {
    const [friendList, setFriendList] = useState([]);
    const [marker, setMarker] = useState(null);
    const [addingFriend, setAddingFriend] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [displayInfoCard, setDisplayInfoCard] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const user = useUser();
    const router = useRouter();
    const {
        query: { userInfo },
    } = router;

    // setup map
    // TODO: set default lat and long based on user location
    const [viewport, setViewport] = useState({
        latitude: 37.4900,
        longitude: -77.4664,
        width: '95vw',
        height: '70vh',
        zoom: 2,
    });

    const mapRef = useRef();

    /* Clustering */
    // Prepare the data
    const friends = friendList && !error ? friendList : [];
    const points = friends.map(friend => ({
        type: "Feature",
        properties: {
            cluster: false,
            friendId: friend.friend_id,
            name: friend.name,
            timezone: friend.timezone,
            timezone_offset: friend.timezone_offset
        },
        geometry: {
            type: "Point",
            coordinates: [
                parseFloat(friend.coordinates.longitude.toFixed(4)),
                parseFloat(friend.coordinates.latitude.toFixed(4))
            ]
        }
    }));

    // get map bounds
    const bounds = mapRef.current
        ? mapRef.current
            .getMap()
            .getBounds()
            .toArray()
            .flat()
        : null;

    // get clusters
    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom: viewport.zoom,
        options: { radius: 50, maxZoom: 18 }
    });

    // Populate the friendsList
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `/api/friends/get_friends?userInfo=${userInfo}`
            );
            if (response.status != 200) {
                throw new Error('cannot fetch data');
            }
            const data = await response.json();
            return data;
        };
        fetchData()
            .then((data) => {
                console.log('resolved', data);
                setFriendList(data[0].friendsList);
            })
            .catch((err) => {
                console.log('rejected', err.message);
            });
    }, [updated, userInfo]);



    // Update the map clicks for newFriendMarker
    const handleClick = (e) => {
        e.preventDefault();
        const isAddOrDelete = e.target.value;
        // Parse coordinates for api compatibility
        if (!isAddOrDelete) {
            const longitude = parseFloat(e.lngLat[0].toFixed(4));
            const latitude = parseFloat(e.lngLat[1].toFixed(4));
            setMarker({
                longitude: longitude,
                latitude: latitude,
            });

            // Get timezone info
            fetchAPI(latitude, longitude)
                .then((data) => {
                    console.log('resolved');
                    setError(null);
                    setData(data);
                })
                .catch((error) => {
                    console.log('rejected', error);
                    setError(error);
                });
        }
    };

    const onViewportChange = useCallback(newViewport => {
        const merc = new WebMercatorViewport(newViewport);
        // fetch the lat/lng of the edges of the viewport
        // measured from topLeft
        const newSouthWest = merc.unproject([0, newViewport.height]);
        const newNorthEast = merc.unproject([newViewport.width, 0]);
        if (!isOutOfMaxBounds(newSouthWest, newNorthEast, [[-180, -90], [180, 90]])) {
            setViewport(newViewport);
        };
    }, []);

    const onGeocoderViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 1000 };

            return onGeocoderViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides
            });
        },
        [onGeocoderViewportChange]
    );

    return (
        <div className="main">
            <button onClick={() => setDisplayInfoCard(!displayInfoCard)}>
                {displayInfoCard ? 'Show Map' : 'Show Friends'}
            </button>

            {!displayInfoCard ? (
                <ReactMapGL
                    mapboxApiAccessToken={MAP_TOKEN}
                    {...viewport}
                    mapStyle="mapbox://styles/mcclellangg/ckyubo7gf000v14pgskavjqhz"
                    onViewportChange={onViewportChange}
                    onClick={handleClick}
                    ref={mapRef}
                    maxZoom={20}
                >
                    <GeolocateControl position="top-left" />
                    <Geocoder
                        mapRef={mapRef}
                        onViewportChange={handleGeocoderViewportChange}
                        mapboxApiAccessToken={MAP_TOKEN}
                        position="top-right"
                    />
                    {clusters.map(cluster => {
                        // every cluster point has coordinates
                        const [longitude, latitude] = cluster.geometry.coordinates;
                        // the point may be either a cluster or a single friend marker
                        const {
                            cluster: isCluster,
                            point_count: pointCount
                        } = cluster.properties;

                        // we have a cluster to render
                        if (isCluster) {
                            return (
                                <Marker
                                    key={cluster.id}
                                    latitude={latitude}
                                    longitude={longitude}
                                >
                                    <div
                                        className={styles.clusterMarker}
                                        style={{
                                            width: `${10 + (pointCount / points.length) * 70}px`,
                                            height: `${10 + (pointCount / points.length) * 70}px`
                                        }}

                                        onClick={() => {
                                            const expansionZoom = Math.min(
                                                supercluster.getClusterExpansionZoom(cluster.id),
                                                20
                                            );
                                            setViewport({
                                                ...viewport,
                                                latitude,
                                                longitude,
                                                zoom: expansionZoom,
                                                transitionInterpolator: new FlyToInterpolator({
                                                    speed: 2
                                                }),
                                                transitionDuration: "auto"
                                            });
                                        }}
                                    >
                                        {pointCount}
                                    </div>
                                </Marker>
                            );
                        }
                        return friendList != [] ? (
                            <Marker
                                key={cluster.properties.friendId}
                                latitude={latitude}
                                longitude={longitude}
                                offsetTop={-20}
                                offsetLeft={-10}
                            >
                                <FriendPin
                                    setSelectedFriend={setSelectedFriend}
                                    setAddingFriend={setAddingFriend}
                                    size={20}
                                    friend={cluster}
                                ></FriendPin>
                            </Marker>
                        ) : (
                            <div className={styles.message}> <p>You don&apos;t have any friends added yet.</p>
                            </div>);
                    })}
                    {
                        addingFriend &&
                        <Popup
                            latitude={marker.latitude}
                            longitude={marker.longitude}
                            sortByDepth={true}
                            onClose={() => {
                                setAddingFriend(false);
                                setMarker(null);
                            }}
                            closeOnClick={true}
                        >
                            <NewFriend
                                marker={marker}
                                setUpdated={setUpdated}
                                updated={updated}
                                user={user}
                                setAddingFriend={setAddingFriend}
                                setMarker={setMarker}
                                data={data}
                                error={error}
                            ></NewFriend>
                        </Popup>
                    }
                    {
                        marker &&
                        <Marker
                            latitude={marker.latitude}
                            longitude={marker.longitude}
                            offsetTop={-20}
                            offsetLeft={-10}
                            anchor={"top-left"}>
                            <Pin setAddingFriend={setAddingFriend}
                                size={20}
                                selectedFriend={selectedFriend}
                                setSelectedFriend={setSelectedFriend}>
                            </Pin>
                        </Marker>}

                    {selectedFriend && (
                        <Popup
                            latitude={selectedFriend.geometry.coordinates[1]}
                            longitude={selectedFriend.geometry.coordinates[0]}
                            onClose={() => setSelectedFriend(null)}
                            closeOnClick={true}
                        >
                            <FriendInfo
                                user={user}
                                friend={selectedFriend}
                                updated={updated}
                                setUpdated={setUpdated}
                                setSelectedFriend={setSelectedFriend}
                            ></FriendInfo>
                        </Popup>
                    )}
                </ReactMapGL>
            ) : (
                <div className={styles.grid}>
                    {friendList.map((friend) => (
                        <FriendCard
                            friend={friend}
                            key={friend.friend_id}
                        ></FriendCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Friends;

Friends.getInitialProps = ({ query: { userInfo } }) => {
    return { userInfo };
};
