import React from 'react';
import './App.css';
import Map from '../Map';
import LeafletApiLoader from '../LeafletApiLoader';

const App = () => (
      <div className="App">
            <LeafletApiLoader>{props => <Map {...props} />}</LeafletApiLoader>
      </div>
);

export default App;
