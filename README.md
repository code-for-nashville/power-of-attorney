# [Power of Attorney](https://musiccitylegalhackers.github.io/power-of-attorney-challenge/)
Immigrant parents may face detainment or deportation with little warning. Since parents may work in the same location or be in the same location when picked up by ICE/immigration, their children can be left without any legal guardian. When picked up by ICE/Immigration, parents are often unavailable or inaccessible for days or weeks (and can even be deported before ever having access to their children or family). Parents can sign a power of attorney for the minor children to give guardianship of their child to someone they trust, which takes effect only if they are detained or deported.

This project was bootrapped using [Create React App](), and includes some portions of the [Create React App User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) particularly relevant to the project in the README.  Check out [the full guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) for a complete list of functionality and answers to common questions.

## Installation
Make sure you have [`yarn`](https://yarnpkg.com/) and a recent version of [`node.js`](https://nodejs.org/en/) installed.  Clone this repository, and run

```
yarn install
```

in the root to install dependencies.  This app comes configured with a few useful commands for development and deployment:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits to both JS, CSS, and SCSS.<br>
You will also see any lint errors in the console.

### `yarn watch-css`

Watches changes to your sass files for development.

### `yarn build-css`

Compiles sass files into css for production

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `yarn deploy`

Builds the app for production and deploys it to Github Pages.

Note: You'll need write access to the `gh-pages` branch of our repository to run this command.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them.

## Styling
This project is built with [Grommet](http://grommet.io/), and ships with a custom [SCSS](http://sass-lang.com/) Grommet theme in  `styles/grommet/`.

SCSS file will be automatically watched and built when you run `yarn start`.  The built `.css` output will have the same filename and live in the same directory as it's `.scss` counterpart.  Make sure to import the `.css` output in JavaScript files, not the raw `.scss`.  Create React App is not configured to import `.scss`.

## Debugging in the Editor

**This feature is currently only supported by [Visual Studio Code](https://code.visualstudio.com) and [WebStorm](https://www.jetbrains.com/webstorm/).**

Start your app by running `yarn start`, and start debugging in VS Code by pressing `F5` or by clicking the green debug icon. You can now write code, set breakpoints, make changes to the code, and debug your newly modified code—all from your editor.

Having problems with VS Code Debugging? Please see their [troubleshooting guide](https://github.com/Microsoft/vscode-chrome-debug/blob/master/README.md#troubleshooting).

### WebStorm

You would need to have [WebStorm](https://www.jetbrains.com/webstorm/) and [JetBrains IDE Support](https://chrome.google.com/webstore/detail/jetbrains-ide-support/hmhgeddbohgjkyarnjagkdomcpobmllji) Chrome extension installed.

In the WebStorm menu `Run` select `Edit Configurations...`. Then click `+` and select `JavaScript Debug`. Paste `http://localhost:3000` into the URL field and save the configuration.

Start your app by running `yarn start`, then press `^D` on macOS or `F9` on Windows and Linux or click the green debug icon to start debugging in WebStorm.

The same way you can debug your application in IntelliJ IDEA Ultimate, PhpStorm, PyCharm Pro, and RubyMine.

## Custom Environment Variables

`process.env.NODE_ENV` can be used to detect the current environment. For example,

```js
if (process.env.NODE_ENV !== 'production') {
  analytics.disable();
}
```

Variables must be prefixed with `REACT_APP_` to be available in HTML.
```html
<title>%REACT_APP_WEBSITE_NAME%</title>
```

`.env` for common variables
`.env.development` for variables only needed during `yarn start`
`.env.production` for variables only needed during `yarn run build`
`.env.test` for variables only needed during `yarn test`


### Offline-First Considerations

1. Users aren't always familiar with offline-first web apps. It can be useful to
[let the user know](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux#inform_the_user_when_the_app_is_ready_for_offline_consumption)
when the service worker has finished populating your caches (showing a "This web
app works offline!" message) and also let them know when the service worker has
fetched the latest updates that will be available the next time they load the
page (showing a "New content is available; please refresh." message). Showing
this messages is currently left as an exercise to the developer, but as a
starting point, you can make use of the logic included in [`src/registerServiceWorker.js`](src/registerServiceWorker.js), which
demonstrates which service worker lifecycle events to listen for to detect each
scenario, and which as a default, just logs appropriate messages to the
JavaScript console.

1. By default, the generated service worker file will not intercept or cache any
cross-origin traffic, like HTTP [API requests](#integrating-with-an-api-backend),
images, or embeds loaded from a different domain. If you would like to use a
runtime caching strategy for those requests, you can [`eject`](#yarn-run-eject)
and then configure the
[`runtimeCaching`](https://github.com/GoogleChrome/sw-precache#runtimecaching-arrayobject)
option in the `SWPrecacheWebpackPlugin` section of
[`webpack.config.prod.js`](../config/webpack.config.prod.js).

### Progressive Web App Metadata

The default configuration includes a web app manifest located at
[`public/manifest.json`](public/manifest.json), that you can customize with
details specific to your web application.

When a user adds a web app to their homescreen using Chrome or Firefox on
Android, the metadata in [`manifest.json`](public/manifest.json) determines what
icons, names, and branding colors to use when the web app is displayed.
[The Web App Manifest guide](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/)
provides more context about what each field means, and how your customizations
will affect your users' experience.
