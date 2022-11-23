FROM node:lts-bullseye-slim
WORKDIR /app
COPY package*.json .
COPY server ./server
COPY client ./client
RUN npm install
RUN npm run build


FROM node:lts-bullseye-slim
WORKDIR /app/server
COPY ./server/package*.json .
RUN npm install --only=production
COPY --from=0 /app/server/dist .
COPY --from=0 /app/client/dist ../client

CMD ["npm", "run", "start:prod"]