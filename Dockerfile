FROM node:16-alpine
WORKDIR /app/server

COPY ./server/package*.json .
COPY ./server/dist .

RUN npm install

COPY ./client/dist ../client

CMD ["npm", "run", "start:prod"]