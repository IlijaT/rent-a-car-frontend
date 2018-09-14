import axios from "axios"
import store from "../store"
import router from '../router'

export default class CarService {
  constructor () {
    axios.defaults.baseURL = "http://localhost:8000/api/";
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
  }

  addCar(car) {
    store.dispatch('setLoadingTrue');
    store.dispatch('clearError');
    axios.defaults.baseURL = "http://localhost:8000/api/";
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    axios.defaults.headers.common['Content-Type'] = `multipart/form-data`;

    let formData = new FormData()
        formData.append('company_id', car.company_id)
        formData.append('consuming', car.consuming)
        formData.append('description', car.description)
        formData.append('image', car.image)
        formData.append('model', car.model)
        formData.append('registration', car.registration)
        formData.append('year', car.year)
        
    return axios.post("cars", formData)
      .then( (response) => {
        // handle success
        store.dispatch('createCar', response.data);
        store.dispatch('setLoadingFalse');
        router.push('/')
      })
      .catch((error) => {
        
        store.dispatch('setLoadingFalse');
        store.dispatch('setError', error.response.data.errors);
    });
  }

  getCars() {
    return axios.get("cars");
  }


  deleteCar(id) {
    store.dispatch('setLoadingTrue');
    store.dispatch('clearError');
    return axios.delete(`cars/${id}`)
      .then((response) => {
        store.dispatch('deleteCar', id);
        store.dispatch('setLoadingFalse');
        router.push('/')
      })
      .catch((error) => {
        store.dispatch('setLoadingFalse');
        store.dispatch('setError', error);
  });
  }
  
  editCar(car) {
    store.dispatch('setLoadingTrue');
    store.dispatch('clearError');
    axios.defaults.baseURL = "http://localhost:8000/api/";
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    axios.defaults.headers.common['Content-Type'] = `multipart/form-data`;
    let formData = new FormData()
        formData.append('consuming', car.consuming)
        formData.append('description', car.description)
        formData.append('image', car.image)
        formData.append('model', car.model)
        formData.append('registration', car.registration)
        formData.append('year', car.year)
        formData.append('_method', 'PUT');
        if(car.available == "available") {
          formData.append('is_rented', 0)
        } else {
          formData.append('is_rented', 1)
        }

    return axios.post(`/cars/${car.id}`, formData)
      .then((response) => {
        store.dispatch('updateCar', response.data.data);
        store.dispatch('setLoadingFalse');
      })
      .catch((error) => {
        store.dispatch('setLoadingFalse');
        store.dispatch('setError', error);
      });
  }

}

export const carService = new CarService();