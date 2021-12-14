# Design Overview

## Overview
The main idea behind this project is to create a web app that displays a user's friends, and their associated timezones, in relation to the timezone of the user.

## Basic Pages and Functionalities
### Splash
Welcoming page displaying brief information about the site, and asks users to either Login or Register.

### Registration
Page that consists of a registration form for new users, asking them to provide the following info:
- username
- email
- password
- password verification
- timezone (from dropdown) or maybe it could read this in from IP, and autofill

The page will check that these fields are valid, and upon success will redirect user to the index page, if any of these fields are filled out incorrectly, the user will be prompted with an alert, or redirected to an error page.

### Login
Allows users to login with username or email. Upon success redirects user to the index page. Inputting incorrect information will prompt an alert or redirect user to an error page.

### Navigation
A simple top nav bar that dynamically displays certain options depending on whether or not the user is logged in:
- Login
- Logout
- Home
- Register

## Bonus Features
If we have time it might be cool to add some other functionalities such as :
- Light and Dark Mode Settings
- Some form of communication ability between users
- Choice in 24 or 12 clock format for display

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
