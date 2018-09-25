import axios from "axios"
import store from "../store"
import router from '../router'

export default class RentService {

    constructor () {
        axios.defaults.baseURL = "http://localhost:8000/api/";
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    };

    rentCar(rentData) {
        store.dispatch('setLoadingTrue');
        store.dispatch('clearError');
        return axios.post('rent', rentData)
          .then( (response) => {
            // handle success
            store.dispatch('setLoadingFalse');
            router.push('/')
          })
          .catch(error => {
            store.dispatch('setLoadingFalse');
            store.dispatch('setError', error.data)
          });
      };
    
}

export const rentService = new RentService();