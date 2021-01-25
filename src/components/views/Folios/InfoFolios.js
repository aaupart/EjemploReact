import React, { Component } from 'react';
import FoliosService from '../../../services/Folios/FoiosService';
import { Modal } from '../../common/Modal';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import '../../../theme/estilos.scss';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';

const foliosService = new FoliosService();

export default class InfoFolios extends Component {
    constructor(props) {
        super(props);

        this.contenidoDialog = {
            detalle: null,
            mensaje: null
        };

        this.state = {
            open: false,
            checked: true
        };

        this.params = {
            numFolio: null
        };

        this.respuesta = {
            data: null
        };

        this.handleClose = this.handleClose.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.mostrarDatos = this.mostrarDatos.bind(this);
    }

    componentDidMount() {
        document.title = "MICC: Información Folios";
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    showDialog(header, content) {
        this.contenidoDialog.detalle = header;
        this.contenidoDialog.mensaje = content;
        this.setState({
            open: true
        });
    }

    handleChange(event) {
        this.params.numFolio = event.target.value;
    }

    handleClick() {
        if(this.params.numFolio !== null && this.params.numFolio !== ""){
            foliosService.consultarInfoFolios(this.params).then(
                data => data.data != null ? this.mostrarDatos(data.data) : this.mostrarDatos(null)
            );
        }
        else{
            this.showDialog('Problemas al consultar información de folio', 'Los parametros de entrada no pueden ser NULL o ir vacios');
        }
    }

    mostrarDatos(datos){
        if(datos != null){
            this.respuesta.data = datos;
            this.setState({
                checked: false
            });
        }
        else{
            this.showDialog('Problemas al consultar información de folio', 'No se encontro información con ese número de folio, probar con uno distinto');
        }
    }

    render() {
        return (
            <div>
                <br />
                <div className="p-fluid p-grid p-formgrid">
                    <div className="p-col-12 p-md-3">
                        <div className="p-inputgroup">
                            <Button label="Buscar" onClick={this.handleClick}/>
                            <InputText placeholder="Número de folio" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div hidden={this.state.checked}>
                        <br /><br /><br />
                        <DataTable value={this.respuesta.data} className="p-col-12">
                            <Column field="estadoFolio" header="Estatus Folio" style={{textAlign: "center"}} className="p-md-1"></Column>
                            <Column field="idFolio" header="ID Folio" style={{textAlign: "center"}} className="p-md-1"></Column>
                            <Column field="numeroFolio" header="Número Folio" style={{textAlign: "center"}} className="p-md-2"></Column>
                            <Column field="clienteUnico" header="Cliente Único" style={{textAlign: "center"}} className="p-md-1"></Column>
                            <Column field="canal" header="Canal TDA" style={{textAlign: "center"}} className="p-md-1"></Column>
                            <Column field="sucursal" header="Sucursal TDA" style={{textAlign: "center"}} className="p-md-1"></Column>
                            <Column field="solicitud" header="Solicitud TDA" style={{textAlign: "center"}} className="p-md-1"></Column>
                            <Column field="solicitudNoc" header="Solicitud NOC" style={{textAlign: "center"}} className="p-md-2"></Column>
                        </DataTable>
                        <br />
                        <DataTable value={this.respuesta.data}>                            
                            <Column field="idTipificacion" header="ID Tipificación" style={{textAlign: "center"}}></Column>
                            <Column field="tipificacion" header="Tipificación" style={{textAlign: "center"}}></Column>
                            <Column field="estatusSolicitud" header="Estatus Solicitud" style={{textAlign: "center"}}></Column>
                            <Column field="conteo" header="Condicionamientos" style={{textAlign: "center"}}></Column>
                        </DataTable>
                        <br />
                        <DataTable value={this.respuesta.data}>
                            <Column field="datosDocumentos.estatusID" header="Estatus ID" style={{textAlign: "center"}}></Column>
                            <Column field="datosDocumentos.tipID" header="Tipificación ID" style={{textAlign: "center"}}></Column>
                            <Column field="datosDocumentos.comentID" header="Comentario ID" style={{textAlign: "center"}}></Column>
                        </DataTable>
                        <br />
                        <DataTable value={this.respuesta.data}>
                            <Column field="datosDocumentos.estatusCompDomicilio" header="Estatus Comp. Domicilio" style={{textAlign: "center"}}></Column>
                            <Column field="datosDocumentos.tipCompDomicilio" header="Tipificación Comp. Domicilio" style={{textAlign: "center"}}></Column>
                            <Column field="datosDocumentos.comentCompDomicilio" header="Comentario Comp. Domicilio" style={{textAlign: "center"}}></Column>
                        </DataTable>
                        <br />
                        <DataTable value={this.respuesta.data}>
                            <Column field="datosDocumentos.estatusCompIngresos" header="Estatus Comp. Ingresos" style={{textAlign: "center"}}></Column>
                            <Column field="datosDocumentos.tipCompIngresos" header="Tipificación Comp. Ingresos" style={{textAlign: "center"}}></Column>
                            <Column field="datosDocumentos.comentCompIngresos" header="Comentario Comp. Ingresos" style={{textAlign: "center"}}></Column>
                        </DataTable>
                    </div>
                    <div>
                        <Modal open={this.state.open} handleClose={this.handleClose} detalle={this.contenidoDialog.detalle} mensaje={this.contenidoDialog.mensaje} />
                    </div>
                </div>
            </div >
        );
    }
}