import { createLogger, format, transports } from 'winston';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';

// Set log level
const env = (process.env['BLEFI_LOG'] ?? 'INFO').toLowerCase();
const silent = !['trace', 'debug', 'info', 'warn', 'error'].includes(env);
const level = silent ? 'debug' : env;

const consoleOptions: ConsoleTransportOptions = {
  level,
  silent,
  format: format.combine(format.simple(), format.timestamp()),
};

export const logger = createLogger({
  transports: [new transports.Console(consoleOptions)],
});
