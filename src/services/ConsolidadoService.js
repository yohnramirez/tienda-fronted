import axios from 'axios'

export class ConsolidadoService{
    baseURL = 'http://localhost:8080/branch/';

    getAll(){
        return axios.get(this.baseURL + "findAllBranchs").then(res => res.data);
    }

    save(branch){
        return axios.post(this.baseURL + "add", branch).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseURL + "deleteBranch/" + id).then(res => res.data);
    }
}