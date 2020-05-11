# 🥁 Tap the Beat

A simple game to train your beat sense

DEMO: https://tap-the-beat.netlify.app/
[![Netlify Status](https://api.netlify.com/api/v1/badges/25519be7-87d2-4238-9bc4-cd3d28988e52/deploy-status)](https://app.netlify.com/sites/tap-the-beat/deploys)

## How to Play

Basicly all you need to do is **hit the space** as a beat ticks. If you hit within < 80ms after the beat, you'll get 10 points. If 81-120 ms, you'll get 5 points. Otherwise you don't get any point at all.

There's a changing color circle at the center of the page to help you visualize the beat.

Steps:
- Open https://tap-the-beat.netlify.app/
- Click one of the four songs available
- I'd recommend picking "Cancer - MCR" cause the beat is slow so it's easy to play around
- Hit space to start playing the game

## Available Scripts

In the project directory, you can run:

- `yarn dev`: Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `yarn test`: Launches the test runner in the interactive watch mode
- `yarn build`: Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Folder Structure

I decided to structure the application based on domains. Please note that currently this little app has only one domain: `game`.

`shared` is a directory dedicated to anything not related to any domains.

Learn more:
- [Domain-Driven File Structuring -React/Redux](https://medium.com/@hassan.djirdeh/domain-driven-react-redux-a474ecf7d126)
- [Domain directory structure for React apps: why it’s worth trying](https://tech.offgrid-electric.com/domain-directory-structure-for-react-apps-why-its-worth-trying-b3855ee77a1e)

## Libraries

- [SWR](https://swr.now.sh/) for data fetching
- [Material UI](https://material-ui.com/) for looks and feel in general