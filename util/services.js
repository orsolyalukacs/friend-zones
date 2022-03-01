export async function getFriendList(userInfo) {
    const response = await fetch(
        `/api/friends/get_friends?userInfo=${userInfo}`
    );
    if (response.status != 200) {
        throw new Error('cannot fetch data');
    }
    const data = await response.json();
    return data;
}