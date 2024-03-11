FROM node:20-alpine

COPY package.json /

RUN npm install

COPY . .

EXPOSE 3100

CMD [ "node", "server.js"]