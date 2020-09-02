module.exports = {
  hrPool_: {
    user: process.env.ORA_USER_MONITOR,
    password: process.env.ORA_PASSWORD_MONITOR,
    connectString: process.env.ORA_CONNECTIONSTRING_MONITOR,
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  },

  hrPool: {
    user: process.env.ORA_USER_MONITOR = "USURIPSSDF",
    password: process.env.ORA_PASSWORD_MONITOR = "Desaripss2019",
    connectString: process.env.ORA_CONNECTIONSTRING_MONITOR = "srvvdesabd-scan.colsanitas.com:1521/DRIPSSDF",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
};


