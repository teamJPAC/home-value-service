# # 5MB vs 650MB with full node.js image
# FROM node:8.12-alpine

# # set our node environment, either development or production
# # defaults to production, compose overrides this to development on build and run
# ARG NODE_ENV=production
# ENV NODE_ENV $NODE_ENV

# # default to port 3000 for node, and 9229 and 9230 (tests) for debug
# ARG PORT=3000
# ENV PORT $PORT
# EXPOSE $PORT 9229 9230

# ENV NODE_VERSION 6.14.4

# RUN npm i npm@latest -g

# # install dependencies first, in a different location for easier app bind mounting for local development
# WORKDIR /opt
# COPY package.json package-lock.json* ./
# RUN npm install && npm cache clean --force && npm audit fix
# ENV PATH /opt/node_modules/.bin:$PATH



# # copy in our source code last, as it changes the most
# WORKDIR /opt/app
# COPY . .



# # Docker runs container as root by default, which can pose security threats
# USER node


# # CMD ["node", "./bin/www"]
# CMD ["npm", "start"]


# if you're doing anything beyond your local machine, please pin this to a specific version at https://hub.docker.com/_/node/
# FROM node:8-alpine also works here for a smaller image
FROM node:8

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 3000 for node, and 9229 and 9230 (tests) for debug
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

# you'll likely want the latest npm, regardless of node version, for speed and fixes
# but pin this version for the best stability
RUN npm i npm@latest -g

# install dependencies first, in a different location for easier app bind mounting for local development
WORKDIR /opt
COPY package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

# check every 30s to ensure this service returns HTTP 200

# copy in our source code last, as it changes the most
WORKDIR /opt/app
COPY . /opt/app

# the official node image provides an unprivileged user as a security best practice
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node

# if you want to use npm start instead, then use `docker run --init in production`
# so that signals are passed properly. Note the code in index.js is needed to catch Docker signals
# using node here is still more graceful stopping then npm with --init afaik
# I still can't come up with a good production way to run with npm and graceful shutdown
CMD [ "node", "./bin/www" ]