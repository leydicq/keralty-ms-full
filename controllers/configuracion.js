const config = require('../db_apis/configuracion');

async function getConfiguracionTarjetas(req, res, next) {
  try {
    const context = {};
    //console.log("prueba...."+req.params.idUsuario);
    context.idUsuario = parseInt(req.params.idUsuario, 10);
    const rows = await config.findConfiguracionTarjetas(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(200).json({ mensaje: "No se encontro información." });
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

async function putConfiguracionTarjetas(req, res, next) {
  try {
    const context = {};
    context.idUsuario = parseInt(req.params.idUsuario, 10);
    context.configuracion = parseInt(req.params.configuracion, 10);
    const nombre = await config.findNombreCompleto(context);

    if (nombre !== null && typeof nombre !== 'undefined' && nombre.length > 0) {
      const rows = await config.putConfiguracionTarjetas(context);
       res.status(200).json({ mensaje: "Se realizo la actualizaciòn." });
    }else{
      res.status(200).json({ mensaje: "No existe el usuario." });
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

async function getNombreCompleto(req, res, next) {
  try {
    const context = {};
    context.idUsuario = parseInt(req.params.idUsuario, 10);
    const rows = await config.findNombreCompleto(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(200).json({ mensaje: "No se encontro información." });
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


async function postReporteIngreso(req, res, next) {
    if(req.body.fechaInicio != null && req.body.fechaFin!= null){
      try {
        const validar = {}; 
        validar.fechaInicio = parseInt(req.body.fechaInicio, 10);
        validar.fechaFin = parseInt(req.body.fechaFin, 10);

        if(validar.fechaInicio > validar.fechaFin ){
          res.status(500).json({ error: "La fecha fin no puede ser menor a la fecha de inicio" });
        }

        const context = {};
        context.fechaInicio = ''+req.body.fechaInicio;
        context.fechaFin = ''+req.body.fechaFin;

        const rows = await config.findReporteIngreso(context);
        if (rows !== null && rows.length > 0) {
          res.status(200).json(rows);
        } else {
          res.status(200).json({ mensaje: "No hubo ingreso a la herramienta en el periodo de tiempo ingresado." });
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
    }else{
      res.status(500).json({ error: "La fecha fin y la fecha de inicio no pueden ser nulas" });
    }    
}


module.exports.getConfiguracionTarjetas = getConfiguracionTarjetas;
module.exports.getNombreCompleto = getNombreCompleto;
module.exports.putConfiguracionTarjetas = putConfiguracionTarjetas;
module.exports.postReporteIngreso = postReporteIngreso;