FROM node:latest

WORKDIR /wallet

COPY . .

RUN npm i -y

EXPOSE ${PORT}

CMD ["npm", "run", "start"]
