FROM node:latest

WORKDIR /usr/src/server

COPY package*.json ./

COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

RUN npm install

COPY . .

RUN npm run build