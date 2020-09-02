const servicio = require('../db_apis/servicio');

async function getServiciosOrdenadosPrioridadUno(req, res, next) {
  try {
    const context = {};
    
    context.tipoIdentificacion = req.params.tipoIdentificacion;
    context.numeroIdentificacion = ''+req.params.numeroIdentificacion;
    const rows = await servicio.findServiciosOrdenadosPrioridadUno(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(200).json({ mensaje: "El usuario no tiene servicios ordenados." });
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

async function postServiciosOrdenadosPrioridadDos(req, res, next) {
  try {
    const context = {};   
    
    if(req.body.fechaInicio!= null && req.body.fechaInicio!= '' && req.body.fechaFin!= null && req.body.fechaFin!= ''){ 
      if(req.body.fechaInicio > req.body.fechaFin ){
        res.status(200).json({ error: "La fecha fin no puede ser menor a la fecha de inicio" });
        return;
      }
      context.fechaInicio = ''+req.body.fechaInicio;
      context.fechaFin = ''+req.body.fechaFin;
    }else{
      if((req.body.fechaInicio==null || req.body.fechaInicio== '') && (req.body.fechaFin== null || req.body.fechaFin== '')  ){

      }else{
        if(req.body.fechaInicio==null || req.body.fechaInicio== '' ){
          if(req.body.fechaFin!= null || req.body.fechaFin!= '' ){
            res.status(200).json({ error: "Debe diligenciar la fecha inicio o la fecha fin" });
            return;
          }
        }
  
        if(req.body.fechaFin== null || req.body.fechaFin== '' ){
          if(req.body.fechaInicio!=null || req.body.fechaInicio!= '' ){
            res.status(200).json({ error: "Debe diligenciar la fecha inicio o la fecha fin" });
            return;
          }
        }
      }      
    }
    
    context.tipoIdentificacion = req.body.tipoIdentificacion;
    context.numeroIdentificacion = ''+req.body.numeroIdentificacion;
    context.idServicio = req.body.idServicio;
   

    const rows = await servicio.findServiciosOrdenadosPrioridadDos(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows);
    } else {
      if(req.body.fechaInicio!= null && req.body.fechaFin!= null && req.body.fechaInicio!= '' && req.body.fechaFin!= ''){
        res.status(200).json({ mensaje: "El usuario no tiene servicios ordenados en los rangos de fecha ingresados." });
      }else{
        if(req.body.idServicio!= null && req.body.idServicio!= ''){
          res.status(200).json({ mensaje: "El usuario no tiene servicios ordenados en el tipo de servicio seleccionado." });
        }else{
          res.status(200).json({ mensaje: "El usuario no tiene servicios ordenados." });
        }
      }
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

async function getServiciosOrdenadosPrioridadTres(req, res, next) {
  try {
    const context = {};
    //Validar el post datos de entrada
    context.idServicio = parseInt(req.params.idServicio, 10);
    const rows = await servicio.findServiciosOrdenadosPrioridadTres(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(200).json({ mensaje: "El usuario no tiene servicios ordenados." });
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

module.exports.getServiciosOrdenadosPrioridadUno = getServiciosOrdenadosPrioridadUno;
module.exports.postServiciosOrdenadosPrioridadDos = postServiciosOrdenadosPrioridadDos;
module.exports.getServiciosOrdenadosPrioridadTres = getServiciosOrdenadosPrioridadTres;