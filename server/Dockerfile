# note: must be built from project root dir
# docker build -t game-server -f ./server/Dockerfile .
FROM node:17-alpine

WORKDIR /usr/src/app
COPY types types
COPY server server

WORKDIR /usr/src/app/types
RUN npm install

WORKDIR /usr/src/app/server
RUN npm install
EXPOSE 8080
CMD [ "npm", "start" ]