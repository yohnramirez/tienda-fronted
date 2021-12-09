import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navigation">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/Inicio">Tienda La Genérica</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/Usuarios">Usuarios</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Clientes">Clientes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Productos">Productos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Proveedores">Proveedores</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Consolidados">Consolidados</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Ventas">Ventas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Reportes">Reportes</Link>
                            </li>   
                        </ul>
                        <ul className="d-flex my-0">
                            <button className="btn btn-danger">Cerrar Sesión</button>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar

