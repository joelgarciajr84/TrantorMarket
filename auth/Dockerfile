
FROM node:16-alpine

WORKDIR /usr/src/app/

ENV NODE_ENV=local

COPY ./package*.json ./

RUN npm install --production

RUN rm -rf node_modules

COPY ./ ./

RUN npm run build

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm start; else npm run start:dev; fi"]
