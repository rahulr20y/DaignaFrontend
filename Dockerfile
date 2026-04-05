# pull the base image
FROM node:18-alpine AS development
ENV NODE_ENV development
ENV NODE_OPTIONS=--openssl-legacy-provider

# set the working direction
WORKDIR /app

RUN apk add --no-cache git

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
COPY package-lock.json .

RUN npm install --legacy-peer-deps

# add app
COPY . .

EXPOSE 3000

# start app
CMD ["npm", "start"]