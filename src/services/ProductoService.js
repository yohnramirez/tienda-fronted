import axios from 'axios'

export class ProductoService{
    baseURL = 'http://localhost:8080/product/';

    getAll(){
        return axios.get(this.baseURL + "findAllProducts").then(res => res.data);
    }

    save(producto){
        return axios.post(this.baseURL + "add", producto).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseURL + "deleteProduct/" + id).then(res => res.data);
    }
}