FROM node:16-alpine

EXPOSE ${PORT}

WORKDIR /user/app/src

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]