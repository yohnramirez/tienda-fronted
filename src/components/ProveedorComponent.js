import React, { Component } from 'react';
import { ProveedorService } from '../services/ProveedorService';
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

export class ProveedorComponent extends Component{
  constructor(){
    super();
    this.state = {
        visible: false,
        proveedor: {
            id: '',
            nombre: '',
            direccion: '',
            ciudad: '',
            telefono: ''
        },
        selectedProveedor: {}
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
    this.proveedorService = new ProveedorService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
        <Button label="Guardar" icon="pi pi-check" onClick={this.save}/>
    );
  }

  componentDidMount() {
    this.proveedorService.getAll().then(data => {this.setState({proveedores: data})})
  }

  save(){
    this.proveedorService.save(this.state.proveedor).then(data => {
        this.setState({
            visible: false,
            proveedor: {
                id: '',
                nombre: '',
                direccion: '',
                ciudad: '',
                telefono: ''
            }
        });
        this.proveedorService.getAll().then(data => {this.setState({proveedores: data})});
        this.toast.show({severity: 'success', summary: 'Registro Guardado!', detail: 'El registro fue guardado exitosamente!'});
    })
  }

  delete(){
    if(window.confirm("¿Desea eliminar el registro?")){
      this.proveedorService.delete(this.state.selectedProveedor.id).then(data =>{
        this.toast.show({severity: 'success', summary: 'Registro Eliminado!', detail: 'El registro fue eliminado exitosamente!'});
        this.proveedorService.getAll().then(data => {this.setState({proveedores: data})});
      })
    }
  }

  render(){
    return(
      
      <div style={{width:'80%', margin:'0 auto', marginTop:'40px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="Proveedores">
          <DataTable value={this.state.proveedores} selectionMode="single" selection={this.state.selectedProveedor} onSelectionChange={e => this.setState({ selectedProveedor: e.value })}>
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="direccion" header="Dirección"></Column>
            <Column field="ciudad" header="Ciudad"></Column>
            <Column field="telefono" header="Telefono"></Column>
          </DataTable>
        </Panel>

        <Dialog header="Crear proveedor" footer={this.footer} visible={this.state.visible} style={{ width: '400px' }} modal={true} onHide={() => this.setState({visible: false})}>
        <form id="proveedor-form">
            <span className="p-float-label">
                <InputNumber style={{ width: '100%' }} value={this.state.proveedor.id} onValueChange={(e) => {

                    let val = e.target.value;

                    this.setState(prevState => {
                        let proveedor = Object.assign({}, prevState.proveedor)
                        proveedor.id = val

                        return {proveedor};
                    })}
                } />
                <label htmlFor="id">ID</label>
            </span>

            <br/>
  
            <span className="p-float-label">
                <InputText style={{ width: '100%' }} id="nombre" value={this.state.proveedor.nombre} onChange={(e) => {

                    let val = e.target.value;

                    this.setState(prevState => {
                        let proveedor = Object.assign({}, prevState.proveedor)
                        proveedor.nombre = val

                        return {proveedor};
                    })}
                } />
                <label htmlFor="nombre">Nombre</label>
            </span>

          <br/>

            <span className="p-float-label">
                <InputText style={{ width: '100%' }} id="direccion" value={this.state.proveedor.direccion} onChange={(e) => {

                    let val = e.target.value;

                    this.setState(prevState => {
                        let proveedor = Object.assign({}, prevState.proveedor)
                        proveedor.direccion = val

                        return {proveedor};
                    })}
                } />
                <label htmlFor="direccion">Direccion</label>
            </span>

          <br/>

            <span className="p-float-label">
                <InputText style={{ width: '100%' }} id="ciudad" value={this.state.proveedor.ciudad} onChange={(e) => {

                    let val = e.target.value;

                    this.setState(prevState => {
                        let proveedor = Object.assign({}, prevState.proveedor)
                        proveedor.ciudad = val

                        return {proveedor};
                    })}
                } />
                <label htmlFor="ciudad">Ciudad</label>
            </span>

            <br/>

            <span className="p-float-label">
                <InputText style={{ width: '100%' }} id="telefono" value={this.state.proveedor.telefono} onChange={(e) => {

                    let val = e.target.value;

                    this.setState(prevState => {
                        let proveedor = Object.assign({}, prevState.proveedor)
                            proveedor.telefono = val

                            return {proveedor};
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
        proveedor: {
            id: '',
            nombre: '',
            direccion: '',
            ciudad: '',
            telefono: ''
        }
    });
  }

  showEditDialog(){
    this.setState({
        visible: true,
        proveedor: {
            id: this.state.selectedProveedor.id,
            nombre: this.state.selectedProveedor.nombre,
            direccion: this.state.selectedProveedor.direccion,
            ciudad: this.state.selectedProveedor.ciudad,
            telefono: this.state.selectedProveedor.telefono
        }
    })
  }
}

export default ProveedorComponent;