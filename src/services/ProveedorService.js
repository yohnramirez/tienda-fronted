import axios from 'axios'

export class ProveedorService{
    baseURL = 'http://localhost:8080/supplier/';

    getAll(){
        return axios.get(this.baseURL + "findAllSuppliers").then(res => res.data);
    }

    save(proveedor){
        return axios.post(this.baseURL + "add", proveedor).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseURL + "deleteSupplier/" + id).then(res => res.data);
    }
}