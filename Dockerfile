FROM node:10.16.3-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/scr/app
RUN yarn
COPY . /usr/src/app
EXPOSE 3000
CMD [ "yarn", "start" ]
