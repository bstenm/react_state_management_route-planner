export default () =>
      // no reject function as we fail silently
      new Promise(resolve => {
            if (!window.navigator || !window.navigator.geolocation) {
                  resolve({});
            }

            window.navigator.geolocation.getCurrentPosition(
                  ({ coords: { latitude: lat, longitude: lng } }) => {
                        // eslint-disable-next-line no-console
                        console.log('>>>>', lat, lng);
                        resolve({ lat, lng });
                  },
                  () => {
                        // eslint-disable-next-line no-console
                        console.log('>>>> FAILED');
                        resolve({});
                  },
            );
      });
