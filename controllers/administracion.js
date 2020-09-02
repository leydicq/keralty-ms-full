const administracion = require('../db_apis/administracion.js');


async function setIngresoUsuario(req, res, next) {
  try {
    const context = {};
    context.idUsuario = req.body.idUsuario;
    context.primerApellido = req.body.primerApellido;
    context.segundoApellido = req.body.segundoApellido;
    context.primerNombre = req.body.primerNombre;
    context.segundoNombre = req.body.segundoNombre;
    context.configuracionTarjeta = parseInt(req.body.configuracionTarjeta, 10);

    if(context.idUsuario!= null && context.idUsuario!= ""
    && context.primerApellido!= null && context.primerApellido!= "" 
    && context.primerNombre!= null && context.primerNombre!= ""
    && context.configuracionTarjeta!= null && context.configuracionTarjeta!= ""){
      
      const nombre = await administracion.findNombreCompleto(context);
      if (nombre !== null && typeof nombre !== 'undefined' && nombre.length > 0) {
        res.status(200).json(nombre[0]);
      }else{
        const rowsIngreso = await administracion.setIngresoUsuario(context);
        if (rowsIngreso !== null) {
          context.idUsuario = rowsIngreso.id_usuario;
          const persona = await administracion.findNombreCompleto(context);
          res.status(200).json(persona[0]);
        } else {
          res.status(200).json({ mensaje: "No se encontro información." });
        }
      }
    }else{
      res.status(500).json({error: "Se debe ingresar todos los datos requeridos " });
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


async function setRegistrarIngreso(req, res, next) {
  try {
    const context = {};
    context.idUsuario = req.params.idUsuario;
    const rows = await administracion.setRegistrarIngreso(context);
    if (rows !== null) {
      res.status(200).json(rows);
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


async function postValidarRango(req, res, next) {
  try {
      const context = {};
      context.fechaInicio = req.body.fechaInicio;
      context.fechaFin = req.body.fechaFin;
      

      if(context.fechaInicio!= null && context.fechaInicio!= ""
      && context.fechaFin!= null && context.fechaFin!= "" ){
        
        const rows = await administracion.findValidarRango(context);
          if (rows !== null) {
            context.resultado = rows[0];
            res.status(200).json(context);
          } else {
            res.status(200).json({ mensaje: "No se encontro información." });
          } 
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

async function getSeleccioneAtencion(req, res, next) {
  try {
      const rows = await administracion.findSelectAtenciones();
        if (rows !== null) {
          res.status(200).json(rows);
        } else {
          res.status(200).json({ mensaje: "No se encontro información." });
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


async function getSeleccioneServicio(req, res, next) {
  try {
      const rows = await administracion.findSelectServicio();
        if (rows !== null) {
          res.status(200).json(rows);
        } else {
          res.status(200).json({ mensaje: "No se encontro información." });
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


async function getSeleccioneAntecedentes(req, res, next) {
  try {
      const rows = await administracion.findSelectAntecedentes();
        if (rows !== null) {
          res.status(200).json(rows);
        } else {
          res.status(200).json({ mensaje: "No se encontro información." });
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



module.exports.setRegistrarIngreso = setRegistrarIngreso;
module.exports.setIngresoUsuario = setIngresoUsuario;
module.exports.postValidarRango = postValidarRango;
module.exports.getSeleccioneAtencion = getSeleccioneAtencion;
module.exports.getSeleccioneServicio = getSeleccioneServicio;
module.exports.getSeleccioneAntecedentes = getSeleccioneAntecedentes;
