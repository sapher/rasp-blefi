const { NetworkConfigurator } = require('./dist');

const deviceName = process.env['BLEFI_DEVICE_NAME'];
const ifName = process.env['BLEFI_IF_NAME'];

const config = {
  deviceName,
  ifName,
  customServices: [],
};

new NetworkConfigurator(config);
