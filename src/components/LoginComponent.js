import React, { Component } from 'react'

import './LoginComponent.css'

export default class LoginComponent extends Component {
    componentDidMount(){
        document.getElementById('navigation').style.display = "none";
    }

    render() {
        return (
            <div className="container">
                <h2>Iniciar Sesión</h2>
                <div className="cont card">
                    <div className="cont-img"></div>
                    <div className="cont-body">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Usuario"/>
                            <label htmlFor="floatingInput">Usuario</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Constraseña"/>
                            <label htmlFor="floatingPassword">Constraseña</label>
                        </div>
                        <div class="form-floating">
                            <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                <option selected>Elija el consolidado</option>
                                <option value="1">Bogotá</option>
                                <option value="2">Cali</option>
                                <option value="3">Medellín</option>
                            </select>
                            <label for="floatingSelect">Consolidados</label>
                        </div>
                        <button className="btn btn-primary">Ingresar</button>
                    </div>
                </div>
            </div>
        )
    }
}
