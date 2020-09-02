const database = require('../services/database.js');

const baseQueryAtencionPracticadaPrioridadUno =
 ` SELECT DISTINCT
            ID "id",
            ID_PERSONA "idPersona",
            PRESTACION_PRACTICA "prestacionPractica",
            FECHA_SALIDA "fechaSalida",
            FECHA_SALIDA_STR "fechaSalidaStr",
            FECHA_ASIGNACION "fechaAsignacion",
            FECHA_ASIGNACION_STR "fechaAsignacionStr",
            CODIGO_LEGAL_DIAG "codigoLealDiag",
            TIPO_DIAGNOSTICO "tipoDiagnostico",
            RESULTADO "resultado",
            FECHA_RESULTADO "fechaResultado",
            FECHA_RESULTADO_STR "fechaResultadoStr",
            FECHA_INGRESO "fechaIngreso",
            FECHA_INGRESO_STR "fechaIngresoStr",
            TRIAGLE_NOMBRE "triagleNombre",
            TRIAGLE_VALOR "triagleValor",
            CODIGO_ESPECIALISTA "codigoEspecialista",
            ESPECIALISTA "especialista",
            COD_AMBITO "codigoAmbito",
            AMBITO "ambito",
            TIPO_ATENCION "tipoAtencion",
            ATENCION "atencion",
            FECHA_ATENCION "fechaAtencion",
            FECHA_ATENCION_STR "fechaAtencionStr",
            FECHA_ATENCION_BUSCAR "fechaAtencionBuscar",
            PLAN_MANEJO "planManejo"
    FROM CARD_ATENCION_P1
    WHERE NUMERO_IDENTIFICACION =:numeroDoc 
    AND TIPO_IDENTIFICACION =:tipo    `;

  const baseQueryAtencionPracticadaPrioridadDos =
  ` SELECT DISTINCT
          ID "id",
          ID_PERSONA "idPersona",
          DESCRIPCION_CUPS "descripcionCups",
          CODIGO_LEGAL_DIAG "codigoLegalDiag",
          DIAGNOSTICO_PRINCIPAL "diagnosticoPrincipal",
          PLAN_MANEJO "planManejo",
          FECHA_INGRESO "fechaIngreso",
          FECHA_INGRESO_STR "fechaIngresoStr",
          FECHA_EGRESO "fechaEgreso",
          FECHA_EGRESO_STR "fechaEgresoStr",
          CODIGO_ESPECIALISTA "codigoEspecialista",
          ESPECIALISTA "especialista",
          COD_AMBITO "codAmbito",
          AMBITO "ambito",
          TIPO_ATENCION "tipoAtencion",
          ATENCION "atencion",
          FECHA_ASIGNACION "fechaAsignacion",
          FECHA_ASIGNACION_STR "fechaAsignacionStr",
          FECHA_ATENCION "fechaAtencion",
          FECHA_ATENCION_STR "fechaAtencionStr",
          TIPO_DIAGNOSTICO "tipoDiagnostico",
          FECHA_RESULTADO "fechaResultado",
          FECHA_RESULTADO_STR "fechaResultadoStr",
          RESUMEN_EXAMEN "resumenExamen",
          SERVICIO_REFERENCIA "servicioReferencia",
          DESCRIPCION_CUPS_ORDENADO "descripcionCupsOrdenado",
          COMORBILIDAD_N1 "comorbilidadN1",
          COMORBILIDAD_N2 "comorbilidadN2",
          COMORBILIDAD_N3 "comorbilidadN3",
          NOMBRE_PRESTADOR "nombrePrestador",
          NOMBRE_PROFESIONAL "nombreProfesional",
          DURACION_INCAPACIDAD "duracionIncapacidad",
          SUCURSAL "sucursal",
          FECHA_HORA_ASIGNACION "fechaHoraAsignacion",
          FECHA_HORA_ASIGNACION_STR "fechaHoraAsignacionStr",
          PROCEDIMIENTO_1 "procedimiento1",
          PROCEDIMIENTO_2 "procedimiento2",
          PROCEDIMIENTO_3 "procedimiento3",
          DESTINO_USUARIO "destinoUsuario",
          LATERALIDAD "lateralidad",
          COMPLICACION_1 "complicacion1",
          COMPLICACION_2 "complicacion2",
          COMPLICACION_3 "complicacion3",
          CANTIDAD "cantidad",
          TIPO_IDENTIFICACION "tipoIdentificacion",
          NUMERO_IDENTIFICACION "numeroIdentificacion"
    FROM CARD_ATENCION_P2
    WHERE NUMERO_IDENTIFICACION =:numeroDoc 
    AND TIPO_IDENTIFICACION =:tipo    
    AND ID  =:id  `;

async function findAtencionPracticadaPrioridadUno(context) {
  let query = baseQueryAtencionPracticadaPrioridadUno;
  const binds = {};
  binds.numeroDoc = context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;

  if(context.fechaInicio!= null && context.fechaInicio!= '' && context.fechaFin!= null && context.fechaFin!= ''){
    binds.fechaInicio = context.fechaInicio;
    binds.fechaFin = context.fechaFin;
    query += `\n AND FECHA_ATENCION_BUSCAR BETWEEN :fechaInicio AND :fechaFin `;
  }

  if(context.idAmbito!= null && context.idAmbito!= ''){
    binds.idAmbito = ''+context.idAmbito;
    query += `\n AND COD_AMBITO = :idAmbito `;
  }

  query += `\n ORDER BY FECHA_ATENCION DESC `;

  //console.log(query);
  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

async function findAtencionPracticadaPrioridadDos(context) {
  let query = baseQueryAtencionPracticadaPrioridadDos;
  const binds = {};
  binds.numeroDoc = context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;
  binds.id = context.idAtencion;

  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}


async function findGraficaUno(context) {
  const binds = {};
  binds.numeroDoc = ''+context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;

  let query = 
  ` SELECT 
    ID "id",
    COD_AMBITO "idAmbito",
    AMBITO "ambito",
    FECHA_ATENCION "fechaAtencion",
    FECHA_ATENCION_STR  "fechaAtencionStr",
    FECHA_ATENCION_BUSCAR "fechaAtencionBuscar"
    FROM GRAFICA_ATENCION_P1
    WHERE NUMERO_IDENTIFICACION =:numeroDoc 
    AND TIPO_IDENTIFICACION =:tipo  `;

    if(context.fechaInicio!= null && context.fechaInicio!= '' && context.fechaFin!= null && context.fechaFin!= ''){
      binds.fechaInicio = context.fechaInicio;
      binds.fechaFin = context.fechaFin;
      query += `\n AND FECHA_ATENCION_BUSCAR BETWEEN :fechaInicio AND :fechaFin `;
    }

    if(context.idAmbito!= null){
      binds.idAmbito = ''+context.idAmbito;
      query += `\n AND COD_AMBITO = :idAmbito `;
    }

    query += `\n ORDER BY FECHA_ATENCION DESC `;

  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}


module.exports.findAtencionPracticadaPrioridadUno = findAtencionPracticadaPrioridadUno;
module.exports.findAtencionPracticadaPrioridadDos = findAtencionPracticadaPrioridadDos;
module.exports.findGraficaUno = findGraficaUno;
