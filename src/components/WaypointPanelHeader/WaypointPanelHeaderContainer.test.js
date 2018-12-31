import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import WaypointPanelHeader from './WaypointPanelHeader';
import WaypointPanelHeaderContainer from './WaypointPanelHeaderContainer';
import GeoJsonDataProvider, {
      GeoJsonDataContext,
} from '../GeoJsonDataProvider';

let wrapper;

class Component extends React.Component {
      static propTypes = {
            updateGeoJsonData: PropTypes.func.isRequired,
      };

      componentDidMount = () => {
            this.props.updateGeoJsonData({
                  some: 'geo json data',
            });
      };

      render() {
            return <div />;
      }
}

beforeEach(() => {
      const ComponentWithContext = () => (
            <GeoJsonDataContext.Consumer>
                  {context => (
                        <Component
                              updateGeoJsonData={context.updateGeoJsonData}
                        />
                  )}
            </GeoJsonDataContext.Consumer>
      );

      // we need to wrap it into the context provider to simulate that
      // WaypointPanelHeaderContainer was mounted inside the app
      wrapper = mount(
            <GeoJsonDataProvider>
                  <ComponentWithContext />
                  <WaypointPanelHeaderContainer />
            </GeoJsonDataProvider>,
      );
});

// WaypointPanelHeaderContainer
it('Displays a WaypointPanelHeader component', () => {
      expect(wrapper.find(WaypointPanelHeader).length).toEqual(1);
});

// WaypointPanelHeaderContainer prop:
it('Passes the geo json data to WaypointPanelHeader component as prop', () => {
      expect(wrapper.find(WaypointPanelHeader).props().geoJsonData).toEqual({
            some: 'geo json data',
      });
});
