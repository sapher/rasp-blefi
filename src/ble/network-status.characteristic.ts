import bleno, { Characteristic } from '@abandonware/bleno';
import utils from 'util';
import Network from '../network';
import { logger } from '../utils/logger';

/**
 * BLE characteristic for Network connection status
 * @summary Hold the current connection status of the network
 * @param network - network
 */
function NetworkStatusCharacteristic(network: Network) {
  this.network = network;
  this.timer = null;
  this._updateValueCb = null;
  this.subs = 0;
  this.status = undefined;

  bleno.Characteristic.call(this, {
    uuid: 'fff1',
    properties: ['read', 'notify'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: '',
      }),
    ],
    onReadRequest: (_offset: number, cb: Function) => {
      logger.info('bluetooth on read request network status characateristic');
      (this.network as Network)
        .getStatus()
        .then(status => cb(this.RESULT_SUCCESS, Buffer.from(status)))
        .catch((err: unknown) => {
          logger.error('unable to get network status', { err });
          cb(this.RESULT_UNLIKELY_ERROR);
        });
    },
    onSubscribe: (_maxValueSize: number, updateValueCb: Function) => {
      logger.info('bluetooth on subscribe network status characateristic');
      this._updateValueCb = updateValueCb;

      // Create interval
      if (this.subs === 0) {
        this.timer = setInterval(async () => {
          logger.debug('bluetooth ');
          // First time initialization
          if (this.status === undefined) {
            logger.debug('bluetooth status first initialization');
            this.status = await (this.network as Network).getStatus();
            this._updateValueCb(Buffer.from(this.status));
            return;
          }

          // Check if status has changed
          if ((this.network as Network).hasStatusChanged(this.status)) {
            logger.debug('bluetooth status has changed', {
              status: this.status,
            });
            this.status = await (this.network as Network).getStatus();
            this._updateValueCb(Buffer.from(this.status));
            return;
          }
        }, 3000);
      }

      // Update numbers of subscription
      this.subs = this.subs + 1;
    },
    onUnsubscribe: () => {
      logger.info('bluetooth on unsubscribe network status characateristic');
      // Clear timer
      this.subs = this.subs - 1;
      if (!this.subs) {
        clearInterval(this.timer);
      }
    },
  });
}

utils.inherits(NetworkStatusCharacteristic, Characteristic);

export default NetworkStatusCharacteristic;
