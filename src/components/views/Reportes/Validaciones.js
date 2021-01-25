const dias = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
const meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

export class Validaciones{

    ValidarRangoFechas(arrDate1, arrDate2) {
        let dia = parseInt(arrDate1[0]) - 1;
        let mes = parseInt(arrDate1[1]) - 1;
        let fechaAux = null;
    
        if (mes === 0 && dia === 30) {
            fechaAux = 30 + "/" + meses[mes + 1] + "/" + parseInt(arrDate1[2]);
        } else if ((mes === 2 || mes === 4 || mes === 7 || mes === 9) && dia === 30) {
            fechaAux = 30 + "/" + meses[mes + 1] + "/" + parseInt(arrDate1[2]);
        } else if (mes === 11 && dia === 30) {
            fechaAux = dias[dia] + "/" + meses[0] + "/" + parseInt(arrDate1[2]);
        } else if (mes === 11) {
            fechaAux = dias[dia] + "/" + meses[0] + "/" + (parseInt(arrDate1[2]) + 1);
        } else {
            fechaAux = dias[dia] + "/" + meses[mes + 1] + "/" + parseInt(arrDate1[2]);
        }
    
        if (parseInt(arrDate1[2]) > parseInt(arrDate2[2])) {
            return 2;
        } else if (parseInt(arrDate1[2]) === parseInt(arrDate2[2]) && parseInt(arrDate1[1]) > parseInt(arrDate2[1])) {
            return 2;
        } else if (parseInt(arrDate1[2]) === parseInt(arrDate2[2]) && parseInt(arrDate1[1]) === parseInt(arrDate2[1]) && parseInt(arrDate1[0]) > parseInt(arrDate2[0])) {
            return 2;
        } else if (parseInt(arrDate2[2]) > parseInt(fechaAux.substr(6, 4))) {
            return 3;
        } else if (parseInt(arrDate2[2]) === parseInt(fechaAux.substr(6, 4)) && parseInt(arrDate2[1]) > parseInt(fechaAux.substr(3, 2))) {
            return 3;
        } else if (parseInt(arrDate2[2]) === parseInt(fechaAux.substr(6, 4)) && parseInt(arrDate2[1]) === parseInt(fechaAux.substr(3, 2)) && parseInt(arrDate2[0]) > parseInt(fechaAux.substr(0, 2))) {
            return 3;
        } else {
            return 1;
        }
    }

