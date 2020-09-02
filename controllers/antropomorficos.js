const antropomorficos = require('../db_apis/antropomorficos');

async function getDatosAntropometricosPrioridadUno(req, res, next) {
  try {
    const context = {};
    
    context.tipoIdentificacion = req.params.tipoIdentificacion;
    context.numeroIdentificacion = ''+req.params.numeroIdentificacion;
    const rows = await antropomorficos.findDatosAntropometricosPrioridadUno(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(200).json({ mensaje: "El usuario, por el momento, no presenta mediciones antropométricas de peso, tensión y frecuencia." });
    }
  } catch (err) {
    //console.log("error------"+err);
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

async function getDatosAntropometricosPrioridadDos(req, res, next) {
  try {
    const context = {};
    
    context.tipoIdentificacion = req.params.tipoIdentificacion;
    context.numeroIdentificacion = ''+req.params.numeroIdentificacion;
    const rows = await antropomorficos.findDatosAntropometricosPrioridadDos(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(200).json({ mensaje: "El usuario, por el momento, no presenta mediciones antropométricas de peso, tensión y frecuencia." });
    }
  } catch (err) {
    //console.log("error------"+err);
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



async function getDatosAntropometricosGraficaPeso(req, res, next) {  
  try {   
    const context = {}; 
    context.tipoIdentificacion = req.params.tipoIdentificacion;
    context.numeroIdentificacion = ''+req.params.numeroIdentificacion;
    
    const rows = await antropomorficos.findGraficaPeso(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(200).json({ mensaje: "El usuario no tiene peso." });
    }
  } catch (err) {
    //console.log("error------"+err);
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



async function getDatosAntropometricosGraficaTension(req, res, next) {  
  try {   
    const context = {}; 
    context.tipoIdentificacion = req.params.tipoIdentificacion;
    context.numeroIdentificacion = ''+req.params.numeroIdentificacion;
    
    const rows = await antropomorficos.findGraficaTension(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(200).json({ mensaje: "El usuario no tiene tension." });
    }
  } catch (err) {
    //console.log("error------"+err);
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



async function getDatosAntropometricosGraficaFrecuencia(req, res, next) {  
  try {   
    const context = {}; 
    context.tipoIdentificacion = req.params.tipoIdentificacion;
    context.numeroIdentificacion = ''+req.params.numeroIdentificacion;
    
    const rows = await antropomorficos.findGraficaFrecuencia(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(200).json({ mensaje: "El usuario no tiene frecuencia." });
    }
  } catch (err) {
    console.log("error------"+err);
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



module.exports.getDatosAntropometricosPrioridadUno = getDatosAntropometricosPrioridadUno;
module.exports.getDatosAntropometricosPrioridadDos = getDatosAntropometricosPrioridadDos;
module.exports.getDatosAntropometricosGraficaPeso = getDatosAntropometricosGraficaPeso;
module.exports.getDatosAntropometricosGraficaTension = getDatosAntropometricosGraficaTension;
module.exports.getDatosAntropometricosGraficaFrecuencia = getDatosAntropometricosGraficaFrecuencia;