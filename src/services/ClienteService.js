import axios from 'axios'

export class ClienteService{
    baseURL = 'http://localhost:8080/client/';

    getAll(){
        return axios.get(this.baseURL + "findAllClients").then(res => res.data);
    }

    save(producto){
        return axios.post(this.baseURL + "add", producto).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseURL + "deleteClient/" + id).then(res => res.data);
    }
}