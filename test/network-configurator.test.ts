import { NetworkConfigurator } from '../src/network-configurator';

describe('NetworkConfiguration', () => {
  let networkConfiguration: NetworkConfigurator | null;

  it('should get instance of network configuration', () => {
    networkConfiguration = new NetworkConfigurator({
      deviceName: 'device',
      ifName: 'wlan0',
    });
    expect(networkConfiguration).toBeInstanceOf(NetworkConfigurator);
  });

  afterEach(() => {
    networkConfiguration = null;
  });
});
