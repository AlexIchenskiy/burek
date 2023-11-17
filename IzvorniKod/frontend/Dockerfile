FROM node:16 AS builder

WORKDIR /app

COPY src src
COPY public public
COPY package.json .

RUN npm i
RUN npm run build

FROM nginx:latest

COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html
