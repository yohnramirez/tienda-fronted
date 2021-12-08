import axios from 'axios'

export class VentaService{
    baseURL = 'http://localhost:8080/sales/';

    getAll(){
        return axios.get(this.baseURL + "findAllSales").then(res => res.data);
    }

    save(venta){
        return axios.post(this.baseURL + "add", venta).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseURL + "deleteSale/" + id).then(res => res.data);
    }
}