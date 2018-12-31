import './WaypointPanel.css';
import React from 'react';
import WaypointList from '../WaypointList';
import WaypointPanelHeader from '../WaypointPanelHeader';

const WaypointPanel = () => (
      <div className="WaypointPanel">
            <WaypointPanelHeader />
            <WaypointList />
      </div>
);

export default WaypointPanel;
