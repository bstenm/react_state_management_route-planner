import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.navigator.geolocation = {
      getCurrentPosition: cb => {
            cb({ coords: { latitude: 'lat', longitude: 'lng' } });
      },
};
