const atencion = require('../db_apis/atencion');

async function postAtencionPracticadaPrioridadUno(req, res, next) {
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
    context.idAmbito = req.body.idAmbito;

    const rows = await atencion.findAtencionPracticadaPrioridadUno(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows);
    } else {
      if(req.body.fechaInicio!= null && req.body.fechaFin!= null && req.body.fechaInicio!= '' && req.body.fechaFin!= ''){
        res.status(200).json({ mensaje: "El usuario no tiene prestaciones practicadas en los rangos de fecha ingresados." });
      }else{
        if(req.body.idAmbito!= null && req.body.idAmbito!= ''){
          res.status(200).json({ mensaje: "El usuario no tiene prestaciones practicadas en el ámbito seleccionado." });
        }else{
          res.status(200).json({ mensaje: "El usuario no tiene prestaciones practicadas." });
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


async function postAtencionGraficaUno(req, res, next) {  
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
      context.idAmbito = req.body.idAmbito;

      const rows = await atencion.findGraficaUno(context);
      if (rows !== null && rows.length > 0) {
        res.status(200).json(rows);
      } else {
        if(req.body.fechaInicio!= null && req.body.fechaFin!= null && req.body.fechaInicio!= '' && req.body.fechaFin!= ''){
          res.status(200).json({ mensaje: "El usuario no tiene prestaciones practicadas en los rangos de fecha ingresados." });
        }else{
          if(req.body.idAmbito!= null && req.body.idAmbito!= ''){
            res.status(200).json({ mensaje: "El usuario no tiene prestaciones practicadas en el ámbito seleccionado." });
          }else{
            res.status(200).json({ mensaje: "El usuario no tiene prestaciones practicadas." });
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

async function postAtencionPracticadaPrioridadDos(req, res, next) {
  try {
    const context = {};  
    context.tipoIdentificacion = req.body.tipoIdentificacion;
    context.numeroIdentificacion = ''+req.body.numeroIdentificacion;   
    context.idAtencion = req.body.idAtencion;

    const rows = await atencion.findAtencionPracticadaPrioridadDos(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
        if(req.body.idAtencion!= null && req.body.idAtencion!= ''){
          res.status(200).json({ mensaje: "El usuario no tiene prestaciones practicadas en el ámbito seleccionado." });
        }else{
          res.status(200).json({ mensaje: "El usuario no tiene prestaciones practicadas." });
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





module.exports.postAtencionPracticadaPrioridadUno = postAtencionPracticadaPrioridadUno;
module.exports.postAtencionPracticadaPrioridadDos = postAtencionPracticadaPrioridadDos;
module.exports.postAtencionGraficaUno = postAtencionGraficaUno;
