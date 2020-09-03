FROM oraclelinux:7-slim

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

# Update Oracle Linux
# Install NodeJS
# Install the Oracle Instant Client
# Check that NodeJS and NPM installed correctly
# Install the OracleDB driver
RUN yum -y install oracle-release-el7 oracle-nodejs-release-el7 && \
  yum-config-manager --disable ol7_developer_EPEL && \
  yum -y install oracle-instantclient19.3-basiclite nodejs && \
  rm -rf /var/cache/yum && \
  node --version && \
  npm --version && \
  npm install express-generator && \
  npm install oracledb
  
COPY ./ /app
CMD DEBUG=microservicios:* npm start
