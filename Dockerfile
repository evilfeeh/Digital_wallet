FROM node:latest

WORKDIR /digital_wallet

COPY . /digital_wallet/

RUN npm i -y

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]
