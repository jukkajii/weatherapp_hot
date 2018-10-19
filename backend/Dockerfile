FROM node:8.1.0

RUN mkdir -p /usr/src/weatherapp/backend

WORKDIR /usr/src/weatherapp/backend

# add to $PATH
ENV PATH /usr/src/weatherapp/backend/node_modules/.bin:$PATH

COPY package.json /usr/src/weatherapp/backend

RUN npm install

COPY . /usr/src/weatherapp/backend

EXPOSE 9000

CMD ["npm","start"]
