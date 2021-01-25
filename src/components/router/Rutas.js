import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import NotFound from '../common/NotFound';
import Dashboard from '../views/Dashboard/Dashboard';
import Reportes from '../views/Reportes/Reportes';
import InfoFolios from '../views/Folios/InfoFolios';

import '../../theme/estilos.scss';

export default function Rutas() {
  return (
    <Switch>
      <Route exact path={["/Home", "/"]} component={Dashboard} />
      <Route exact path="/Reportes/:escenario" component={Reportes}/>
      <Route exact path="/InformacionFolios" component={InfoFolios}/>
      <Route component={NotFound} />
    </Switch>
  );
}