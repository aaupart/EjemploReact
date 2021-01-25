import React, { Component } from 'react';

import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import '../../../theme/estilos.scss';

export default class Dashboard extends Component {

    componentDidMount() {
        document.title = "MICC: Dashboard";
    }

    render() {
        return (
            <div>
                <div className="App-content-sass">
                    <h1>Mesa de Crédito</h1>
                </div>
            </div>
        )
    }
}