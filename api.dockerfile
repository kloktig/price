FROM node:12.10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV docker
ENV PORT 30000

EXPOSE 30000

CMD [ "npm", "run", "server" ]
