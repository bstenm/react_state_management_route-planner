import React from 'react';
import './App.css';
import Map from '../Map';
import LeafletApiLoader from '../LeafletApiLoader';
import WaypointPanel from '../WaypointPanel';

const App = () => (
      <div className="App">
            <LeafletApiLoader>{props => <Map {...props} />}</LeafletApiLoader>
            <WaypointPanel />
      </div>
);

export default App;
