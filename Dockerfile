FROM oraclelinux:7-slim

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

# RUN node --version && \ npm --version && \ 
#echo Installed app keralty-ms-full
COPY . /app

CMD DEBUG=microservicios:* npm start
