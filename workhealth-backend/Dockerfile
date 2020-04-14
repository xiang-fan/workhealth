FROM node:10-alpine
WORKDIR /usr/src/app

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python \
  bash wget openldap-dev openldap-clients

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]