import React, { Component } from 'react';
import { VentaService } from '../services/VentaService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog} from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export class VentaComponent extends Component{
  constructor(){
    super();
    this.state = {
        visible: false,
        venta: {
            id: '',
            cedula: '',
            ivaVenta: '',
            totalVenta: '',
            valorVenta: ''
        },
        selectedVenta: {}
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
    this.ventaService = new VentaService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
        <Button label="Guardar" icon="pi pi-check" onClick={this.save}/>
    );
  }

  componentDidMount() {
    this.ventaService.getAll().then(data => {this.setState({ventas: data})})
  }

  save(){
    this.ventaService.save(this.state.venta).then(data => {
        this.setState({
            visible: false,
            venta: {
                id: '',
                cedula: '',
                ivaVenta: '',
                totalVenta: '',
                valorVenta: ''
            }
        });
        this.ventaService.getAll().then(data => {this.setState({venta: data})});
        this.toast.show({severity: 'success', summary: 'Registro Guardado!', detail: 'El registro fue guardado exitosamente!'});
    })
  }

  delete(){
    if(window.confirm("¿Desea eliminar el registro?")){
      this.ventaService.delete(this.state.selectedVenta.id).then(data =>{
        this.toast.show({severity: 'success', summary: 'Registro Eliminado!', detail: 'El registro fue eliminado exitosamente!'});
        this.ventaService.getAll().then(data => {this.setState({ventas: data})});
      })
    }
  }

  render(){
    return(
      
      <div style={{width:'80%', margin:'0 auto', marginTop:'40px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="Ventas">
          <DataTable value={this.state.ventas} selectionMode="single" selection={this.state.selectedVenta} onSelectionChange={e => this.setState({ selectedVenta: e.value })}>
            <Column field="id" header="ID"></Column>
            <Column field="cedula" header="Cédula"></Column>
            <Column field="ivaVenta" header="IVA Venta"></Column>
            <Column field="totalVenta" header="Total Venta"></Column>
            <Column field="valorVenta" header="Valor Venta"></Column>
          </DataTable>
        </Panel>

        <Dialog header="Crear venta" footer={this.footer} visible={this.state.visible} style={{ width: '400px' }} modal={true} onHide={() => this.setState({visible: false})}>
        <form id="venta-form">
            <span className="p-float-label">
                <InputNumber style={{ width: '100%' }} value={this.state.venta.id} onValueChange={(e) => {

                    let val = e.target.value;

                    this.setState(prevState => {
                        let venta = Object.assign({}, prevState.venta)
                        venta.id = val

                        return {venta};
                    })}
                } />
                <label htmlFor="id">ID</label>
            </span>

            <br/>

            <span className="p-float-label">
                <InputNumber style={{ width: '100%' }} value={this.state.venta.cedula} onValueChange={(e) => {

                    let val = e.target.value;

                    this.setState(prevState => {
                        let venta = Object.assign({}, prevState.venta)
                        venta.cedula = val

                        return {venta};
                    })}
                } />
                <label htmlFor="id">Cédula</label>
            </span>

            <br/>

            <span className="p-float-label">
                <InputNumber style={{ width: '100%' }} id="iva-venta" value={this.state.venta.ivaVenta} mode="decimal" onValueChange={(e) => {

                    let val = e.target.value;

                    this.setState(prevState => {
                        let venta = Object.assign({}, prevState.venta)
                        venta.ivaVenta = val
    
                        return {venta};
                    })}
                } />
                <label htmlFor="iva-venta">IVA Venta</label>
            </span>

            <br/>

            <span className="p-float-label">
                <InputNumber style={{ width: '100%' }} id="total-venta" value={this.state.venta.totalVenta} mode="decimal" onValueChange={(e) => {

                    let val = e.target.value;

                    this.setState(prevState => {
                        let venta = Object.assign({}, prevState.venta)
                        venta.totalVenta = val
    
                        return {venta};
                    })}
                } />
                <label htmlFor="total-venta">Total Venta</label>
          </span>

          <br/>

          <span className="p-float-label">
                <InputNumber style={{ width: '100%' }} id="valor-venta" value={this.state.venta.valorVenta} mode="decimal" onValueChange={(e) => {

                    let val = e.target.value;

                    this.setState(prevState => {
                        let venta = Object.assign({}, prevState.venta)
                        venta.valorVenta = val
    
                        return {venta};
                    })}
                } />
                <label htmlFor="valor-venta">Valor Venta</label>
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
        venta: {
            id: '',
            cedula: '',
            ivaVenta: '',
            totalVenta: '',
            valorVenta: ''
        }
    });
  }

  showEditDialog(){
    this.setState({
        visible: true,
        venta: {
            id: this.state.selectedVenta.id,
            cedula: this.state.selectedVenta.cedula,
            ivaVenta: this.state.selectedVenta.ivaVenta,
            totalVenta: this.state.selectedVenta.totalVenta,
            valorVenta: this.state.selectedVenta.valorVenta
        }
    })
  }
}

export default VentaComponent;