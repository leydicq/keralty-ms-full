const database = require('../services/database.js');

const baseQueryAntecedentesClinicosPrioridadUno =
 ` SELECT DISTINCT
            ID "id",
            ID_PERSONA "idPersona",
            ALERGICOS "alergicos",
            TRANSFUNCIONAL "transfuncional",
            FAMILIARES "familiares",
            GINECOLOGICOS "ginecologicos",
            OTROS_ANTECEDENTES "ginecologicos"
    FROM CARD_ANTECEDENTES_P1
    WHERE NUMERO_IDENTIFICACION =:numeroDoc
    AND TIPO_IDENTIFICACION =:tipo
    ORDER BY ID DESC
  `;

  const baseQueryAntecedentesClinicosPrioridadDos =
 ` SELECT DISTINCT
            ID "id",
            ID_PERSONA "idPersona",
            ANTECEDENTE "antecedente",
            TIPO "tipo",
            DESCRIPCION "descripcion"
    FROM CARD_ANTECEDENTES_P2
    WHERE NUMERO_IDENTIFICACION =:numeroDoc
    AND TIPO_IDENTIFICACION =:tipo
    ORDER BY ID DESC
  `;

async function findAntecedentesClinicosPrioridadUno(context) {
  let query = baseQueryAntecedentesClinicosPrioridadUno;
  const binds = {};
  binds.numeroDoc = context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;
  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

async function findAntecedentesClinicosPrioridadDos(context) {
  let query = baseQueryAntecedentesClinicosPrioridadDos;
  const binds = {};
  binds.numeroDoc = context.numeroIdentificacion;
  binds.tipo = context.tipoIdentificacion;
  //AGREGAR LA OTRA PARTE DE LA CONSULTA
  //console.log(binds);
  const result = await database.simpleExecute(query, binds);
  
  return result.rows;
}

module.exports.findAntecedentesClinicosPrioridadUno = findAntecedentesClinicosPrioridadUno;
module.exports.findAntecedentesClinicosPrioridadDos = findAntecedentesClinicosPrioridadDos;
