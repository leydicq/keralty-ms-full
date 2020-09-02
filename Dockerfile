FROM oraclelinux:7-slim

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
ADD . /app

RUN node --version && \
  npm --version && \
  echo Installed app keralty-ms-full

CMD DEBUG=microservicios:* npm start
