# Base Stage for all following stages
# called first to install deps and profit of caching
FROM node:16-alpine as base
# Set the working directory
WORKDIR /app

# install dependencies
COPY package*.json .
RUN yarn install

# App Stage
FROM base as app
EXPOSE $PORT
WORKDIR /app

COPY . .

ENTRYPOINT ["yarn", "start"]