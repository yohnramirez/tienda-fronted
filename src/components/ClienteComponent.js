import React, { Component } from 'react';
import { ClienteService } from '../services/ClienteService';
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

export class ClienteComponent extends Component{
  constructor(){
    super();
    this.state = {
        visible: false,
        cliente: {
            id: '',
            direccion: '',
            email: '',
            nombre: '',
            telefono: ''
        },
        selectedCliente: {}
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
    this.clienteService = new ClienteService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <Button label="Guardar" icon="pi pi-check" onClick={this.save}/>
    );
  }

  componentDidMount() {
    this.clienteService.getAll().then(data => {this.setState({clientes: data})})
  }

  save(){
    this.clienteService.save(this.state.cliente).then(data => {
      this.setState({
        visible: false,
        cliente: {
            id: '',
            direccion: '',
            email: '',
            nombre: '',
            telefono: ''
          }
      });
      this.clienteService.getAll().then(data => {this.setState({clientes: data})});
      this.toast.show({severity: 'success', summary: 'Registro Guardado!', detail: 'El registro fue guardado exitosamente!'});
    })
  }

  delete(){
    if(window.confirm("¿Desea eliminar el registro?")){
      this.clienteService.delete(this.state.selectedCliente.id).then(data =>{
        this.toast.show({severity: 'success', summary: 'Registro Eliminado!', detail: 'El registro fue eliminado exitosamente!'});
        this.clienteService.getAll().then(data => {this.setState({clientes: data})});
      })
    }
  }

  render(){
    return(
      
      <div style={{width:'80%', margin:'0 auto', marginTop:'40px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="Clientes">
          <DataTable value={this.state.clientes} selectionMode="single" selection={this.state.selectedCliente} onSelectionChange={e => this.setState({ selectedCliente: e.value })}>
            <Column field="id" header="ID"></Column>
            <Column field="direccion" header="Dirección"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="telefono" header="Telefono"></Column>
          </DataTable>
        </Panel>

        <Dialog header="Crear cliente" footer={this.footer} visible={this.state.visible} style={{ width: '400px' }} modal={true} onHide={() => this.setState({visible: false})}>
        <form id="cliente-form">
          <span className="p-float-label">
            <InputNumber style={{ width: '100%' }} value={this.state.cliente.id} onValueChange={(e) => {

              let val = e.target.value;

              this.setState(prevState => {
                let cliente = Object.assign({}, prevState.cliente)
                cliente.id = val

                return {cliente};
              })}
            } />
            <label htmlFor="id">ID</label>
          </span>

          <br/>
  
          <span className="p-float-label">
            <InputText style={{ width: '100%' }} id="direccion" value={this.state.cliente.direccion} onChange={(e) => {

                let val = e.target.value;

                this.setState(prevState => {
                    let cliente = Object.assign({}, prevState.cliente)
                    cliente.direccion = val

                    return {cliente};
                })}
            } />
            <label htmlFor="direccion">Dirección</label>
          </span>

          <br/>

          <span className="p-float-label">
            <InputText style={{ width: '100%' }} id="email" value={this.state.cliente.email} onChange={(e) => {

                let val = e.target.value;

                this.setState(prevState => {
                    let cliente = Object.assign({}, prevState.cliente)
                    cliente.email = val

                    return {cliente};
                })}
            } />
            <label htmlFor="email">Email</label>
          </span>

          <br/>

          <span className="p-float-label">
            <InputText style={{ width: '100%' }} id="nombre" value={this.state.cliente.nombre} onChange={(e) => {

                let val = e.target.value;

                this.setState(prevState => {
                    let cliente = Object.assign({}, prevState.cliente)
                    cliente.nombre = val

                    return {cliente};
                })}
            } />
            <label htmlFor="nombre">Nombre</label>
          </span>

          <br/>

          <span className="p-float-label">
            <InputText style={{ width: '100%' }} id="telefono" value={this.state.cliente.telefono} onChange={(e) => {

                let val = e.target.value;

                this.setState(prevState => {
                    let cliente = Object.assign({}, prevState.cliente)
                    cliente.telefono = val

                    return {cliente};
                })}
            } />
            <label htmlFor="telefono">Teléfono</label>
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
        cliente: {
            id: '',
            direccion: '',
            email: '',
            nombre: '',
            telefono: ''
        }
    });
  }

  showEditDialog(){
    this.setState({
        visible: true,
        cliente: {
            id: this.state.selectedCliente.id,
            direccion: this.state.selectedCliente.direccion,
            email: this.state.selectedCliente.email,
            nombre: this.state.selectedCliente.nombre,
            telefono: this.state.selectedCliente.telefono
        }
    })
  }
}

export default ClienteComponent;