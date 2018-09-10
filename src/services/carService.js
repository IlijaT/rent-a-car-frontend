import axios from "axios"
import store from "../store"

export default class CarService {
  constructor () {
    axios.defaults.baseURL = "http://localhost:8000/api/";
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
  }

  addCar(car) {
    store.dispatch('setLoadingTrue');
    store.dispatch('clearError');
    return axios.post("cars", car)
      .then((response) => {
        store.dispatch('createCar', car);
        store.dispatch('setLoadingFalse');
        this.$router.push('/cars');
      })
      .catch((error) => {
        store.dispatch('setLoadingFalse');
        store.dispatch('setError', error);
    });
  }

  getCars() {
    return axios.get("cars");
  }


  deleteCar(id) {
    return axios.delete(`car/${id}`);
  }
  
  editCar(car) {
    let updatedObj = {};

    if (car.model)  {
      updatedObj.model = car.model;
    };

    if (car.registration) {
      updatedObj.registration = car.registration;
    };

    if (car.year) {
      updatedObj.year = car.year;
    };

    if (car.consuming) {
      updatedObj.consuming = car.consuming;
    }

    if (car.imageURL) {
      updatedObj.imageURL = car.imageURL;
    }

    if (car.description) {
      updatedObj.description = car.description;
    }

    if (car.available == 'availabale') {
      updatedObj.is_rented = false;
    }

    if (car.available == 'rented') {
      updatedObj.is_rented = true;
    }

    store.dispatch('setLoadingTrue');
    return axios.put(`/cars/${car.id}`, updatedObj)
    .then((response) => {
        store.dispatch('updateCar', response.data.data);
        store.dispatch('setLoadingFalse');
    })
    .catch((error) => {
      console.log(error);
      store.dispatch('setLoadingFalse');
      store.dispatch('setError', error);
  });
  }

}

export const carService = new CarService();