import React, { Component } from 'react';

import '../../theme/estilos.scss';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <div className="App-footer-sass">
                    <div >
                        <strong>404</strong>
                        <p>PAGE NOT FOUND</p>
                        <br /><span>La página que estas buscando podría haber sido eliminada o no esta disponible temporalmente</span><br /><br /><br />
                    </div>
                </div>
            </div>
        )
    }
}