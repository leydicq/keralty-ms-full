const database = require('../services/database.js');
const oracledb = require('oracledb');

  
  
  const baseQueryParametrizacionMeses =
  `SELECT DESCRIP_CORTA "mes" FROM RIPSS_TB_DPARAM WHERE ID_MPARAM = 99 `;
  
  const baseQuerySeleccioneAtenciones =
  `SELECT 
    CODIGO_LEGAL AS "id",
    DESCRIP_CORTA AS "descripcionCorta"
    FROM RIPSS_TB_DPARAM 
    WHERE ID_MPARAM = 11 
    ORDER BY DESCRIP_CORTA  
  `;

  const baseQuerySeleccioneServicio =
  `SELECT 
    CODIGO_LEGAL AS "id",
    DESCRIP_CORTA AS "descripcionCorta"
    FROM RIPSS_TB_DPARAM 
    WHERE ID_MPARAM = 6 
    ORDER BY DESCRIP_CORTA  
  `;

  const baseQuerySeleccioneAntecedentes =
  `SELECT 
    CODIGO_LEGAL AS "id",
    DESCRIP_CORTA AS "descripcionCorta"
    FROM RIPSS_TB_DPARAM 
    WHERE ID_MPARAM = 41 
    ORDER BY DESCRIP_CORTA  
  `;

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
  const baseQueryInsertUsuario =
  `INSERT INTO RIPSS_TB_USUARIO (ID_USUARIO,PRI_APELLIDO,SEG_APELLIDO,PRI_NOMBRE,SEG_NOMBRE,CONFIGURACION_TARJETAS) VALUES ( `;
  
  const baseQueryInsertAuditoria =
  `INSERT INTO RIPSS_TB_AUDITORIA (ID_AUDITORIA,ID_USUARIO,FECHA_INGRESO) VALUES ( (SELECT COUNT(ID_AUDITORIA)+1 FROM RIPSS_TB_AUDITORIA), `;

  async function setIngresoUsuario(context) {    
    let query = baseQueryInsertUsuario;
    query += `'`+context.idUsuario+`',\n`
    query += `'`+context.primerApellido+`',\n`
    query += `'`+context.segundoApellido+`',\n`
    query += `'`+context.primerNombre+`',\n`
    query += `'`+context.segundoNombre+`',\n`
    query += `'`+context.configuracionTarjeta+`'\n`
    query += `) returning ID_USUARIO
    into :id_usuario` ;
    
    const usuario = {};
    usuario.id_usuario = {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
      const result = await database.simpleExecute(query,usuario);
      usuario.id_usuario = result.outBinds.id_usuario[0];
      return usuario;
  }
  
  async function findNombreCompleto(context) {
    let query = baseQueryUsuario;
    const binds = {};
    binds.idUsuario = context.idUsuario;
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;
  }

  async function findParametroMeses(context) {
    let query = baseQueryParametrizacionMeses;
    const binds = {};
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;
  }

  async function findValidarRango(context) {
    let query = baseQueryParametrizacionMeses;
    const binds = {};
    const meses = await database.simpleExecute(query, binds);
    
    if(meses!= null){
      const baseQueryValidacionRango =
        `SELECT to_char(MONTHS_BETWEEN(TO_DATE('`+''+context.fechaFin+`','YYYYMMDD'),TO_DATE('`+''+context.fechaInicio+`','YYYYMMDD')),'fm9990.00') AS "cuantosMeses",
        ADD_MONTHS(TO_DATE('`+''+context.fechaInicio+`','YYYYMMDD'),`+meses.rows[0].mes+`) AS "rangoFechaProyectada",
        TO_CHAR(ADD_MONTHS(TO_DATE('`+''+context.fechaInicio+`','YYYYMMDD'),`+meses.rows[0].mes+`) ,'YYYY-MM-DD') AS "rangoFechaProyectadaStr"
        FROM DUAL  
        `;
      let queryValidar = baseQueryValidacionRango;
      const bindsValidar = {};
      const result = await database.simpleExecute(queryValidar, bindsValidar);
      result.rows[0].parametroMes = meses.rows[0].mes;
      result.rows[0].pasoValidacion = !(result.rows[0].cuantosMeses >  meses.rows[0].mes) ;
      return result.rows;      
    }
    return null;
  }

  async function findSelectAtenciones() {
      let queryValidar = baseQuerySeleccioneAtenciones;
      const bindsValidar = {};
      const result = await database.simpleExecute(queryValidar, bindsValidar);
      return result.rows;      
  }

  
  async function setRegistrarIngreso(context) {    
    let query = baseQueryInsertAuditoria;
    query += `'`+context.idUsuario+`', SYSDATE ) returning ID_AUDITORIA
    into :id_auditoria` ;
    
    const auditoria = {};
    auditoria.id_auditoria = {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
      const result = await database.simpleExecute(query,auditoria);
      auditoria.id_auditoria = result.outBinds.id_auditoria[0];
      return auditoria;
  }


  async function findSelectServicio() {
    let queryValidar = baseQuerySeleccioneServicio;
    const bindsValidar = {};
    const result = await database.simpleExecute(queryValidar, bindsValidar);
    return result.rows;      
}

async function findSelectAntecedentes() {
  let queryValidar = baseQuerySeleccioneAntecedentes;
  const bindsValidar = {};
  const result = await database.simpleExecute(queryValidar, bindsValidar);
  return result.rows;      
}





module.exports.setRegistrarIngreso = setRegistrarIngreso;
module.exports.setIngresoUsuario = setIngresoUsuario;
module.exports.findNombreCompleto = findNombreCompleto;
module.exports.findParametroMeses = findParametroMeses;
module.exports.findValidarRango = findValidarRango;
module.exports.findSelectAtenciones = findSelectAtenciones;
module.exports.findSelectServicio = findSelectServicio;
module.exports.findSelectAntecedentes = findSelectAntecedentes;
