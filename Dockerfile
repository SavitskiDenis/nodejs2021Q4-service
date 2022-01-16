FROM alpine:3.15

EXPOSE ${PORT}

WORKDIR /user/app

RUN apk --no-cache add nodejs npm

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]