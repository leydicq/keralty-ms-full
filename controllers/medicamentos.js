const medicamentos = require('../db_apis/medicamentos');


async function getMedicamentosPrioridadUno(req, res, next) {
  try {
    const context = {};
    
    context.tipoIdentificacion = req.params.tipoIdentificacion;
    context.numeroIdentificacion = ''+req.params.numeroIdentificacion;
    const rows = await medicamentos.findMedicamentosPrioridadUno(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(200).json({ mensaje: "El usuario no ha tenido medicamentos en los últimos 6 meses." });
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


async function postMedicamentosPrioridadDos(req, res, next) {
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
        
    const rows = await medicamentos.findMedicamentosPrioridadDos(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows);
    } else {
      if(req.body.fechaInicio!= null && req.body.fechaFin!= null && req.body.fechaInicio!= '' && req.body.fechaFin!= ''){
        res.status(200).json({ mensaje: "El usuario no tiene medicamentos en los rangos de fecha ingresados." });
      }else{
        res.status(200).json({ mensaje: "El usuario no ha tenido medicamentos en los últimos 6 meses." });
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


async function getMedicamentosPrioridadTres(req, res, next) {
  try {
    const context = {};    
    context.idMedicamento = parseInt(req.params.idMedicamento, 10);
    
    const rows = await medicamentos.findMedicamentosPrioridadTres(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(200).json({ mensaje: "No se encontro información." });
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


module.exports.getMedicamentosPrioridadUno = getMedicamentosPrioridadUno;
module.exports.postMedicamentosPrioridadDos = postMedicamentosPrioridadDos;
module.exports.getMedicamentosPrioridadTres = getMedicamentosPrioridadTres;