
A cross-country route planner without 3rd party libraries.

[![Build Status](https://travis-ci.org/bstenm/route-planner.svg?branch=master)](https://travis-ci.org/bstenm/route-planner) [![Coverage Status](https://coveralls.io/repos/github/bstenm/route-planner-draft/badge.svg?branch=master)](https://coveralls.io/github/bstenm/route-planner?branch=master) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=bstenm/route-planner)](https://dependabot.com)

#### Running the app

You need to add a .env file to the root of the project containing 2 environment variables:
- `REACT_APP_MAPBOX_ACCESS_TOKEN=<YOUR MAPBOX ACCESS TOKEN>`
- `REACT_APP_GOOGLE_MAP_API=<YOUR GOOGLE MAPI API KEY>`

#### No 3rd party React Components

In a real life prject I would probably have used:
      - [React Beautiful Dnd](https://github.com/atlassian/react-beautiful-dnd) for the waypoints drag and drop
      - [React Bootstrap](https://react-bootstrap.github.io/) for responsive layout

#### Design Choices

##### React Context vs Redux (state mangement)

- The waypoints are managed by [Redux](https://redux.com) for showcasing: Redux is overkill for such a small app but most apps don't stay that small for very long.

- The geo json data (used to create the gpx) is managed by React Context.  for such a small app I would probably use React Context for all state management (including for the waypoints) in normal circumstances.

##### Apis

- The [Leaflet Api](leaflet-api) is used for the map interactivity, the [Google Map Api loader](google-map-api)  is only used to provide elevation data for each waypoint.

- There should be security considerations when using an Api key for the [Google Map Api loader](google-map-api) for any project: see [Securing an API key](https://cloud.google.com/docs/authentication/api-keys#securing_an_api_key). In fact it is recommended to use [Service accounts](https://cloud.google.com/docs/authentication/getting-started) instead.

##### HOC vs Render Prop

- The [Google Map Api loader](google-map-api) is written as a high order component but the [Leaflet Api](leaflet-api) is written using the Render Prop patterm.  This is again for showcasing: both patterns serve the same purpose.

For a presentation on the Render Prop pattern see [Render Props vs HOC (video)](https://www.youtube.com/watch?v=BcVAq3YFiuc).

##### Note on performance

We request the elevation data each time a new waypoint is chosen/updated. It introduces a slight delay the showing but that is negligible and worth it as the elevation data is valuable information for a cross country route.

##### Note on test writing style

The tests are written using limited nesting (few "describe" blocks) and the set ups ("beforeAll"/"beforeEach") are generally limited to resetting mocks. This is for readability/maintanability purposes, and follows a current trend in the community (see [Writing Tests](https://facebook.github.io/create-react-app/docs/running-tests#writing-tests)): Multiples nesting can make sense for logical groupings but can very quickly lead to confusing  and difficult to maintain test suites.

#### Automation

#### Continuous Integration

After each push to the [Git](https://github.com/bstenm/route-planner) repository [Travis](https://travis.org) will"
- Run the tests and send the coverage report to [Coveralls](https://coveralls.io/), run the build process and then deploy it to [AWS S3](https://aws.amazon.com/s3/). It will be hosted on that link: [Route Planner](my-route-planner.s3-website-us-east-1.amazonaws.com).

##### Git hook

[Husky](https://www.npmjs.com/package/husky) runs the linter on the files staged before any git commit.

#### Commands

##### `yarn prettier`

Runs prettier on all your source files.

##### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

##### `yarn test`

Launches the test runner with enzyme set up in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

##### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

[google-map-api]: https://cloud.google.com/maps-platform/
[leaflet-api]: leafletjs.com