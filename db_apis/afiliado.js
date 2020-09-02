const database = require('../services/database.js');

const baseQueryPuno =
 ` SELECT DISTINCT
            ID "id",
            IDENTIFICACION "identificacion",
            NUMERO_IDENTIFICACION "numeroDocumento",
            PRIMER_APELLIDO "primerApellido", 
            SEGUNDO_APELLIDO "segundoApellido",
            PRIMER_NOMBRE "primerNombre", 
            SEGUNDO_NOMBRE "segundoNombre", 
            APELLIDOS_NOMBRES_COMPLETOS "apellidosNombresCompletos",
            NOMBRES_APELLIDOS_COMPLETOS "nombresApellidosCompletos",
            TIPO_IDENTIFICACION "tipoIdentificacion",
            DESC_TIPO_IDENTIFICACION "descTipoIdentificacion",
            GENERO "genero", 
            DESC_GENERO "descGenero", 
            EMAIL "email",
            FECHA_NACIMIENTO "fechaNacimiento",
            FECHA_NACIMIENTO_STR "fechaNacimientoStr",
            FECHA_NACIMIENTO_HORA "fechaNacimientoHora",
            EDAD "edad"
    FROM CARD_AFILIADO_P1
    WHERE NUMERO_IDENTIFICACION =:numeroDoc 
    AND TIPO_IDENTIFICACION =:tipo
  `;

const baseQueryPdos =
 ` SELECT DISTINCT
            ID "id",
            PRIMER_APELLIDO "primerApellido", 
            SEGUNDO_APELLIDO "segundoApellido",
            PRIMER_NOMBRE "primerNombre", 
            SEGUNDO_NOMBRE "segundoNombre", 
            APELLIDOS_NOMBRES_COMPLETOS "apellidosNombresCompletos",
            NOMBRES_APELLIDOS_COMPLETOS "nombresApellidosCompletos",
            TIPO_IDENTIFICACION "tipoIdentificacion",
            DESC_TIPO_IDENTIFICACION "descTipoIdentificacion",
            NUMERO_IDENTIFICACION "numeroDocumento",
            IPS "ips",
            GENERO "genero",
            DESC_GENERO "descGenero",
            EMAIL "email",
            CELULAR "celular",
            ID_MUNICIPIO "idMunicipio",
            MUNICIPIO "Municipio",
            COD_PLAN "codPlan",
            DESC_PLAN "descPlan",
            DIRECCION "direccion",
            TELEFONO_FIJO "telefonoFijo",
            ZONA_RESIDENCIA "zonaResidencia",
            ESTADO_AFILIADO "estadoAfiliado",
            CATEGORIA "categoria",
            FECHA_NACIMIENTO "fechaNacimiento",
            FECHA_NACIMIENTO_STR "fechaNacimientoStr",
            FECHA_NACIMIENTO_HORA "fechaNacimientoHora",
            FECHA_AFILIACION "fechaAfilicion",
            FECHA_AFILIACION_STR "fechaAfilicionStr",
            TIPO_COTIZANTE "tipoCotizante",
            EDAD "edad"
    FROM CARD_AFILIADO_P2
    WHERE NUMERO_IDENTIFICACION =:numeroDoc 
    AND TIPO_IDENTIFICACION =:tipo
  `;

  
  const baseQueryUltimoAcceso =
 ` SELECT DISTINCT
            ID_ATENCION "id",
            ID_PERSONA "idPersona",
            NUMERO_IDENTIFICACION "numeroDocumento",
            TIPO_IDENTIFICACION "tipoIdentificacion",
            FECHA_ATENCION "fechaAtencion",
            FECHA_ATENCION_STR "fechaAtencionStr"
    FROM CARD_AFILIADO_ULTIMA_ATENCION
    WHERE NUMERO_IDENTIFICACION =:numeroDoc 
    AND TIPO_IDENTIFICACION =:tipo 
    ORDER BY FECHA_ATENCION DESC
  `;

async function findAfiliadoPrioridadUno(context) {
  //console.log(context);
  let query = baseQueryPuno;
  const binds = {};
  binds.numeroDoc = context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;
  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

async function findAfiliadoPrioridadDos(context) {
  let query = baseQueryPdos;
  const binds = {};
  binds.numeroDoc = context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;
  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

async function findAfiliadoUltimoAcceso(context) {
  let query = baseQueryUltimoAcceso;
  const binds = {};
  binds.numeroDoc = context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;
  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

module.exports.findAfiliadoPrioridadUno = findAfiliadoPrioridadUno;
module.exports.findAfiliadoPrioridadDos = findAfiliadoPrioridadDos;
module.exports.findAfiliadoUltimoAcceso = findAfiliadoUltimoAcceso;
