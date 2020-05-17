
#### Playing with React state management and the [LeafletJS Api](http://leafletjs.com) : A cross-country route planner without 3rd party components.

[![Build Status](https://travis-ci.org/bstenm/route-planner.svg?branch=master)](https://travis-ci.org/bstenm/route-planner) [![Coverage Status](https://coveralls.io/repos/github/bstenm/route-planner-draft/badge.svg?branch=master)](https://coveralls.io/github/bstenm/route-planner?branch=master) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=bstenm/route-planner)](https://dependabot.com)

## Demo

Click here for a [Youtube video demo](https://www.youtube.com/watch?v=OSRMuN44pEE&feature=youtu.be)

## Design choices

### No 3rd party React Components

The waypoints drag and drop is a custom one I build just for fun. I didn't use any 3rd party components such as [React Beautiful Dnd](https://github.com/atlassian/react-beautiful-dnd).
      
### Playing with state mangement

Using 3 different ways to do state management, just for fun.

- The waypoints are managed by [Redux](https://redux.com).
- The geo json data (used to create the gpx) is managed by React Context.
- The drag and drop, the google api loader and the leaflet api loader use local state. 

### Apis

- The [Leaflet Api](http://leafletjs.com) is used for the map interactivity, the [Google Map Api loader](https://cloud.google.com/maps-platform/)  is only used to provide elevation data for each waypoint.

- There should be security considerations when using an Api key for the [Google Map Api loader](https://cloud.google.com/maps-platform/) for any project: see [Securing an API key](https://cloud.google.com/docs/authentication/api-keys#securing_an_api_key). In fact it is recommended to use [Service accounts](https://cloud.google.com/docs/authentication/getting-started) instead.

### HOC vs Render Prop

The [Google Map Api loader](https://cloud.google.com/maps-platform/) is written as a high order component but the [Leaflet Api](http://leafletjs.com) is written using the Render Prop patterm. Both patterns serve the same purpose.

For a presentation on the Render Prop pattern see [Render Props vs HOC (video)](https://www.youtube.com/watch?v=BcVAq3YFiuc).

### Note on performance

We request the elevation data each time a new waypoint is chosen/updated. It slightly delays the showing of the marker but that is negligible and worth it as the elevation data is valuable information for a cross country route.

### Note on test writing style

The tests are written using limited nesting (few "describe" blocks) and the set ups ("beforeAll"/"beforeEach") are generally limited to resetting mocks. This is for readability/maintanability purposes, and follows a current trend in the community (see [Writing Tests](https://facebook.github.io/create-react-app/docs/running-tests#writing-tests)): Multiples nesting can make sense for logical groupings but can very quickly lead to confusing  and difficult to maintain test suites.

## Automation

### Continuous Integration

After each push to the [Git](https://github.com/bstenm/route-planner) repository [Travis](https://travis.org) will"
- Run the tests
- Send the coverage report to [Coveralls](https://coveralls.io/)
- Run the build process
- Deploy it to [AWS S3](https://aws.amazon.com/s3/). It will be hosted on that link: [Route Planner](https://my-route-planner.s3-website-us-east-1.amazonaws.com).

**Note**: The app attempts to center the map at the user's location but it will not work on the demo as the HTML5 geolocation is not supported from pages delivered by [non-secure connections](https://developers.google.com/web/updates/2016/04/geolocation-on-secure-contexts-only) (http as opposed to https). However the demo is simply hosted on AWS S3 and therefore is unsecured (That could be fixed by setting up [Cloudfront](https://aws.amazon.com/cloudfront) and pointing it to our S3 bucket).

### Git hook

[Husky](https://www.npmjs.com/package/husky) runs the linter on the files staged on each any git commit.
