import bleno, { Characteristic } from '@abandonware/bleno';
import utils from 'util';
import Network from '../network';
import { logger } from '../utils/logger';

/**
 * BLE characteristic for Network credential
 * @param network - network
 */
function NetworkCredentialCharacteristic(network: Network) {
  this.network = network;
  bleno.Characteristic.call(this, {
    uuid: 'fff2',
    properties: ['write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: '',
      }),
    ],
    onWriteRequest: (
      data: Buffer,
      offset: number,
      _withoutResponse: any,
      cb: Function
    ) => {
      logger.info('bluetooth read network credential characateristic');
      if (offset) {
        cb(this.RESULT_ATTR_NOT_LONG);
      } else if (data.length > 32 || data.length <= 0) {
        cb(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
      } else {
        // Parse credentials
        const credentials = data.toString('utf-8');
        const [ssid, pwd] = credentials.split(' ');

        // Input vaidations
        if (!ssid) {
          logger.error('network ssid is empty', { ssid });
          cb(this.RESULT_UNLIKELY_ERROR);
          return;
        }

        // Configue network
        (this.network as Network)
          .configureNetwork(ssid, pwd)
          .then(() => {
            logger.info('network successfully configured');
            cb(this.RESULT_SUCCESS);
          })
          .catch((err: unknown) => {
            logger.error('unable to configure network', { err });
            cb(this.RESULT_UNLIKELY_ERROR);
          });
      }
    },
  });
}

utils.inherits(NetworkCredentialCharacteristic, Characteristic);

export default NetworkCredentialCharacteristic;
