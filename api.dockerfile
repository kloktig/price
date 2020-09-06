FROM node:12.10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/

COPY ./src /usr/src/
ENV NODE_ENV docker
ENV PORT 30000

RUN npm ci
RUN npm run build:all

EXPOSE 30000

WORKDIR /usr/src/app

CMD [ "npm", "run", "server" ]
