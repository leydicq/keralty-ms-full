const afiliado = require('../db_apis/afiliado.js');

async function getAfiliadoPrioridadUno(req, res, next) {
  try {
    const context = {};
    
    context.tipoIdentificacion = req.params.tipoIdentificacion;
    context.numeroIdentificacion = ''+req.params.numeroIdentificacion;
    const rows = await afiliado.findAfiliadoPrioridadUno(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(200).json({ mensaje: "El Número de identificación no existe." });
    }
  } catch (err) {
    //console.log(err);
    if(err.message.indexOf("NJS-047") !== -1 ){
      res.status(500).json({ error: "Error en la conexión a la base de datos" });
    }else{
      if(err.message.indexOf("ORA-12170") !== -1 ){
        res.status(500).json({ error: "Error: timeout de la conexión de la base de datos" });
      }else{
        next(err);
      }
    }    
  }
}

async function getAfiliadoPrioridadDos(req, res, next) {
  try {
    const context = {};
    
    context.tipoIdentificacion = req.params.tipoIdentificacion;
    context.numeroIdentificacion = ''+req.params.numeroIdentificacion;
    const rows = await afiliado.findAfiliadoPrioridadDos(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(200).json({ mensaje: "El Número de identificación no existe." });
    }
  } catch (err) {
    if(err.message.indexOf("NJS-047") !== -1 ){
      res.status(500).json({ error: "Error en la conexión a la base de datos" });
    }else{
      if(err.message.indexOf("ORA-12170") !== -1 ){
        res.status(500).json({ error: "Error: timeout de la conexión de la base de datos" });
      }else{
        next(err);
      }
    }    
  }
}

async function getAfiliadoUltimoAcceso(req, res, next) {
  try {
    const context = {};
    
    context.tipoIdentificacion = req.params.tipoIdentificacion;
    context.numeroIdentificacion = ''+req.params.numeroIdentificacion;
    const rows = await afiliado.findAfiliadoUltimoAcceso(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(200).json({ mensaje: "No tiene ultimo acceso" });
    }
  } catch (err) {
    if(err.message.indexOf("NJS-047") !== -1 ){
      res.status(500).json({ error: "Error en la conexión a la base de datos" });
    }else{
      if(err.message.indexOf("ORA-12170") !== -1 ){
        res.status(500).json({ error: "Error: timeout de la conexión de la base de datos" });
      }else{
        next(err);
      }
    }    
  }
}

module.exports.getAfiliadoPrioridadUno = getAfiliadoPrioridadUno;
module.exports.getAfiliadoPrioridadDos = getAfiliadoPrioridadDos;
module.exports.getAfiliadoUltimoAcceso = getAfiliadoUltimoAcceso;
