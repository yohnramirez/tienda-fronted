import Navbar from './components/Navbar';
import ClienteComponent from './components/ClienteComponent';
import ConsolidadoComponent from './components/ConsolidadoComponent';
import ProductoComponent from './components/ProductoComponent';
import ProveedorComponent from './components/ProveedorComponent';
import UsuarioComponent from './components/UsuarioComponent';
import VentaComponent from './components/VentaComponent';
import InicioComponent from './components/InicioComponent';
import ReporteComponent from './components/ReporteComponent';
import LoginComponent from './components/LoginComponent';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<LoginComponent/>}/>
            <Route path='/Inicio' element={<InicioComponent/>}/>
            <Route path='/Usuarios' element={<UsuarioComponent/>}/>
            <Route path='/Clientes' element={<ClienteComponent/>}/>
            <Route path='/Productos' element={<ProductoComponent/>}/>
            <Route path='/Proveedores' element={<ProveedorComponent/>}/>
            <Route path='/Consolidados' element={<ConsolidadoComponent/>}/>
            <Route path='/Ventas' element={<VentaComponent/>}/>
            <Route path='/Reportes' element={<ReporteComponent/>}/>
          </Routes>
        </Router>
    </div>
    )
  }
}

