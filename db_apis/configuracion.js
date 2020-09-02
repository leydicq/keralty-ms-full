const database = require('../services/database.js');

const baseQueryUsuario =
 ` SELECT DISTINCT
            ID_USUARIO "idUsuario",
            PRI_APELLIDO "primerApellido",
            SEG_APELLIDO "segundoApellido",
            PRI_NOMBRE "primerNombre",
            SEG_NOMBRE "segundoNombre",
            TRIM(PRI_APELLIDO ||' ' || SEG_APELLIDO)||' ' || TRIM(PRI_NOMBRE ||' ' || SEG_NOMBRE) "apellidosNombresCompletos",
            TRIM(PRI_NOMBRE ||' ' || SEG_NOMBRE)||' ' || TRIM(PRI_APELLIDO ||' ' || SEG_APELLIDO) "nombresApellidosCompletos",
            CONFIGURACION_TARJETAS "configuracionTarjetas"
    FROM RIPSS_TB_USUARIO
    WHERE ID_USUARIO =:idUsuario
  `;

  const baseQueryUpdateUsuario =
  `UPDATE RIPSS_TB_USUARIO SET CONFIGURACION_TARJETAS =:configuracion  WHERE ID_USUARIO=:idUsuario `;

  const baseQueryReporteIngreso =
  ` SELECT DISTINCT
              ID "id",
              NOMBRE_USUARIO "nombreUsuario",
              ULTIMA_FECHA_INGRESO "ultimaFechaIngreso",
              ULTIMA_FECHA_INGRESO_STR "ultimaFechaIngresoStr",
              NUMERO_INGRESOS "numeroIngreso"
    FROM REPORTE_AUDITORIA
    WHERE ULTIMA_FECHA_INGRESO_STR BETWEEN :fechaInicio AND :fechaFin 
  `;

async function findConfiguracionTarjetas(context) {
  let query = baseQueryUsuario;
  const binds = {};
  binds.idUsuario = context.idUsuario;
  const result = await database.simpleExecute(query, binds);
  return result.rows;
}

async function putConfiguracionTarjetas(context) {
  let query = baseQueryUpdateUsuario;
  const binds = {};
  binds.configuracion = context.configuracion;
  binds.idUsuario = context.idUsuario;
  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

async function findNombreCompleto(context) {
  let query = baseQueryUsuario;
  const binds = {};
  binds.idUsuario = context.idUsuario;
  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

async function findReporteIngreso(context) {
  let query = baseQueryReporteIngreso;
  const binds = {};
  binds.fechaInicio = context.fechaInicio;
  binds.fechaFin = context.fechaFin;
  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}


module.exports.findConfiguracionTarjetas = findConfiguracionTarjetas;
module.exports.findNombreCompleto = findNombreCompleto;
module.exports.putConfiguracionTarjetas = putConfiguracionTarjetas;
module.exports.findReporteIngreso = findReporteIngreso;

