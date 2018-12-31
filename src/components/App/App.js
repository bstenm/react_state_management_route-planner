import React from 'react';
import './App.css';
import Map from '../Map';
import LeafletApiLoader from '../LeafletApiLoader';
import WaypointPanel from '../WaypointPanel';
import GeoJsonDataProvider, {
      GeoJsonDataContext,
} from '../GeoJsonDataProvider';

const App = () => (
      <div className="App">
            <GeoJsonDataProvider>
                  <LeafletApiLoader>
                        {props => (
                              <GeoJsonDataContext.Consumer>
                                    {context => (
                                          <Map
                                                {...props}
                                                updateGeoJsonData={
                                                      context.updateGeoJsonData
                                                }
                                          />
                                    )}
                              </GeoJsonDataContext.Consumer>
                        )}
                  </LeafletApiLoader>
                  <WaypointPanel />
            </GeoJsonDataProvider>
      </div>
);

export default App;
