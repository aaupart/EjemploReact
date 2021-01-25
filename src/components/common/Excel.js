import React from 'react';
import { Button } from 'primereact/button';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export function Excel(props) {
    return (
        <ExcelFile name={props.nombre} filename={props.nombre} element={<Button label="Descargar" className="p-button" />}>
            <ExcelSheet dataSet={props.reporte} name="Solicitudes" />
        </ExcelFile>
    );
}