    ArmarReporteOutbound(arreglo){
        let reporte = [{
            columns: [],
            data: []
        }];

        reporte[0].columns = ["Id Folio", "Numero Folio", "Canal", "Sucursal", "Solicitud", "Solicitud NOC", "CU",
        "Fecha Originación", "Fecha Agendada", "Hora Agendada", "Fecha Verificación", "Hora Verificación",
        "Fecha de Alta en Mesa", "Numero de Empleado del JVC", "JVC Verfico", "ID Estatus", "ID Motivo",
        "Descripción del Motivo", "Comentario JVC", "Productos", "Monto Maximo", "Plazo Minimo",
        "Nombre Cliente", "Apellido Paterno Cliente", "Apellido Materno Cliente", "Sexo", "Edición de Datos",
        "Calle", "Numero Exterior", "Numero Interior", "Colonia", "Codigo Postal", "Población", "Estado",
        "Referencia", "Longitud", "Latitud", "Heading", "Pitch", "Zoom", "Fov",
        "Id Antiguedad", "Descripción Antiguedad", "Bloqueado", "Domicilio Actual",
        "Id Tipo Vivienda", "Descripción Tipo vivienda", "Telefono Celular",
        "Telefono Fijo", "Telefono Fijo Verificación", "Fecha Agenda Visita", "Hora Agenda Visita", "Fecha Agenda Llamada",
        "Hora Agenda Llamada", "Id Tipificación", "Tipificación", "Comentario", "Nombre Operador", "Apellido Paterno Operador",
        "Apellido Materno Operador", "Numero de Intento", "Estado del Folio", "Fecha Inicio", "Hora Inicio", "Fecha Fin",
        "Hora Fin", "Duración Folio", "Id Región", "Descripcion Región", "Id Regional Ventas", "Descripcion Regional Ventas",
        "Tipo Solicitud", "Descripción Solicitud", "Contador"];

        for (var i = 0; i < arreglo.length; i++) {
            reporte[0].data.push(
                [
                    arreglo[i].solicitud.idFolio, arreglo[i].solicitud.numFolio, arreglo[i].solicitud.canal,
                    arreglo[i].solicitud.sucursal, arreglo[i].solicitud.solicitud, arreglo[i].solicitud.solicitudNoc,
                    arreglo[i].solicitud.cu, arreglo[i].solicitud.fechaOriginacion, arreglo[i].solicitud.fechaAgenda,
                    arreglo[i].solicitud.horaAgenda, arreglo[i].solicitud.fechaVerificacion, arreglo[i].solicitud.horaVerificacion,
                    arreglo[i].solicitud.fechaAltaMesa, arreglo[i].solicitud.numEmpleadoJVC, arreglo[i].solicitud.jvcVerifico,
                    arreglo[i].solicitud.idStatus, arreglo[i].solicitud.idMotivo, arreglo[i].solicitud.descMotivoJVC,
                    arreglo[i].solicitud.comentarioJVC, arreglo[i].productos, arreglo[i].montoMax, arreglo[i].plazoMax,
                    arreglo[i].solicitud.nombreCliente, arreglo[i].solicitud.apellidoPaternoCliente, arreglo[i].solicitud.apellidoMaternoCliente,
                    arreglo[i].solicitud.sexo, arreglo[i].domicilio.editDatos, arreglo[i].domicilio.calle, arreglo[i].domicilio.numExt,
                    arreglo[i].domicilio.numInt, arreglo[i].domicilio.colonia, arreglo[i].domicilio.cp, arreglo[i].domicilio.poblacion,
                    arreglo[i].domicilio.estado, arreglo[i].domicilio.referencia, arreglo[i].domicilio.longitud,
                    arreglo[i].domicilio.latitud, arreglo[i].domicilio.heading, arreglo[i].domicilio.pitch, arreglo[i].domicilio.zoom,
                    arreglo[i].domicilio.fov, arreglo[i].domicilio.idAntiguedad, arreglo[i].domicilio.descAntiguedad,
                    arreglo[i].domicilio.bloqueado, arreglo[i].domicilio.domicilioAct, arreglo[i].domicilio.idTipoVivienda,
                    arreglo[i].domicilio.descTipoVivienda, arreglo[i].solicitud.telCel, arreglo[i].solicitud.telFijo,
                    arreglo[i].solicitud.telFijoVerifi, arreglo[i].fechaAgendaVisit, arreglo[i].horaAgendaVisit, arreglo[i].fechaAgendaLlamada,
                    arreglo[i].horaAgendaLlamada, arreglo[i].solicitud.idTipificacion, arreglo[i].solicitud.tipificacion,
                    arreglo[i].solicitud.comentario, arreglo[i].solicitud.nombreOperador, arreglo[i].solicitud.apellidoPaternoOperador,
                    arreglo[i].solicitud.apellidoMaternoOperador, arreglo[i].solicitud.intento, arreglo[i].solicitud.estado,
                    arreglo[i].solicitud.fechaInicio, arreglo[i].solicitud.horaInicio, arreglo[i].solicitud.fechaFin,
                    arreglo[i].solicitud.horaFin, arreglo[i].solicitud.duracionFolio, arreglo[i].solicitud.idRegion,
                    arreglo[i].solicitud.descReg, arreglo[i].solicitud.idRegVentas, arreglo[i].solicitud.descRegVentas,
                    arreglo[i].solicitud.tipoSolicitud, arreglo[i].solicitud.descSolicitud, arreglo[i].solicitud.contador
                ]
            );
        }

        return reporte;
    }

    ArmarReporteDicta1(arreglo){
        let reporte = [{
            columns: [],
            data: []
        }];

        reporte[0].columns = [];

        for (var i = 0; i < arreglo.length; i++) {
            reporte[0].data.push(
                [
                    
                ]
            );
        }

        return reporte;
    }

    ArmarReporteDicta3(arreglo){
        let reporte = [{
            columns: [],
            data: []
        }];

        reporte[0].columns = [];

        for (var i = 0; i < arreglo.length; i++) {
            reporte[0].data.push(
                [
                    
                ]
            );
        }

        return reporte;
    }

    ArmarReporteVerdes(arreglo){
        let reporte = [{
            columns: [],
            data: []
        }];

        reporte[0].columns = [];

        for (var i = 0; i < arreglo.length; i++) {
            reporte[0].data.push(
                [
                    
                ]
            );
        }

        return reporte;
    }

    ArmarReporteCitasJP(arreglo){
        let reporte = [{
            columns: [],
            data: []
        }];

        reporte[0].columns = [];

        for (var i = 0; i < arreglo.length; i++) {
            reporte[0].data.push(
                [
                    
                ]
            );
        }

        return reporte;
    }

    ArmarReporteReest(arreglo){
        let reporte = [{
            columns: [],
            data: []
        }];

        reporte[0].columns = [];

        for (var i = 0; i < arreglo.length; i++) {
            reporte[0].data.push(
                [
                    
                ]
            );
        }

        return reporte;
    }

    ArmarReporteEAZ(arreglo){
        let reporte = [{
            columns: [],
            data: []
        }];

        reporte[0].columns = [];

        for (var i = 0; i < arreglo.length; i++) {
            reporte[0].data.push(
                [
                    
                ]
            );
        }

        return reporte;
    }

}
