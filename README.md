# FRIEND-ZONES

#### Video Demo: [Friend-zones](https://www.youtube.com/watch?v=RI600eMn2dQ)

#### Description:

# Design Overview

## Overview

The main idea behind this project is to create a web app that displays a user's friends, and their associated timezones, in relation to the timezone of the user.

## Basic Pages and Functionalities

### Splash

_**index.js**_

Welcoming page displaying brief information about the site, and asking users to either Login or Register.

### Registration

_**/pages/acount/Signup.js**_
Page that consists of a registration form _/components/Form.js_ for new users, asking them to provide the following info:

-   username
-   email
-   password
-   password verification
-   timezone (from dropdown) _data/tznames.json_

The page will check that these fields are valid, and upon success will redirect user to the Login page, if any of these fields are filled out incorrectly, the user will be prompted with an error message. The password gets hashed and salted when saving to the MongoDB database.

### Login

_**/pages/account/Login.js**_
Allows users to login with username and password. Upon success redirects user to the Dashboard. Inputting incorrect information will prompt user with an error message.

### Navigation

_**/components/nav/**_
A simple top nav bar that dynamically displays certain options depending on whether or not the user is logged in.
If a user is **logged out**:

-   Home
-   Register
-   Login

If a user is **logged in**:

-   Dashboard
-   Settings
-   Log out

## Dashboard

_/pages/account/Dashboard.js_
This page pulls in data from the db related to the user. It displays a **Map** with a pin _/components/Pin.js_ marking each friend. If there are several friends in an area, and map is zoomed out enough, it will show **cluster** with the number of pins it's representing. Once a user clicks on a cluster, the map will zoom in to the cluster to show separate pins.

The friends will be **Marker** components (from the react map gl library) that will generate **Popups** containing more detailed information upon clicking them.

_Features of the Dashboard include:_

-   **GeolocateControl** in the top left corner of the map. If clicked on, it asks for user location and displays it on the map.

-   Search for a location via a searchbar (**Geocoder**)
-   Controls to **Zoom** in and out. Zoom is available via mouse scroll as well.

-   Add friends to the user's friendlist via _**/components/NewFriend**_
    Once clicked on the map where a pin doesn't exist yet, a new pin is created. Hovering on the pin brings up a **Popup** with a form.
    The form will ask for the friend's name and get the lat/long coordinates via click from the map. These coordinates will be used and passed to the ipgeolocation api to generate the rest of the friend info, creating a friend object that looks like:

```
{
    "friend_id": "620abf87b899decfbff6c250",
    "name": "Jimmy",
    "coordinates": {
        "latitude": -27.474,
        "longitude": 153.017
    },
    "timezone": "Australia/Brisbane",
    "timezone_offset": 10,
}
```

This object will be sent to the user's db and update the user's friend list (This friendlist will be an array of friend objects that is another field in the user document.)

_**/components/FriendInfo.js**_

-   Hovering on an existing friend pin allows users to **delete** friend via a button.

## Friends

_**/pages/account/Friends.js**_
This page displays friends as a list of _**/components/FriendCard.js**_ components.
It includes information of friends such as:

-   name
-   time (in relation to the timezone of the user)
-   location (address of friend from the map)
-   timezone (in GMT and timezone location)

## Settings

_**/pages/account/UserPage.js**_

-   An account page to view or edit (_**/pages/account/EditUserInfo.js**_) user's information while logged in.
-   If username is changed, the user gets logged out automatically. If only timezone is updated, user stays logged in.
    It includes information (from _**/components/UserInfo.js**_ component) of user such as:
    -   username
    -   timezone (in GMT and timezone location)
    -   created at (when the user account was created)

## API

_pages/api_

-   We have different **/account** and **/friends** endpoints in our api:
-   _pages/api/account_

    -   _/edit.js_: called by _pages/account/EditUserInfo.js_ to update user info in db
    -   _/signup.js_: called by _pages/account/Signup.js_ to register user in db
    -   _/login.js_: called by _/pages/account/Login.js_ to login user (password authenticating with passport.js)
    -   _/logout.js_: called by _/pages/account/Logout.js_ to logout user
    -   _/edit.js_: called by _/lib/hooks.js_ to authenticate user

