const GEO_TOKEN = process.env.NEXT_PUBLIC_GEO_TOKEN;

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