FROM node:16-alpine

EXPOSE ${PORT}

WORKDIR /user/app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]