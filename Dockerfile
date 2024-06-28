FROM node:20.9.0

WORKDIR /digital_wallet

COPY . /digital_wallet/

RUN npm i -y

RUN npm run build

EXPOSE ${PORT}

CMD ["node", "-r", "dotenv/config", "./dist/adapters/inbound/express/server.js"]
