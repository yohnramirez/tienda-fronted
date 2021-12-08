import axios from 'axios'

export class UsuarioService{
    baseURL = 'http://localhost:8080/user/';

    getAll(){
        return axios.get(this.baseURL + "findAllUsers").then(res => res.data);
    }

    save(usuario){
        return axios.post(this.baseURL + "add", usuario).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseURL + "deleteUser/" + id).then(res => res.data);
    }
}