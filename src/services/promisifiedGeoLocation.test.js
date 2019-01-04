import geoLocation from './promisifiedGeoLoaction';

const getUserLocationMock = jest.spyOn(
      window.navigator.geolocation,
      'getCurrentPosition',
);

it('Gets the user location if geolocationis supported', async () => {
      getUserLocationMock.mockImplementation(cb => {
            cb({ coords: { latitude: 'lat', longitude: 'lng' } });
      });
      const coords = await geoLocation();
      expect(coords).toEqual({ lat: 'lat', lng: 'lng' });
});

it('Resolves with empty object if lookup failed', async () => {
      getUserLocationMock.mockImplementation((_, cbFailure) => {
            cbFailure();
      });
      const coords = await geoLocation();
      expect(coords).toEqual({});
});
