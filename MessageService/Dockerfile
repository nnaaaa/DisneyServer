FROM node:16-alpine

WORKDIR /app/MessageService

COPY package.json /app/MessageService

RUN yarn install

COPY . .

CMD yarn start