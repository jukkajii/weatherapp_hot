
FROM node:8.1.0

RUN mkdir -p /usr/src/weatherapp/frontend

WORKDIR /usr/src/weatherapp/frontend

# add to $PATH
ENV PATH /usr/src/weatherapp/frontend/node_modules/.bin:$PATH

COPY package.json /usr/src/weatherapp/frontend

RUN npm install

COPY . /usr/src/weatherapp/frontend

EXPOSE 80

# start app
CMD ["npm", "start"]
