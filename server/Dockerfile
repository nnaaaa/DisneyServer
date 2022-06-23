FROM node:14-alpine

WORKDIR /app/

COPY package.json yarn.lock /app/

RUN yarn install

EXPOSE 5000

COPY . .

CMD yarn start