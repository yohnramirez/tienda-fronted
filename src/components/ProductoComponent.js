import React, { Component } from 'react';
import { ProductoService } from '../services/ProductoService';
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

export class ProductoComponent extends Component{
  constructor(){
    super();
    this.state = {
      visible: false,
      producto: {
        id: '',
        nombre: '',
        idProveedor: '',
        ivaCompra: '',
        precioCompra: '',
        precioVenta: ''
      },
      selectedProducto: {}
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
    this.productoService = new ProductoService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <Button label="Guardar" icon="pi pi-check" onClick={this.save}/>
    );
  }

  componentDidMount() {
    this.productoService.getAll().then(data => {this.setState({productos: data})})
  }

  save(){
    this.productoService.save(this.state.producto).then(data => {
      this.setState({
        visible: false,
        producto: {
            id: '',
            nombre: '',
            idProveedor: '',
            ivaCompra: '',
            precioCompra: '',
            precioVenta: ''
        }
      });
      this.productoService.getAll().then(data => {this.setState({productos: data})});
      this.toast.show({severity: 'success', summary: 'Registro Guardado!', detail: 'El registro fue guardado exitosamente!'});
    })
  }

  delete(){
    if(window.confirm("¿Desea eliminar el registro?")){
      this.productoService.delete(this.state.selectedProducto.id).then(data =>{
        this.toast.show({severity: 'success', summary: 'Registro Eliminado!', detail: 'El registro fue eliminado exitosamente!'});
        this.productoService.getAll().then(data => {this.setState({productos: data})});
      })
    }
  }

  render(){
    return(
      
      <div style={{width:'80%', margin:'0 auto', marginTop:'40px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="Productos">
          <DataTable value={this.state.productos} selectionMode="single" selection={this.state.selectedProducto} onSelectionChange={e => this.setState({ selectedProducto: e.value })}>
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="idProveedor" header="Proveedor"></Column>
            <Column field="ivaCompra" header="IVA Compra"></Column>
            <Column field="precioCompra" header="Precio Compra"></Column>
            <Column field="precioVenta" header="Precio Venta"></Column>
          </DataTable>
        </Panel>

        <Dialog header="Crear producto" footer={this.footer} visible={this.state.visible} style={{ width: '400px' }} modal={true} onHide={() => this.setState({visible: false})}>
        <form id="producto-form">
          <span className="p-float-label">
            <InputNumber style={{ width: '100%' }} value={this.state.producto.id} onValueChange={(e) => {

              let val = e.target.value;

              this.setState(prevState => {
                let producto = Object.assign({}, prevState.producto)
                producto.id = val

                return {producto};
              })}
            } />
            <label htmlFor="id">ID</label>
          </span>

          <br/>
  
          <span className="p-float-label">
            <InputText style={{ width: '100%' }} id="nombre" value={this.state.producto.nombre} onChange={(e) => {

              let val = e.target.value;

              this.setState(prevState => {
                let producto = Object.assign({}, prevState.producto)
                producto.nombre = val

                return {producto};
              })}
            } />
            <label htmlFor="nombre">Nombre</label>
          </span>

          <br/>

          <span className="p-float-label">
            <InputNumber style={{ width: '100%' }} value={this.state.producto.idProveedor} onValueChange={(e) => {

                let val = e.target.value;

                this.setState(prevState => {
                    let producto = Object.assign({}, prevState.producto)
                    producto.idProveedor = val

                    return {producto};
                })}
            } />
            <label htmlFor="proveedor">Proveedor</label>
          </span>

          <br/>

          <span className="p-float-label">
            <InputNumber style={{ width: '100%' }} id="iva-compra" value={this.state.producto.ivaCompra} mode="decimal" onValueChange={(e) => {

                let val = e.target.value;

                this.setState(prevState => {
                    let producto = Object.assign({}, prevState.producto)
                    producto.ivaCompra = val
  
                    return {producto};
                })}
              } />
            <label htmlFor="iva-compra">IVA Compra</label>
          </span>

          <br/>

          <span className="p-float-label">
            <InputNumber style={{ width: '100%' }} id="p-compra" value={this.state.producto.precioCompra} mode="decimal" onValueChange={(e) => {

                let val = e.target.value;

                this.setState(prevState => {
                    let producto = Object.assign({}, prevState.producto)
                    producto.precioCompra = val
  
                    return {producto};
                })}
              } />
            <label htmlFor="p-compra">Precio Compra</label>
          </span>

          <br/>

          <span className="p-float-label">
            <InputNumber style={{ width: '100%' }} id="p-venta" value={this.state.producto.precioVenta} mode="decimal" onValueChange={(e) => {

                let val = e.target.value;

                this.setState(prevState => {
                    let producto = Object.assign({}, prevState.producto)
                    producto.precioVenta = val

                    return {producto};
                })}
            } />
            <label htmlFor="p-venta">Precio Venta</label>
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
      producto: {
        id: '',
        nombre: '',
        idProveedor: '',
        ivaCompra: '',
        precioCompra: '',
        precioVenta: ''
    }
    });
  }

  showEditDialog(){
    this.setState({
      visible: true,
      producto: {
        id: this.state.selectedProducto.id,
        nombre: this.state.selectedProducto.nombre,
        idProveedor: this.state.selectedProducto.idProveedor,
        ivaCompra: this.state.selectedProducto.ivaCompra,
        precioCompra: this.state.selectedProducto.precioCompra,
        precioVenta: this.state.selectedProducto.precioVenta
      }
    })
  }
}

export default ProductoComponent;