FROM node:20-alpine

RUN apk update
RUN apk add vim nano

WORKDIR /home/app/api

COPY prisma ./prisma/
COPY package*.json ./

RUN npm install -g yarn --f
RUN yarn 

COPY . .

RUN yarn prisma generate

CMD ["yarn", "dev"]