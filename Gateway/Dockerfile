FROM node:16-alpine

WORKDIR /app/Gateway

COPY package.json /app/Gateway

RUN yarn install

EXPOSE 5000

COPY . .

CMD yarn start