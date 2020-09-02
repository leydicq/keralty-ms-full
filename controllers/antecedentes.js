const antecedentes = require('../db_apis/antecedentes');

async function getAntecedentesClinicosPrioridadUno(req, res, next) {
  try {
    const context = {};
    
    context.tipoIdentificacion = req.params.tipoIdentificacion;
    context.numeroIdentificacion = ''+req.params.numeroIdentificacion, 10;
    const rows = await antecedentes.findAntecedentesClinicosPrioridadUno(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      //Cuando es por conuslta normal
      res.status(200).json({ mensaje: "El usuario no tiene antecedentes médicos." });
      //Cuando es por rango
      //res.status(200).json({ mensaje: "El usuario no tiene Antecedentes en el rango de fecha seleccionado." });
      //Cueando es tipo
      //res.status(200).json({ mensaje: "El usuario no tiene antecedentes relacionado con el tipo de antecedentes seleccionado." });
      



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


async function getAntecedentesClinicosPrioridadDos(req, res, next) {
  try {
    const context = {};
    
    context.tipoIdentificacion = req.body.tipoIdentificacion;
    context.numeroIdentificacion = ''+req.body.numeroIdentificacion;
    context.fechaInicio = req.body.fechaInicio;
    context.fechaFin = req.body.fechaFin;
    context.tipo = req.body.tipo;

    const rows = await antecedentes.findAntecedentesClinicosPrioridadDos(context);
    if (rows !== null && rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(200).json({ mensaje: "El usuario no tiene antecedentes médicos." });
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

module.exports.getAntecedentesClinicosPrioridadUno = getAntecedentesClinicosPrioridadUno;
module.exports.getAntecedentesClinicosPrioridadDos = getAntecedentesClinicosPrioridadDos;