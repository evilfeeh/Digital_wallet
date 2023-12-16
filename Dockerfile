FROM node:latest

WORKDIR /wallet

COPY . .

RUN npm i -y

EXPOSE ${APP_PORT}

CMD ["npm", "run", "start"]
