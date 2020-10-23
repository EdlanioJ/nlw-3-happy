FROM node:12-alpine

RUN mkdir -p /home/server

WORKDIR /home/server

COPY package.json /home/server

RUN yarn

COPY . .

EXPOSE 3333
