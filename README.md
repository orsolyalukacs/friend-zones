# Design Overview

## Overview

The main idea behind this project is to create a web app that displays a user's friends, and their associated timezones, in relation to the timezone of the user.

## Basic Pages and Functionalities

### Splash

Welcoming page displaying brief information about the site, and asks users to either Login or Register.

### Registration

Page that consists of a registration form for new users, asking them to provide the following info:

-   username
-   email
-   password
-   password verification
-   timezone (from dropdown) or maybe it could read this in from IP, and autofill

The page will check that these fields are valid, and upon success will redirect user to the index page, if any of these fields are filled out incorrectly, the user will be prompted with an alert, or redirected to an error page.

### Login

Allows users to login with username or email. Upon success redirects user to the index page. Inputting incorrect information will prompt an alert or redirect user to an error page.

### Navigation

A simple top nav bar that dynamically displays certain options depending on whether or not the user is logged in:

-   Login
-   Logout
-   Home
-   Register

## Dashboard

This page will pull in the data from the db (to be displayed and not altered). The top will **DisplayOffsets** that will show the timezone offset for each area of the map, and will update with a clock if the User has a friend in that specific offset. This may be part of the top of the map component itself, if a layer can be added via the mapbox api: [Custom Style Layer](https://docs.mapbox.com/mapbox-gl-js/example/custom-style-layer/). Or it should be separate.

There will also be a **Map** which will display markers for the user, and all of their friends. The friends will be **Marker** components (from the react map gl library) that will generate **Popups** containing more detailed information upon clicking them.

### SSR for Dashboard

-   Only allow to display Dashboard route if user is logged in
-   Switch NavBar from 'Log in' to 'Log out' after sign in immediately

### Dashboard Mobile

Maybe for mobile, we could have a slider button at the top to switch between clock, and map displays.

## Friends / Management

This page will allow Users to add friends to the db via combination of **AddFriend** and **AddFriendMap**. The form will ask for the friend's name and get the lat/long coordinates via click from the map. These coordinates will be used and passed to the ipgeolocation api to generate the rest of the friend info, creating a friend object that looks like:

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

This object will be sent to the User db/ update the user's friend list (This friendlist will be an array of friend objects that is another field in the User document.) There will also be a **FriendPanel** that allows the User to update, and delete their friends.

## User settings

-   A page to Edit user's info/settings while logged in

## Tech

Open source projects that helped us along the way:

-   [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces
-   [Next.js](https://nextjs.org/) - Full-stack React framework with built-in Server-Side Rendering (SSR)
-   [MongoDB](https://www.mongodb.com/) - Document-oriented database
-   [mongoose](https://mongoosejs.com/) - schema-based solution to model data for MongoDB
-   [CSS Modules] - Component-scoped CSS
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
-   [react-map-gl-geocoder](https://www.npmjs.com/package/react-map-gl-geocoder) - React wrapper for mapbox-gl-geocoder for use with react-map-gl.

## Bonus Features

If we have time it might be cool to add some other functionalities such as :

-   Light and Dark Mode Settings
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

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
