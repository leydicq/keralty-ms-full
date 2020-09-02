const express = require('express');
const router = new express.Router();

const afiliado = require('../controllers/afiliado.js');
const antecedentes = require('../controllers/antecedentes');
const antencion = require('../controllers/atencion');
const antropomorficos = require('../controllers/antropomorficos');
const medicamentos = require('../controllers/medicamentos');
const servicio = require('../controllers/servicio');
const config = require('../controllers/configuracion');
const administracion = require('../controllers/administracion.js');

router.route('/afiliados/prioridad/uno/V1.0.0/afiliado/:tipoIdentificacion?/:numeroIdentificacion?').get(afiliado.getAfiliadoPrioridadUno);
router.route('/afiliados/prioridad/dos/V1.0.0/afiliado/:tipoIdentificacion?/:numeroIdentificacion?').get(afiliado.getAfiliadoPrioridadDos);
router.route('/afiliados/prioridad/uno/V1.0.0/afiliado/ultimoAcceso/:tipoIdentificacion?/:numeroIdentificacion?').get(afiliado.getAfiliadoUltimoAcceso);

router.route('/antecedentes/prioridad/uno/V1.0.0/clinico/:tipoIdentificacion?/:numeroIdentificacion?').get(antecedentes.getAntecedentesClinicosPrioridadUno);
router.route('/antecedentes/prioridad/dos/V1.0.0/clinico').post(antecedentes.getAntecedentesClinicosPrioridadDos);

router.route('/atenciones/prioridad/uno/V1.0.0/atencion').post(antencion.postAtencionPracticadaPrioridadUno);
router.route('/atenciones/prioridad/dos/V1.0.0/atencion').post(antencion.postAtencionPracticadaPrioridadDos);
router.route('/atenciones/prioridad/uno/V1.0.0/atencion/grafica').post(antencion.postAtencionGraficaUno);

router.route('/datos/prioridad/uno/V1.0.0/antropometrico/:tipoIdentificacion?/:numeroIdentificacion?').get(antropomorficos.getDatosAntropometricosPrioridadUno);
router.route('/datos/prioridad/dos/V1.0.0/antropometrico/:tipoIdentificacion?/:numeroIdentificacion?').get(antropomorficos.getDatosAntropometricosPrioridadDos);
router.route('/datos/prioridad/dos/V1.0.0/antropometrico/grafica/peso/:tipoIdentificacion?/:numeroIdentificacion?').get(antropomorficos.getDatosAntropometricosGraficaPeso);
router.route('/datos/prioridad/dos/V1.0.0/antropometrico/grafica/tension/:tipoIdentificacion?/:numeroIdentificacion?').get(antropomorficos.getDatosAntropometricosGraficaTension);
router.route('/datos/prioridad/dos/V1.0.0/antropometrico/grafica/frecuencia/:tipoIdentificacion?/:numeroIdentificacion?').get(antropomorficos.getDatosAntropometricosGraficaFrecuencia);

router.route('/medicamentos/prioridad/uno/V1.0.0/resumen/:tipoIdentificacion?/:numeroIdentificacion?').get(medicamentos.getMedicamentosPrioridadUno);
router.route('/medicamentos/prioridad/dos/V1.0.0/detalle').post(medicamentos.postMedicamentosPrioridadDos);
router.route('/medicamentos/prioridad/tres/V1.0.0/avanzado/:idMedicamento?').get(medicamentos.getMedicamentosPrioridadTres);

router.route('/servicios/prioridad/uno/V1.0.0/resumen/:tipoIdentificacion?/:numeroIdentificacion?').get(servicio.getServiciosOrdenadosPrioridadUno);
router.route('/servicios/prioridad/dos/V1.0.0/detalle').post(servicio.postServiciosOrdenadosPrioridadDos);
router.route('/servicios/prioridad/tres/V1.0.0/avanzado/:idServicio?').get(servicio.getServiciosOrdenadosPrioridadTres);

router.route('/administracion/reportes/V1.0.0/auditoria/:idUsuario?').get(administracion.setRegistrarIngreso);
router.route('/administracion/usuarios/V1.0.0/ingreso').post(administracion.setIngresoUsuario);
router.route('/administracion/fechas/V1.0.0/validar').post(administracion.postValidarRango);
router.route('/atenciones/prioridad/dos/V1.0.0/select').get(administracion.getSeleccioneAtencion);
router.route('/servicios/prioridad/dos/V1.0.0/select').get(administracion.getSeleccioneServicio);
router.route('/antecedentes/prioridad/dos/V1.0.0/select').get(administracion.getSeleccioneAntecedentes);

router.route('/administracion/usuarios/V1.0.0/configuracion/:idUsuario?').get(config.getConfiguracionTarjetas);
router.route('/administracion/usuarios/V1.0.0/nombre/:idUsuario?').get(config.getNombreCompleto);
router.route('/administracion/reportes/V1.0.0/ingreso').post(config.postReporteIngreso);
router.route('/administracion/usuarios/V1.0.0/configuracion/:idUsuario?/:configuracion?').get(config.putConfiguracionTarjetas);



module.exports = router;
