FROM node:20

WORKDIR /digital_wallet

COPY . /digital_wallet/

RUN npm i -y

RUN npm run build

EXPOSE ${PORT}

CMD ["nodemon", "-r", "dotenv/config", "./dist/adapters/express/server.js"]
