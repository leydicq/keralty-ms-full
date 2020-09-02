const database = require('../services/database.js');

const baseQueryMedicamentosPrioridadUno =
 ` SELECT DISTINCT
            ID "id",
            ID_PERSONA "idPersona",
            FORMA_FARMACEUTICA "formaFarmaceutica",
            DOSIS_DIA "dosisDia",
            TIEMPO_TRATAMIENTO "tiempoTratamiento",
            DESCRIPCION_CUM "descripcionCum",
            FECHA_PROCESO "fechaProceso",
            FECHA_PROCESO_STR "fechaProcesoStr"
    FROM CARD_MEDICAMENTO_P1
    WHERE NUMERO_IDENTIFICACION =:numeroDoc
    AND TIPO_IDENTIFICACION =:tipo
    ORDER BY FECHA_PROCESO DESC
  `;

  const baseQueryMedicamentosPrioridadDos =
 ` SELECT DISTINCT
            ID "id",
            ID_PERSONA "idPersona",
            FECHA_PREINSCRIPCION "fechaPreinscripcion",
            FECHA_PREINSCRIPCION_STR "fechaPreinscripcionStr",
            DESCRIPCION_CUM "descripcionCum",
            FRECUENCIA "frecuencia",
            FORMA_FARMACEUTICA "formaFarmaceutica",
            ESTADO_DISPENSACION "estadoDispensacion",
            FECHA_DISPENSACION "fechaDispensacion",
            FECHA_DISPENSACION_STR "fechaDispensacionStr",
            FECHA_PROCESO "fechaProceso",
            FECHA_PROCESO_STR "fechaProcesoStr",
            FECHA_PROCESO_BUSCAR "fechaProcesoBuscar"
    FROM CARD_MEDICAMENTO_P2
    WHERE NUMERO_IDENTIFICACION =:numeroDoc
    AND TIPO_IDENTIFICACION =:tipo  `;

const baseQueryMedicamentosPrioridadTres =
 ` SELECT DISTINCT
            ID "id",
            ID_PERSONA "idPersona",
            DESCRIPCION_CUM "descripcionCum",
            DOSIS_DIA "dosisDia",
            TIEMPO_TRATAMIENTO "tiempoTratamiento",
            UNIDAD_MEDIDA "unidadMedida",
            CONCENTRACION_MEDICAMENTO "concentracionMedicamento",
            FRECUENCIA "frecuencia",
            FORMA_FARMACEUTICA "formaFamaceutica",
            VIA_ADMINISTRACION "viaAdministracion",
            FECHA_RADICADO_PENDIENTE "fechaRadicado",
            FECHA_RADICADO_PENDIENTE_STR "fechaRadicadoStr",
            RADICADO_PENDIENTE "radicadoPendiente",
            FECHA_ENTREGA_PENDIENTE "fechaEntregaPendiente",
            FECHA_ENTREGA_PENDIENTE_STR "fechaEntregaPendienteStr",
            ESTADO_DISPENSACION "estadoDispensacion",
            FECHA_PRESCRIPCION "fechaPrescripcion",
            FECHA_PRESCRIPCION_STR "fechaPrescripcionStr",
            FECHA_DISPENSACION "fechaDispensacion",
            FECHA_DISPENSACION_STR "fechaDispensacionStr",
            FECHA_SOLICITUD "fechaSolicitud",
            FECHA_SOLICITUD_STR "fechaSolicitudStr",
            FECHA_PROCESO "fechaProceso",
            FECHA_PROCESO_STR "fechaProcesoStr"
    FROM CARD_MEDICAMENTO_P3
    WHERE ID =:idMedicamento
    ORDER BY FECHA_PROCESO DESC
  `;

async function findMedicamentosPrioridadUno(context) {
  let query = baseQueryMedicamentosPrioridadUno;
  const binds = {};
  binds.numeroDoc = context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;
  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

async function findMedicamentosPrioridadDos(context) {
  let query = baseQueryMedicamentosPrioridadDos;
  const binds = {};
  binds.numeroDoc = context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;

  if(context.fechaInicio!= null && context.fechaInicio!= '' && context.fechaFin!= null && context.fechaFin!= ''){
    binds.fechaInicio = context.fechaInicio;
    binds.fechaFin = context.fechaFin;
    query += `\n AND FECHA_PROCESO_BUSCAR BETWEEN :fechaInicio AND :fechaFin `;
  }

  query += `\n ORDER BY FECHA_PROCESO DESC `;

  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

async function findMedicamentosPrioridadTres(context) {
  let query = baseQueryMedicamentosPrioridadTres;
  const binds = {};
  binds.idMedicamento = context.idMedicamento;
  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}


module.exports.findMedicamentosPrioridadUno = findMedicamentosPrioridadUno;
module.exports.findMedicamentosPrioridadDos = findMedicamentosPrioridadDos;
module.exports.findMedicamentosPrioridadTres = findMedicamentosPrioridadTres;
