const database = require('../services/database.js');

const baseQueryServiciosOrdenadosPrioridadUno =
 ` SELECT DISTINCT
            ID "id",
            ID_PERSONA "idPersona",
            ID_ATENCION "idAtencion",
            DESCRIPCION "descripcion",
            ESTADO "estado",
            FECHA_ATENCION "fechaAtencion",
            FECHA_ATENCION_STR "fechaAtencionStr" 
    FROM CARD_SERVICIO_ORDEN_P1
    WHERE NUMERO_IDENTIFICACION =:numeroDoc 
    AND TIPO_IDENTIFICACION =:tipo AND ROWNUM <=2 
    ORDER BY FECHA_ATENCION DESC
  `;

 const baseQueryServiciosOrdenadosPrioridadDos =
` SELECT DISTINCT
           ID "id",
           ID_ATENCION "idAtencion",
           ID_PERSONA "idPersona",
           FECHA_ORDEN_SERVICIO "fechaOrdenServicio",
           FECHA_ORDEN_SERVICIO_STR "fechaOrdenServicioStr",
           DESCRIPCION_SERVICIO_ORDENADO "descripcionServicioOrdenado",
           NUMERO_AUTORIZACION "numeroAutorizacion",
           ESTADO "estado",
           FECHA_ATENCION "fechaAtencion",
           FECHA_ATENCION_STR "fechaAtencionStr",
           FECHA_ATENCION_BUSCAR "fechaAtencionBuscar",
           COD_TIPO_ATENCION "codTipoAtencion",
           TIPO_ATENCION "tipoAtencion"
   FROM CARD_SERVICIO_ORDEN_P2 
   WHERE NUMERO_IDENTIFICACION =:numeroDoc
   AND TIPO_IDENTIFICACION =:tipo    `;

const baseQueryServiciosOrdenadosPrioridadTres =
` SELECT DISTINCT
            ID "id",
            ID_ATENCION "idAtencion",
            ID_PERSONA "idPersona",            
            ESPECIALIDAD_MEDICO "especialidadMedico",
            DESCRIPCION_SERVICIO_ORDENADO "descripcionServicioOrdenado",
            COD_AMBITO "codAmbito",
            AMBITO "ambito",
            COD_TIPO_ATENCION "codTipoAtencion",
            TIPO_ATENCION "tipoAtencion",
            FECHA_ORDEN_SERVICIO_STR "fechaOrdenServicioStr",
            FECHA_ATENCION "fechaAtencion",
            FECHA_ATENCION_STR "fechaAtencionStr",
            ESTADO "estado",
            DURACION_INCAPACIDAD "duracionIncapacidad",
            PROFESIONAL "profesional",
            SUCURSAL "sucursal",
            ID_AFILIADO "idAfiliado",
            FECHA_HORA_ASIGNACION_CITA_STR "fechaHoraAsignacionCitaStr",
            FECHA_ASIGNACION_CITA_STR "fechaAsignacionCitaStr"
   FROM CARD_SERVICIO_ORDEN_P3
   WHERE ID =:idServicio
   ORDER BY FECHA_ATENCION DESC
 `;


async function findServiciosOrdenadosPrioridadUno(context) {
  let query = baseQueryServiciosOrdenadosPrioridadUno;
  const binds = {};
  binds.numeroDoc = context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;
  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

async function findServiciosOrdenadosPrioridadDos(context) {
  let query = baseQueryServiciosOrdenadosPrioridadDos;
  const binds = {};
  binds.numeroDoc = context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;

  if(context.fechaInicio!= null && context.fechaInicio!= '' && context.fechaFin!= null && context.fechaFin!= ''){
    binds.fechaInicio = context.fechaInicio;
    binds.fechaFin = context.fechaFin;
    query += `\n AND FECHA_ATENCION_BUSCAR BETWEEN :fechaInicio AND :fechaFin `;
  }

  if(context.idServicio!= null && context.idServicio!= ''){
    binds.idServicio = ''+context.idServicio;
    query += `\n AND COD_TIPO_ATENCION = :idServicio `;
  }

  query += `\n ORDER BY FECHA_ATENCION DESC `;

  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

async function findServiciosOrdenadosPrioridadTres(context) {
  let query = baseQueryServiciosOrdenadosPrioridadTres;
  const binds = {};
  binds.idServicio = context.idServicio;
  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

module.exports.findServiciosOrdenadosPrioridadUno = findServiciosOrdenadosPrioridadUno;
module.exports.findServiciosOrdenadosPrioridadDos = findServiciosOrdenadosPrioridadDos;
module.exports.findServiciosOrdenadosPrioridadTres = findServiciosOrdenadosPrioridadTres;