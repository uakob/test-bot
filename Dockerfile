FROM node:12.1.0-alpine

LABEL maintainer="Timofey Sidorov <timofej.sidorov@goods.ru>"

ENV APP_DIR /server
ENV NPM_CONFIG_LOGLEVEL error

RUN mkdir -p ${APP_DIR}/app
WORKDIR ${APP_DIR}

RUN apk --update add git

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY tsconfig.json .

COPY src src
COPY config config

RUN npm run build

ENV APP_DIR /server

WORKDIR ${APP_DIR}

ENV TZ=Europe/Moscow
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && date

RUN ls -al ./app

EXPOSE 4000

CMD npm run start

