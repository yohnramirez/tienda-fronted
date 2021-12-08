import React, { Component } from 'react';
import { ConsolidadoService } from '../services/ConsolidadoService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog} from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/bootstrap4-light-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export class ConsolidadoComponent extends Component{
  constructor(){
    super();
    this.state = {
        visible: false,
        consolidado: {
            id: '',
            ciudad: '',
            totalVentas: 0,
        },
        selectedConsolidado: {}
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
    this.consolidadoService = new ConsolidadoService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
        <Button label="Guardar" icon="pi pi-check" onClick={this.save}/>
    );
  }

  componentDidMount() {
    this.consolidadoService.getAll().then(data => {this.setState({consolidados: data})})
  }

  save(){
    this.consolidadoService.save(this.state.consolidado).then(data => {
        this.setState({
            visible: false,
            consolidado: {
              id: '',
              ciudad: '',
              totalVentas: 0,
          }
        });
        this.consolidadoService.getAll().then(data => {this.setState({consolidado: data})});
        this.toast.show({severity: 'success', summary: 'Registro Guardado!', detail: 'El registro fue guardado exitosamente!'});
    })
  }

  delete(){
    if(window.confirm("¿Desea eliminar el registro?")){
      this.consolidadoService.delete(this.state.selectedConsolidado.id).then(data =>{
        this.toast.show({severity: 'success', summary: 'Registro Eliminado!', detail: 'El registro fue eliminado exitosamente!'});
        this.consolidadoService.getAll().then(data => {this.setState({consolidados: data})});
      })
    }
  }

  render(){
    return(
      
      <div style={{width:'80%', margin:'0 auto', marginTop:'40px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="Ventas">
          <DataTable value={this.state.consolidados} selectionMode="single" selection={this.state.selectedConsolidado} onSelectionChange={e => this.setState({ selectedConsolidado: e.value })}>
            <Column field="id" header="ID"></Column>
            <Column field="ciudad" header="Ciudad"></Column>
            <Column field="totalVentas" header="Total Ventas"></Column>
          </DataTable>
        </Panel>

        <Dialog header="Crear consolidado" footer={this.footer} visible={this.state.visible} style={{ width: '400px' }} modal={true} onHide={() => this.setState({visible: false})}>
        <form id="consolidado-form">
            <span className="p-float-label">
                <InputNumber style={{ width: '100%' }} value={this.state.consolidado.id} onValueChange={(e) => {

                    let val = e.target.value;

                    this.setState(prevState => {
                        let consolidado = Object.assign({}, prevState.consolidado)
                        consolidado.id = val

                        return {consolidado};
                    })}
                } />
                <label htmlFor="id">ID</label>
            </span>

            <br/>

            <span className="p-float-label">
              <InputText style={{ width: '100%' }} id="ciudad" value={this.state.consolidado.ciudad} onChange={(e) => {

                let val = e.target.value;

                this.setState(prevState => {
                  let consolidado = Object.assign({}, prevState.consolidado)
                  consolidado.ciudad = val

                  return {consolidado};
                })}
              } />
              <label htmlFor="ciudad">Ciudad</label>
            </span>

            <br/>

            <span className="p-float-label">
            <InputNumber style={{ width: '100%' }} value={this.state.consolidado.totalVentas} onValueChange={(e) => {

                let val = e.target.value;

                this.setState(prevState => {
                  let consolidado = Object.assign({}, prevState.consolidado)
                  consolidado.totalVentas = val

                  return {consolidado};
                })}
            } />
            <label htmlFor="total-ventas">Total ventas</label>
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
        consolidado: {
          id: '',
          ciudad: '',
          totalVentas: 0,
      }
    });
  }

  showEditDialog(){
    this.setState({
        visible: true,
        consolidado: {
            id: this.state.selectedConsolidado.id,
            ciudad: this.state.selectedConsolidado.ciudad,
            totalVentas: this.state.selectedConsolidado.totalVentas
        }
    })
  }
}

export default ConsolidadoComponent;