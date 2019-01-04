export default () =>
      // no reject function as we fail silently
      new Promise(resolve => {
            if (!window.navigator || !window.navigator.geolocation) {
                  resolve({});
            }

            window.navigator.geolocation.getCurrentPosition(
                  ({ coords: { latitude: lat, longitude: lng } }) => {
                        resolve({ lat, lng });
                  },
                  () => resolve({}),
            );
      });
