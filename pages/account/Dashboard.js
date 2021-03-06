import ReactMapGL, { FlyToInterpolator, Marker, Popup, GeolocateControl, NavigationControl, WebMercatorViewport } from 'react-map-gl';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from "next/router";
import 'mapbox-gl/dist/mapbox-gl.css';
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import styles from '../../styles/Dashboard.module.css';
import useSupercluster from 'use-supercluster';
import Geocoder from "react-map-gl-geocoder";
import { IconContext } from "react-icons";
import { FaCheck } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import { getFriendList } from '../../util/services';
import { useUser } from '../../lib/hooks';
import { isOutOfMaxBounds, fetchAPI } from '../../util/map-utils';
import Pin from '../../components/Pin';
import NewFriend from '../../components/NewFriend';
import FriendInfo from '../../components/FriendInfo';
import FriendCard from '../../components/FriendCard';
import DarkToggle from "../../components/DarkToggle";

const MAP_TOKEN = process.env.NEXT_PUBLIC_MAP_TOKEN;

const Dashboard = () => {
    const [friendList, setFriendList] = useState([]);
    const [marker, setMarker] = useState(null);
    const [addingFriend, setAddingFriend] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [displayInfoCard, setDisplayInfoCard] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [alertMsg, setAlertMsg] = useState(null);
    const [mapStyle, setMapStyle] = useState("mapbox://styles/mcclellangg/ckyubo7gf000v14pgskavjqhz");

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
    const geocoderContainerRef = useRef();

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
        options: { radius: 50, maxZoom: 20 }
    });

    // Populate the friendList
    useEffect(() => {
        getFriendList(userInfo)
            .then((data) => {
                console.log('resolved', data);
                setFriendList(data[0].friendsList);
            })
            .catch((err) => {
                console.log('rejected', err.message);
            });
    }, [updated, userInfo, displayInfoCard]);

    // Update the map clicks for newFriendMarker
    const handleClick = (e) => {
        e.preventDefault();
        // checks if click has a value to determine if a pin already exists there
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

    // change map style upon dark-toggle button click
    const handleToggle = (activeTheme) => {
        activeTheme === "light" ?
            setMapStyle("mapbox://styles/mcclellangg/ckyubo7gf000v14pgskavjqhz")
            : setMapStyle("mapbox://styles/orsisi/cl0d5sxfg001p14nypead2syp");
    };

    return (
        <div >
            <div className="main">
                <div className="buttons">
                    <button className="show-button" onClick={() => setDisplayInfoCard(!displayInfoCard)}>
                        {displayInfoCard ? 'Show Map' : 'Show Friends'}
                    </button>
                    <DarkToggle toggleCallback={handleToggle} />
                </div>

                {!displayInfoCard ? (
                    <div>
                        <div
                            ref={geocoderContainerRef}
                            className={styles.search_bar}
                        />
                        <ReactMapGL
                            mapboxApiAccessToken={MAP_TOKEN}
                            {...viewport}
                            mapStyle={mapStyle}
                            styleDiffing
                            onViewportChange={onViewportChange}
                            onClick={handleClick}
                            ref={mapRef}
                            maxZoom={20}
                        >

                            <div className={alertMsg ? styles.alert_box : styles.alert_box + " " + styles.hide}>
                                <button value={'close'} className={styles.alert_button} onClick={() => setAlertMsg(null)}>
                                    x
                                </button>
                                {alertMsg && alertMsg.success && (
                                    <>
                                        <IconContext.Provider value={{ color: "green", size: 15 }}>
                                            <FaCheck />
                                        </IconContext.Provider>
                                        <p className='success_msg'>{alertMsg.success}</p>
                                    </>
                                )}

                                {alertMsg && alertMsg.error && (
                                    <>
                                        <IconContext.Provider value={{ color: '#f30070', size: 20 }}>
                                            <MdErrorOutline />
                                        </IconContext.Provider>
                                        <p className='msg error_msg'>{alertMsg.error}</p>
                                    </>
                                )}
                            </div>

                            <GeolocateControl position="top-left" />
                            <Geocoder
                                mapRef={mapRef}
                                onViewportChange={handleGeocoderViewportChange}
                                mapboxApiAccessToken={MAP_TOKEN}
                                position="top-right"
                                containerRef={geocoderContainerRef}
                                reverseGeocode
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
                                            <button
                                                value={'cluster'}
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
                                            </button>
                                        </Marker>
                                    );
                                }
                                // if we have friends, display markers
                                return friendList != "undefined" && friendList != null && friendList.length != null
                                    && friendList.length > 0 ? (
                                    <Marker
                                        key={cluster.properties.friendId}
                                        latitude={latitude}
                                        longitude={longitude}
                                        offsetTop={-20}
                                        offsetLeft={-10}
                                    >
                                        <Pin
                                            setSelectedFriend={setSelectedFriend}
                                            setAddingFriend={setAddingFriend}
                                            size={20}
                                            friend={cluster}
                                        ></Pin>
                                    </Marker>
                                ) : (
                                    <div className={styles.message}> <p>You don&apos;t have any friends added yet.</p>
                                    </div>);
                            })}
                            {
                                // brings up the NewFriend popup immediately after clicking on the map 
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
                                        setAlertMsg={setAlertMsg}
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
                                </Marker>
                            }
                            {/* bring up existing friend pin */}
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
                                        setAlertMsg={setAlertMsg}
                                        setMarker={setMarker}
                                    ></FriendInfo>
                                </Popup>
                            )}
                            <NavigationControl className="navigation" showCompass={false} />
                        </ReactMapGL>
                    </div>
                ) : (
                    <div className="grid">
                        {friendList &&
                            friendList.map((friend) => (
                                <FriendCard
                                    friend={friend}
                                    key={friend.friend_id}
                                ></FriendCard>
                            ))
                        }
                    </div>
                )}

            </div>
        </div>

    );
};

export default Dashboard;

Dashboard.getInitialProps = ({ query: { userInfo } }) => {
    return { userInfo };
};
