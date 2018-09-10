<template>
    <v-container>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <h2 class="grey--text">Add a new car</h2>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center class="mt-3">
        <v-flex xs12 sm8 md6>
          <v-card class="elevation-12">
            <v-card-text>
              <v-form @submit.prevent="createCar">
                <v-text-field v-validate="'required'" autofocus v-model= "car.model" prepend-icon="directions_car" name="model" label="Model" type="text"></v-text-field>
                <span class="red--text">{{ errors.first('model') }}</span>
                <v-text-field v-validate="'required'" v-model= "car.registration" prepend-icon="directions_car" name="registration" label="Registration" type="text"></v-text-field>
                <span class="red--text">{{ errors.first('registration') }}</span>
                <v-text-field v-validate="'required|numeric'" v-model= "car.year" prepend-icon="access_time" name="year" label="Year" type="text"></v-text-field>
                <span class="red--text">{{ errors.first('year') }}</span>
                <v-text-field v-validate="'required|numeric'" v-model= "car.consuming" prepend-icon="local_gas_station" name="consuming" label="Consuming" type="text"></v-text-field>
                <span class="red--text">{{ errors.first('consuming') }}</span>
                <v-text-field v-validate="'required'" v-model="car.imageURL" prepend-icon="add_photo_alternate" name="imageURL" label="Image URL" type="text"></v-text-field>
                <span class="red--text">{{ errors.first('imageURL') }}</span>
                <v-textarea v-validate="'required'" v-model= "car.description" prepend-icon="description" name="description" label="Car description" type="text"></v-textarea>
                <span class="red--text">{{ errors.first('description') }}</span>
                <v-btn :disabled= "!curentUser" type="submit" dark color="grey darken-1">Save</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { carService } from '../../services/carService';

export default {
  data() {
    return {
      car: {
        model: '',
        registration: '',
        year: '',
        consuming: '',
        imageURL: '',
        description: '',
        company_id: ''
      },
      curentUser: null
    }
  },
  methods: {
    createCar(){
      if (this.curentUser === null) {
        return;
      }
       
      this.$validator.validate().then( () => {
        this.car.company_id = this.curentUser[0].company_id;
          carService.addCar(this.car);
          
          this.$router.push('/cars');
      });
      
    }
  },
  created () {
        this.curentUser = this.$store.getters.currentUser;
  }
}
</script>
