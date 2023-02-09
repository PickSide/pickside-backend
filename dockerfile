FROM node:17-alpine as builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

EXPOSE 8000

CMD ["npm", "start"]