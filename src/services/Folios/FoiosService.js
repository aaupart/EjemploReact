import axios from 'axios';
import propData from '../../config/properties/folios/properties.json';

export default class FoliosService{
    consultarInfoFolios(parametros){
        return axios.post(propData.service.folio.infoFolios.prop, parametros).then(res => res.data);
    }
}