# Builder
FROM node:14-buster-slim as builder
WORKDIR /app
# shared dependencies
RUN apt-get update
RUN apt-get install -y bluetooth bluez libbluetooth-dev libudev-dev wpasupplicant wireless-tools
RUN apt-get install -y build-essential python3
COPY . .
RUN npm install && \
  npm run build && \
  rm -rf node_modules && \
  npm install --production

# Application
FROM node:14-buster-slim
ENV BLEFI_LOG 'info'
ENV BLEFI_DEVICE_NAME 'rasp-blefi'
ENV BLEFI_IF_NAME 'wlan0'
WORKDIR /app
# shared dependencies
RUN apt-get update
RUN apt-get install -y bluetooth bluez libbluetooth-dev libudev-dev wpasupplicant wireless-tools
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app /app
CMD ["node", "docker_app.js"]
