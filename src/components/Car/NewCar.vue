<template>
    <v-container>
      <v-layout row v-if= "loading">
        <v-flex xs12 >
            <div class="text-xs-center">
              <v-progress-circular
                :width="10"
                :size="80"
                color="grey darken-1"
                indeterminate
                v-if="loading"
              ></v-progress-circular>
            </div>
        </v-flex>
      </v-layout>

      <v-layout align-center justify-center v-if="error">
          <v-flex xs12 sm8 md6>
            <alert-component @dismissed="onDismissed" :text="error"></alert-component>
          </v-flex>
      </v-layout>

      <v-layout v-if="!loading" align-center justify-center class="mt-3">
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
                <v-btn
                  color="blue-grey"
                  class="white--text"
                  @click.native= "pickFile"
                >
                  Upload image
                  <v-icon right dark>cloud_upload</v-icon>
                </v-btn>
                <input name="image" @change="processFile($event)" style="display: none" type="file" ref="inputFile" accept="image/*"> 
                <!-- <span class="red--text">{{ errors.first('imageURL') }}</span> -->
                <v-layout align-center justify-center class="mt-3">
                  <v-flex xs12 sm8 md6>
                    <img :src="imageURL" height="150">
                  </v-flex> 
                </v-layout>
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
        description: '',
        company_id: '',
        image: null
      },
      curentUser: null,
      imageURL: '',
    }
  },
  computed : {
    error() {
        return this.$store.getters.error;
    },
    loading () {
        return this.$store.getters.loading
      }
  },
  methods: {
    createCar(){
      if (this.curentUser === null) {
        return;
      }
      this.$validator.validate().then(() => {
        this.car.company_id = this.curentUser[0].company_id;
          carService.addCar(this.car);
      });
    },
    pickFile() {
      this.$refs.inputFile.click();
    },
    processFile(event) {
      let fileName = event.target.files[0].name;
      if(fileName.lastIndexOf(".") <= 0) {
        alert("Please enter a valid file!");
      }
      this.car.image = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.addEventListener('load', () => {
        this.imageURL = fileReader.result;
      });
    },
    onDismissed() {
      this.$store.dispatch('clearError');
    }
  },
  created () {
      this.curentUser = this.$store.getters.currentUser;
  }
}
</script>
