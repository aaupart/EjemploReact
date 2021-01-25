import axios from 'axios';
import propData from '../../config/properties/reportes/properties.json';

export default class ReportesService{
    consultarReporteOutbound(parametros){
        return axios.post(propData.service.reporte.outbound.prop, parametros).then(res => res.data);
    }

    consultarReporteDicta1(parametros){
        return axios.post(propData.service.reporte.dicta1.prop, parametros).then(res => res.data);
    }

    consultarReporteDicta3(parametros){
        return axios.post(propData.service.reporte.dicta3.prop, parametros).then(res => res.data);
    }

    consultarReporteVerdes(parametros){
        return axios.post(propData.service.reporte.verdes.prop, parametros).then(res => res.data);
    }

    consultarReporteJP(parametros){
        return axios.post(propData.service.reporte.citas.prop, parametros).then(res => res.data);
    }

    consultarReporteReest(parametros){
        return axios.post(propData.service.reporte.reest.prop, parametros).then(res => res.data);
    }

    consultarReporteEAZ(parametros){
        return axios.post(propData.service.reporte.eaz.prop, parametros).then(res => res.data);
    }
}