const CarModule = {
    state: {
      cars: []
    },
    
    mutations: {
      createCar(state, payload) {
        state.cars.push(payload);
      },
      setCars(state, payload) {
        state.cars = payload
      },

      updateCar(state, payload) {
        let carForUpdate = state.cars.find( car => {
          return car.registration === payload.registration;
        });


        carForUpdate.model =  payload.model;
        carForUpdate.available =  payload.available;
        carForUpdate.registration =  payload.registration;
        carForUpdate.year =  payload.year;
        carForUpdate.consuming =  payload.consuming;
        carForUpdate.imageURL =  payload.imageURL;
        carForUpdate.description =  payload.description;
      }
       
      
    },
    actions: {
      createCar(context, payload) {
        context.commit('createCar', payload);
      },
      setCars(context, payload) {
        context.commit('setCars', payload);
      },
      updateCar(context, payload) {
        context.commit('updateCar', payload);
      }
    },
    getters: {
      getCars: state => {
        return state.cars;
      },
      caruselCars: (state) => {
        return state.cars.slice(0,5);
      },

      getCarById: (state) => (id) => {
        return state.cars.find(car => car.id == id);
      }

    }
  };
  
  export default CarModule;
  