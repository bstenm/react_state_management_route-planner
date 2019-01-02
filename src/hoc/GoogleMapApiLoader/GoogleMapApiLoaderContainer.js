import React from 'react';
import loadjs from 'loadjs';
import cf from '../../config/index';
import log from '../../services/Log';

export const wrapper = WrappedComponent => {
      class Wrapper extends React.Component {
            constructor(props) {
                  super(props);
                  this.state = {
                        googleMap: null,
                        googleMapError: null,
                  };
            }

            componentDidMount() {
                  loadjs(this.buildUrl(), {
                        success: () => {
                              this.setState({
                                    googleMap: window.google.maps,
                                    googleMapError: null,
                              });
                        },
                        error: () => {
                              const googleMapError =
                                    'Could not load the Google Elevation Service';
                              log.error(googleMapError);
                              this.setState({
                                    googleMapError,
                                    googleMap: null,
                              });
                        },
                  });
            }

            buildUrl = () => {
                  const { url, version } = cf.googleMapApi;
                  const params = {
                        key: process.env.REACT_APP_GOOGLE_MAP_API,
                        v: version,
                        libraries: 'places',
                  };
                  const paramStr = Object.keys(params)
                        .filter(k => !!params[k])
                        .map(k => `${k}=${params[k]}`)
                        .join('&');
                  return `${url}?${paramStr}`;
            };

            render() {
                  const props = Object.assign({}, this.props, this.state);
                  return <WrappedComponent {...props} />;
            }
      }

      return Wrapper;
};

export default wrapper;
