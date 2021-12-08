import React, { Component } from 'react';
import { UsuarioService } from '../services/UsuarioService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog} from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export class UsuarioComponent extends Component{
  constructor(){
    super();
    this.state = {
      visible: false,
      usuario: {
        id: '',
        email: '',
        nombre: '',
        usuario: '',
        password: ''
      },
      selectedUsuario: {}
    };
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: () => {this.showSaveDialog()}
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => {this.showEditDialog()}
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-fw pi-trash',
        command: () => {this.delete()}
      }
    ];
    this.usuarioService = new UsuarioService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <Button label="Guardar" icon="pi pi-check" onClick={this.save}/>
    );
  }

  componentDidMount() {
    this.usuarioService.getAll().then(data => {this.setState({usuarios: data})})
  }

  save(){
    this.usuarioService.save(this.state.usuario).then(data => {
      this.setState({
        visible: false,
        usuario: {
          id: '',
          email: '',
          nombre: '',
          usuario: '',
          password: ''
        }
      });
      this.usuarioService.getAll().then(data => {this.setState({usuarios: data})});
      this.toast.show({severity: 'success', summary: 'Registro Guardado!', detail: 'El registro fue guardado exitosamente!'});
    })
  }

  delete(){
    if(window.confirm("¿Desea eliminar el registro?")){
      this.usuarioService.delete(this.state.selectedUsuario.id).then(data =>{
        this.toast.show({severity: 'success', summary: 'Registro Eliminado!', detail: 'El registro fue eliminado exitosamente!'});
        this.usuarioService.getAll().then(data => {this.setState({usuarios: data})});
      })
    }
  }

  render(){
    return(
      
      <div style={{width:'80%', margin:'0 auto', marginTop:'40px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="Usuarios">
          <DataTable value={this.state.usuarios} selectionMode="single" selection={this.state.selectedUsuario} onSelectionChange={e => this.setState({ selectedUsuario: e.value })}>
            <Column field="id" header="ID"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="usuario" header="Usuario"></Column>
            <Column field="password" header="Password"></Column>
          </DataTable>
        </Panel>

        <Dialog header="Crear usuario" footer={this.footer} visible={this.state.visible} style={{ width: '400px' }} modal={true} onHide={() => this.setState({visible: false})}>
        <form id="usuario-form">
          <span className="p-float-label">
            <InputNumber style={{ width: '100%' }} value={this.state.usuario.id} onValueChange={(e) => {

              let val = e.target.value;

              this.setState(prevState => {
                let usuario = Object.assign({}, prevState.usuario)
                usuario.id = val

                return {usuario};
              })}
            } />
            <label htmlFor="id">ID</label>
          </span>

          <br/>
  
          <span className="p-float-label">
            <InputText style={{ width: '100%' }} id="email" value={this.state.usuario.email} onChange={(e) => {

              let val = e.target.value;

              this.setState(prevState => {
                let usuario = Object.assign({}, prevState.usuario)
                usuario.email = val

                return {usuario};
              })}
            } />
            <label htmlFor="id">Email</label>
          </span>

          <br/>

          <span className="p-float-label">
            <InputText style={{ width: '100%' }} id="nombre" value={this.state.usuario.nombre} onChange={(e) => {

              let val = e.target.value;

              this.setState(prevState => {
                let usuario = Object.assign({}, prevState.usuario)
                usuario.nombre = val

                return {usuario};
              })}
            } />
              <label htmlFor="id">Nombre</label>
          </span>

          <br/>

          <span className="p-float-label">
            <InputText style={{ width: '100%' }} id="usuario" value={this.state.usuario.usuario} onChange={(e) => {

              let val = e.target.value;

              this.setState(prevState => {
                let usuario = Object.assign({}, prevState.usuario)
                usuario.usuario = val

                return {usuario};
              })}
            } />
            <label htmlFor="id">Usuario</label>
          </span>

          <br/>

          <span className="p-float-label">
            <InputText style={{ width: '100%' }} id="password" value={this.state.usuario.password} onChange={(e) => {

              let val = e.target.value;

              this.setState(prevState => {
                let usuario = Object.assign({}, prevState.usuario)
                usuario.password = val

                return {usuario};
              })}
            } />
            <label htmlFor="id">Password</label>
          </span>
        </form>
        </Dialog>
        <Toast ref={(el) => this.toast = el} />
      </div>
    );
  }

  showSaveDialog(){
    this.setState({ 
      visible: true,
      usuario: {
        id: '',
        email: '',
        nombre: '',
        usuario: '',
        password: ''
      }
    });
  }

  showEditDialog(){
    this.setState({
      visible: true,
      usuario: {
        id: this.state.selectedUsuario.id,
        email: this.state.selectedUsuario.email,
        nombre: this.state.selectedUsuario.nombre,
        usuario: this.state.selectedUsuario.usuario,
        password: this.state.selectedUsuario.password
      }
    })
  }
}

export default UsuarioComponent;