-   _pages/api/friends_:
    -   _/[id].js_: called by _/components/FriendInfo.js_ to delete friend from db
    -   _/create_friend.js_: called by _/components/NewFriend.js_ to register friend in db, in user's document
    -   _/get_friends.js_: called by _/util/services.js_ to get user's friend list

## Tech

Open source projects that helped us along the way:

-   [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces
-   [Next.js](https://nextjs.org/) - Full-stack React framework with built-in Server-Side Rendering (SSR)
-   [MongoDB](https://www.mongodb.com/) - Document-oriented database
-   [Eslint](https://eslint.org/) - Linting
-   [prettier](https://prettier.io/) - Code formatting
-   [classnames](https://www.npmjs.com/package/classnames) - A simple JavaScript utility for conditionally joining classNames together.
-   [passport](https://www.passportjs.org/) - authentication middleware
-   [hapi/iron](https://hapi.dev/module/iron) - encapsulated tokens with encryption and verification
-   [swr](https://swr.vercel.app/) - React hooks for data fetching. Helps with caching & state management
-   [cookies](https://www.npmjs.com/package/cookie) - Basic HTTP cookie parser and serializer for HTTP servers.
-   [next-connect](https://www.npmjs.com/package/next-connect) - Next.js routing and middleware
-   [bcrypt](https://www.npmjs.com/package/bcryptjs) - password hashing with salting
-   [uuid](https://www.npmjs.com/package/uuid) - creates uuid's (universally unique identifier) used in database logic
-   [Next.js with mongodb](https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose) - An example to connect Next.js with MongoDB
-   [Next.js with Passport.js](https://github.com/vercel/next.js/tree/canary/examples/with-passport) - An example to use Next.js with Passport.js for authentication
-   [react-map-gl](https://visgl.github.io/react-map-gl/) - React wrapper for Mapbox GL JS
-   [use-supercluster](https://www.npmjs.com/package/use-supercluster) - A hook for using Supercluster with React.
-   [react-icons](https://react-icons.github.io/react-icons/) - Popular icons that can be easily implemented in React.
-   [react-map-gl-geocoder](https://www.npmjs.com/package/react-map-gl-geocoder) - React wrapper for mapbox-gl-geocoder for use with react-map-gl.

## Information Sources

Articles that have been helpful:

-   [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
-   [Hooks API reference](https://reactjs.org/docs/hooks-reference.html)
-   [Using Mapbox GL with React](https://blog.logrocket.com/how-to-use-mapbox-gl/)
-   [Fix for Markers don't stick to Map when maxBounds are set](https://github.com/visgl/react-map-gl/issues/786#issuecomment-861101046)
-   [How to connect MongoDB Atlas with a Next.js App](https://www.techomoro.com/how-to-connect-mongodb-atlas-with-a-next-js-app/)
-   [Mapbox Marker Clustering in React](https://morioh.com/p/4e3a9a52a0c8)

## Bonus Features

_It would be cool to add some other functionalities such as:_

-   **Edit friend info** from friend cards
-   **Toggle map layer** with friends' names and local times
-   **Toggle dark/light theme** - with button in top right corner
-   Some form of communication ability between users
-   Choice in 24 or 12 clock format for display

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies:

```
npm i
```

> Note:
> The app needs the following environment variables (defined in .env.local) to run locally:
> MONGODB_URI="mongodb+srv://username:password@cluster0.pmu5k.mongodb.net/name-of-db?retryWrites=true&w=majority"
> MONGODB_DB="name-of-db"
> TOKEN_SECRET="some-kind-of-a-secret-token-with-at-least-32-characters"
> NEXT_PUBLIC_MAP_TOKEN="mapbox api access token" // Register for token at: mapbox.com
> NEXT_PUBLIC_GEO_TOKEN="ipgeolocation api token" // Register for token at: ipgeolocation.io

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
