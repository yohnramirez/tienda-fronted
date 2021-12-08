import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUser, faBook, faBoxes, faBuilding, faMoneyBill, faPersonBooth } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

import './InicioComponent.css'

export default class InicioComponent extends Component {
    render() {
        return (
            <div className="cont container d-flex justify-content-center align-items-center flex-wrap gap-3" style={{height: '90vh'}}>
                <div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <FontAwesomeIcon icon={faUser}/>
                        <Link className="link" to="/Usuarios">Usuarios</Link>
                    </div>
                </div>

                <div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <FontAwesomeIcon icon={faUsers}/>
                        <Link className="link" to="/Clientes">Clientes</Link>
                    </div>
                </div>

                <div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <FontAwesomeIcon icon={faBoxes}/>
                        <Link className="link" to="/Productos">Productos</Link>
                    </div>
                </div>

                <div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <FontAwesomeIcon icon={faPersonBooth}/>
                        <Link className="link" to="/Proveedores">Proveedores</Link>
                    </div>
                </div>

                <div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <FontAwesomeIcon icon={faBuilding}/>
                        <Link className="link" to="/Consolidados">Consolidados</Link>
                    </div>
                </div>

                <div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <FontAwesomeIcon icon={faMoneyBill}/>
                        <Link className="link" to="/Ventas">Ventas</Link>
                    </div>
                </div>

                <div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <FontAwesomeIcon icon={faBook}/>
                        <Link className="link" to="/Reportes">Reportes</Link>
                    </div>
                </div>
            </div>
        )
    }
}
