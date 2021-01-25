import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import ReportesService from '../../../services/Reportes/ReportesService';
import { Excel } from '../../common/Excel';
import { Modal } from '../../common/Modal';
import { Validaciones } from './Validaciones';

import '../../../theme/estilos.scss';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import "react-datepicker/dist/react-datepicker.css";

const estatus = [{ name: 'Todos', code: '' }, { name: 'Pendientes', code: '1' }, { name: 'Finalizados', code: '2' }, { name: 'Cancelados', code: '3' }, { name: 'En proceso', code: '4' }];
const reportesServices = new ReportesService();
const validaciones = new Validaciones();

export default class Reportes extends Component {
    constructor(props) {
        super(props);

        this.idEsc = this.props.match.params.escenario;

        this.state = {
            date1: null,
            date2: null,
            selectEstatus: null,
            open: false,
            checked: true
        };

        this.params = {
            fechaInicio: null,
            fechaFin: null,
            idEstFolio: null
        };

        this.reporte = [{
            columns: [],
            data: []
        }];

        this.nombreReporte = null;

        this.contenidoDialog = {
            detalle: null,
            mensaje: null
        };

        this.validarEscenario = this.validarEscenario.bind(this);
        this.handleEstatusChange = this.handleEstatusChange.bind(this);
        this.handleIniChange = this.handleIniChange.bind(this);
        this.handleFinChange = this.handleFinChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.validarFechas = this.validarFechas.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.consultarSolicitudes = this.consultarSolicitudes.bind(this);
        this.construirTabla = this.construirTabla.bind(this);
    }

