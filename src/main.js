import Vue from 'vue'
import App from './App.vue'
import store from './store';
import axios from 'axios'
import AlertComponent from './components/Shared/Alert.vue';
import EditCarDialog from './components/Car/Edit/EditCarDialog.vue';


import Vuetify from 'vuetify'
import router from './router/index';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.use(Vuetify);

Vue.component('alert-component', AlertComponent)
Vue.component('edit-car-dialog', EditCarDialog)


import 'vuetify/dist/vuetify.min.css'  

new Vue({
  el: '#app',
  router,
  store,
  axios,
  VeeValidate,
  render: h => h(App), 
  created() {
    store.dispatch('setLoadingTrue');
    axios.get('http://localhost:8000/api/cars')
          .then(function (response) {
            store.dispatch('setCars', response.data.data );
            store.dispatch('setLoadingFalse');
          })
          .catch(function (error) {
            store.dispatch('setLoadingFalse');
            console.log(error);
          });
    this.$store.dispatch('autoSignIn');
  }
})