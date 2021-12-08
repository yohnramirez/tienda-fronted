import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUser} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

import './InicioComponent.css'

export default class ReporteComponent extends Component {
    render() {
        return (
            <div className="cont container d-flex justify-content-center align-items-center flex-wrap gap-3" style={{height: '90vh'}}>
                <div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <FontAwesomeIcon icon={faUser}/>
                        <Link className="link" to="/Usuarios">Listado de Usuarios</Link>
                    </div>
                </div>

                <div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <FontAwesomeIcon icon={faUsers}/>
                        <Link className="link" to="/Clientes">Ventas por Cliente</Link>
                    </div>
                </div>
            </div>
        )
    }
}