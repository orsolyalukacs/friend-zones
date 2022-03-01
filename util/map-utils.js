const GEO_TOKEN = process.env.NEXT_PUBLIC_GEO_TOKEN;
const MAP_TOKEN = process.env.NEXT_PUBLIC_MAP_TOKEN;

export function isOutOfMaxBounds(nextSW, nextNE, maxBounds) {
    const [[maxSWLng, maxSWLat], [maxNELng, maxNELat]] = maxBounds;
    const [nextSWLng, nextSWLat] = nextSW;
    const [nextNELng, nextNELat] = nextNE;

    return (
        nextSWLng < maxSWLng || nextSWLat < maxSWLat || nextNELng > maxNELng || nextNELat > maxNELat
    );
};

export async function fetchAPI(latitude, longitude) {
    const res = await fetch(
        `https://api.ipgeolocation.io/timezone?apiKey=${GEO_TOKEN}&lat=${latitude}&long=${longitude}`
    );

    if (res.status != 200) {
        throw new Error('unable to fetch timezone data');
    }
    const data = await res.json();
    return data;
};

export async function fetchLocation(lat, long) {
    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${MAP_TOKEN}`
    );
    if (response.status != 200) {
        throw new Error('cannot fetch friend location');
    }
    const data = await response.json();
    return data;
}