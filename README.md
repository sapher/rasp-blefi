# RASP-BLEFI

Experimental project that allow headless configuration of WIFI network on Rasperry PI using BLE.

## Usage

### Integrate with NodeJS

You can install the project with the following command :

```shell script
npm install -S rasp-blefi
```

Then you can import the library :

```typescript
import { NetworkConfigurator } from 'rasp-blefi';
```

You can then instantiate the library with :

```typescript
const deviceName = 'device_name'; // Advertised BLE device name
const ifName = 'wlan0'; // Interface name of wifi network
const customServices = []; // you can inject user defined BLE service here

const nc = new NetworkConfigurator({
  deviceName,
  customServices,
  ifName,
});
```

With the custom services you can inject user defined BLE services. You can follow the @abandonware/bleno project to understand how to create custom services, charactistics and descriptors.

You can enable logs by setting the environment variable `BLEFI_LOG` to one of these values `info`, `trace`, `error`, `warn` or `debug`.

### Run with docker

You can also run the project as a standalone container on your raspberry pi.

Build the docker container:

```shell script
docker build -t rasp-blefi .

// or with make
make build_image
```

Then you can run the image with

```
docker run -it --rm  --cap-add=SYS_ADMIN --cap-add=NET_ADMIN --net=host -v /var/run/wpa_supplicant/:/var/run/wpa_supplicant/ rasp-blefi
```

You can pass environment variables in order to customize the behavior

| Name              | Description               | Default       |
| ----------------- | ------------------------- | ------------- |
| BLEFI_IF_NAME     | Network interface name    | `wlan0`       |
| BLEFI_DEVICE_NAME | Advertise BLE device name | `rasp-bluefi` |
| BLEFI_LOG         | Log level                 | `info`        |

## Links

- [NPM package: @abandonware/bleno](https://github.com/abandonware/bleno)