    componentDidMount() {
        this.validarEscenario();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.escenario !== prevProps.match.params.escenario) {
            this.idEsc = this.props.match.params.escenario;
        }
        this.validarEscenario();
    }

    validarEscenario() {
        switch (this.idEsc) {
            case 'Outbound':
            case 'Dictaminacion1':
            case 'Dictaminacion3':
            case 'ClientesVerdes':
            case 'CitasJP':
            case 'Reestructura':
            case 'EmpresarioAzteca':
                document.title = `MICC: Reporte ${this.idEsc}`;
                break;
            default:
                window.location.href = "/Mantenimientos/";
                break;
        }
    }

    handleIniChange(date) {
        this.setState({
            date1: date
        });
    }

    handleFinChange(date) {
        this.setState({
            date2: date
        });
    }

    handleEstatusChange(e) {
        this.setState({
            selectEstatus: e.value
        });
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleClick() {
        if (this.state.date1 != null && this.state.date2 != null && this.state.selectEstatus != null) {
            var arrDate1 = this.state.date1.toLocaleDateString().split("/");
            var arrDate2 = this.state.date2.toLocaleDateString().split("/");

            let valida = this.validarFechas(arrDate1, arrDate2);

            if (valida) {
                this.params.fechaInicio = this.state.date1.toLocaleDateString();
                this.params.fechaFin = this.state.date2.toLocaleDateString();
                this.params.idEstFolio = this.state.selectEstatus.code;
                this.consultarSolicitudes();
            }
        }
        else {
            this.showDialog('Problemas al generar reporte', 'Los parametros de entrada no pueden ir vacios');
        }
    }

    validarFechas(arrDate1, arrDate2) {
        let validar = validaciones.ValidarRangoFechas(arrDate1, arrDate2);

        if (validar === 2) {
            this.showDialog('Problemas al generar reporte', 'La fecha inicio no puede ser mayor que la fecha fin');
            return false;
        } else if (validar === 3) {
            this.showDialog('Problemas al generar reporte', 'Las fechas exceden el rango de un mes');
            return false;
        } else {
            return true;
        }
    }

    consultarSolicitudes() {
        switch (this.idEsc) {
            case 'Outbound':
                reportesServices.consultarReporteOutbound(this.params).then(
                    data => data.respuesta != null ? this.construirTabla(data.respuesta) : this.construirTabla(null)
                );
                break;
            case 'Dictaminacion1':
                reportesServices.consultarReporteDicta1(this.params).then(
                    data => data.respuesta != null ? this.construirTabla(data.respuesta) : this.construirTabla(null)
                );
                break;
            case 'Dictaminacion3':
                reportesServices.consultarReporteDicta3(this.params).then(
                    data => data.respuesta != null ? this.construirTabla(data.respuesta) : this.construirTabla(null)
                );
                break;
            case 'ClientesVerdes':
                reportesServices.consultarReporteVerdes(this.params).then(
                    data => data.respuesta != null ? this.construirTabla(data.respuesta) : this.construirTabla(null)
                );
                break;
            case 'CitasJP':
                reportesServices.consultarReporteJP(this.params).then(
                    data => data.respuesta != null ? this.construirTabla(data.respuesta) : this.construirTabla(null)
                );
                break;
            case 'Reestructura':
                reportesServices.consultarReporteReest(this.params).then(
                    data => data.respuesta != null ? this.construirTabla(data.respuesta) : this.construirTabla(null)
                );
                break;
            case 'EmpresarioAzteca':
                reportesServices.consultarReporteEAZ(this.params).then(
                    data => data.respuesta != null ? this.construirTabla(data.respuesta) : this.construirTabla(null)
                );
                break;
            default:
                break;
        }
    }

    construirTabla(arreglo) {
        if (arreglo != null) {
            this.reporte[0].data = [];
            this.reporte[0].columns = [];

            switch (this.idEsc) {
                case 'Outbound':
                    this.reporte = validaciones.ArmarReporteOutbound(arreglo);
                    this.nombreReporte = `Outbound_${this.params.fechaInicio}_to_${this.params.fechaFin}`;
                    break;
                case 'Dictaminacion1':
                    this.reporte = validaciones.ArmarReporteDicta1(arreglo);
                    this.nombreReporte = `Dictaminacion1_${this.params.fechaInicio}_to_${this.params.fechaFin}`;
                    break;
                case 'Dictaminacion3':
                    this.reporte = validaciones.ArmarReporteDicta3(arreglo);
                    this.nombreReporte = `Dictaminacion3_${this.params.fechaInicio}_to_${this.params.fechaFin}`;
                    break;
                case 'ClientesVerdes':
                    this.reporte = validaciones.ArmarReporteVerdes(arreglo);
                    this.nombreReporte = `ClientesVerdes_${this.params.fechaInicio}_to_${this.params.fechaFin}`;
                    break;
                case 'CitasJP':
                    this.reporte = validaciones.ArmarReporteCitasJP(arreglo);
                    this.nombreReporte = `CitasJP_${this.params.fechaInicio}_to_${this.params.fechaFin}`;
                    break;
                case 'Reestructura':
                    this.reporte = validaciones.ArmarReporteReest(arreglo);
                    this.nombreReporte = `Reestructura_${this.params.fechaInicio}_to_${this.params.fechaFin}`;
                    break;
                case 'EmpresarioAzteca':
                    this.reporte = validaciones.ArmarReporteEAZ(arreglo);
                    this.nombreReporte = `EAZ_${this.params.fechaInicio}_to_${this.params.fechaFin}`;
                    break;
                default:
                    break;
            }

            this.setState({
                checked: false
            });
        }
        else {
            this.showDialog('Problemas al generar reporte', 'La consulta no regreso datos, consultar otras fechas');
        }
    }

    showDialog(header, content) {
        this.contenidoDialog.detalle = header;
        this.contenidoDialog.mensaje = content;
        this.setState({
            open: true
        });
    }

    render() {
        return (
            <div>
                <br />
                <div className="p-fluid p-grid p-formgrid">
                    <div className="p-field p-col-12 p-xl-1 p-lg-2 p-md-2 p-sm-2">
                        <Dropdown value={this.state.selectEstatus} options={estatus} onChange={this.handleEstatusChange} optionLabel="name" placeholder="Estatus" />
                    </div>
                    <div className="p-field p-col-12 p-xl-1 p-lg-2 p-md-2 p-sm-2">
                        <DatePicker placeholderText="Fecha Inicio" name="fechaIni" selected={this.state.date1} onChange={this.handleIniChange} dateFormat="dd/MM/yyyy" />
                    </div>
                    <div className="p-field p-col-12 p-xl-1 p-lg-2 p-md-2 p-sm-2">
                        <DatePicker placeholderText="Fecha Fin" name="fechaFin" selected={this.state.date2} onChange={this.handleFinChange} dateFormat="dd/MM/yyyy" />
                    </div>
                    <div className="p-field p-col-12 p-xl-1 p-lg-2 p-md-2 p-sm-2">
                        <Button label="Generar" className="p-button" onClick={this.handleClick} />
                    </div>
                    <div className="p-field p-col-12 p-xl-1 p-lg-2 p-md-2 p-sm-2" hidden={this.state.checked}>
                        <Excel reporte={this.reporte} nombre={this.nombreReporte} />
                    </div>
                    <div>
                        <Modal open={this.state.open} handleClose={this.handleClose} detalle={this.contenidoDialog.detalle} mensaje={this.contenidoDialog.mensaje} />
                    </div>
                </div>
            </div>
        );
    }
}