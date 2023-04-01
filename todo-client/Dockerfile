# Base Stage for all following stages
# called first to install deps and profit of caching
FROM node:16-alpine as base
# Set the working directory
WORKDIR /app

# install dependencies
COPY package*.json .
RUN yarn install

# Build Stage
FROM base as build
# Copy all files/sourcecode from the project
COPY . .
# production build
RUN yarn build

# App Stage
FROM nginx:alpine as app
EXPOSE $PORT
WORKDIR /usr/share/nginx/html
# Remove default nginx assets in workdir
RUN rm -rf ./*
# Copy the build files in the working directory
COPY --from=build /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]