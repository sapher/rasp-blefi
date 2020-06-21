import bleno, { PrimaryService } from '@abandonware/bleno';
import utils from 'util';
import Network from '../network';
import NetworkStatusCharacteristic from './network-status.characteristic';
import NetworkCredentialCharacteristic from './network-credential.characteristic';
import NetworkSsidCharacteristic from './network-ssid.characteristic';

/**
 * BLE service for Network
 * @param network - network
 */
function NetworkService(network: Network) {
  bleno.PrimaryService.call(this, {
    uuid: 'fff1',
    characteristics: [
      // @ts-ignore
      new NetworkStatusCharacteristic(network),
      // @ts-ignore
      new NetworkCredentialCharacteristic(network),
      // @ts-ignore
      new NetworkSsidCharacteristic(network),
    ],
  });
}

utils.inherits(NetworkService, PrimaryService);

export default NetworkService;
