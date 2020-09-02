const database = require('../services/database.js');

const baseQueryDatosAntropometricosPrioridadUno =
 ` SELECT DISTINCT
            ID_PERSONA "idPersona",
            TALLA "talla",
            PESO "peso",
            TENSION_ART_SISTOLICA "tensionArtSistolica",
            TENSION_ART_DIASTOLICA "tensionArtDiastolica",
            FRECUENCIA_CARDIACA "frecuenciaCardiaca",
            PERIMETRO_CEFALICO "perimetroCefalico",
            EDAD "edad",
            FECHA_ATENCION as "fechaAtencion",
            FECHA_ATENCION_STR as "fechaAtencionStr"
    FROM CARD_ANTROPOMETRICO_P1
    WHERE NUMERO_IDENTIFICACION =:numeroDoc
    AND TIPO_IDENTIFICACION =:tipo
    ORDER BY FECHA_ATENCION_STR DESC
  `;

  const baseQueryDatosAntropometricosPrioridadDos =
 ` SELECT DISTINCT
            ID_PERSONA "idPersona",
            TALLA "talla",
            PESO "peso",
            FRECUENCIA_CARDIACA "frecuenciaCardiaca",
            TENSION_ART_SISTOLICA "tensionArterial",
            TEMPERATURA "temperatura",
            EDAD_GESTACIONAL "edadGestacional",
            FRECUENCIA_RESPIRATORIA "frecuenciaRespiratoria",
            ULTIMA_FECHA_MENSTRUACION "ultimaFechaMestruacion",
            FECHA_PROBABLE_PARTO "fechaProbableParto",
            FECHA_ATENCION as "fechaAtencion",
            FECHA_ATENCION_STR as "fechaAtencionStr"
    FROM CARD_ANTROPOMETRICO_P2
    WHERE NUMERO_IDENTIFICACION =:numeroDoc
    AND TIPO_IDENTIFICACION =:tipo
    ORDER BY FECHA_ATENCION_STR DESC
  `;

async function findDatosAntropometricosPrioridadUno(context) {
  let query = baseQueryDatosAntropometricosPrioridadUno;
  const binds = {};
  binds.numeroDoc = context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;
  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

async function findDatosAntropometricosPrioridadDos(context) {
  let query = baseQueryDatosAntropometricosPrioridadDos;
  const binds = {};
  binds.numeroDoc = context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;
  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}



async function findGraficaPeso(context) {
  const binds = {};
  binds.numeroDoc = ''+context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;

  let query = 
  ` SELECT 
    ID "id",
    PESO "peso",
    FECHA_ATENCION "fechaAtencion",
    FECHA_ATENCION_STR "fechaAtencionStr",
    FECHA_ATENCION_BUSCAR "fechaAtencionBuscar",
    FECHA_ATENCION_GRAFICA "fechaAtencionGrafica",
    TIPO_IDENTIFICACION "tipoIdentificacion",
    NUMERO_IDENTIFICACION "numeroIdentificacion"
    FROM GRAFICA_PESO
    WHERE NUMERO_IDENTIFICACION =:numeroDoc 
    AND TIPO_IDENTIFICACION =:tipo 
    AND FECHA_ATENCION_BUSCAR BETWEEN (TO_CHAR(SYSDATE-181,'YYYYMMDD')) AND TO_CHAR(SYSDATE,'YYYYMMDD')
    ORDER BY FECHA_ATENCION DESC `;

  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

async function findGraficaTension(context) {
  const binds = {};
  binds.numeroDoc = ''+context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;

  let query = 
  ` SELECT 
    ID "id",
    TENSION_ART_SISTOLICA "tensionSistolica",
    TENSION_ART_DIASTOLICA "tensionDiastolica",
    FECHA_ATENCION "fechaAtencion",
    FECHA_ATENCION_STR "fechaAtencionStr",
    FECHA_ATENCION_GRAFICA "fechaAtencionGrafica",
    FECHA_ATENCION_BUSCAR "fechaAtencionBuscar",
    TIPO_IDENTIFICACION "tipoIdentificacion",
    NUMERO_IDENTIFICACION "numeroIdentificacion"
    FROM GRAFICA_TENSION
    WHERE NUMERO_IDENTIFICACION =:numeroDoc 
    AND TIPO_IDENTIFICACION =:tipo 
    AND FECHA_ATENCION_BUSCAR BETWEEN (TO_CHAR(SYSDATE-181,'YYYYMMDD')) AND TO_CHAR(SYSDATE,'YYYYMMDD')
    ORDER BY FECHA_ATENCION DESC `;

  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

async function findGraficaFrecuencia(context) {
  const binds = {};
  binds.numeroDoc = ''+context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;

  let query = 
  ` SELECT 
    ID "id",
    FRECUENCIA "frecuencia",
    FECHA_ATENCION "fechaAtencion",
    FECHA_ATENCION_STR "fechaAtencionStr",
    FECHA_ATENCION_BUSCAR "fechaAtencionBuscar",
    FECHA_ATENCION_GRAFICA "fechaAtencionGrafica",
    TIPO_IDENTIFICACION "tipoIdentificacion",
    NUMERO_IDENTIFICACION "numeroIdentificacion"
    FROM GRAFICA_FRECUENCIA
    WHERE NUMERO_IDENTIFICACION =:numeroDoc 
    AND TIPO_IDENTIFICACION =:tipo 
    AND FECHA_ATENCION_BUSCAR BETWEEN (TO_CHAR(SYSDATE-181,'YYYYMMDD')) AND TO_CHAR(SYSDATE,'YYYYMMDD')
    ORDER BY FECHA_ATENCION DESC `;

  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}



module.exports.findDatosAntropometricosPrioridadUno = findDatosAntropometricosPrioridadUno;
module.exports.findDatosAntropometricosPrioridadDos = findDatosAntropometricosPrioridadDos;
module.exports.findGraficaPeso = findGraficaPeso;
module.exports.findGraficaTension = findGraficaTension;
module.exports.findGraficaFrecuencia = findGraficaFrecuencia;
