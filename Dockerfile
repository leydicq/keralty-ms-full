FROM oraclelinux:7-slim

WORKDIR /myapp

COPY package.json /app
COPY package-lock.json /app

# RUN node --version && \ npm --version && \ 
#echo Installed app keralty-ms-full
COPY ./ /myapp/

#CMD DEBUG=microservicios:* npm start
echo Docker ejecutado correctamente
