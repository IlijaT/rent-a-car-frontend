<template>
    <v-layout row justify-center>
    <v-dialog v-model = "dialog" persistent max-width="290" @keydown.esc="cancelFilterModal">
          <v-btn slot="activator" fab dark  color="cyan">
            <v-icon dark>edit</v-icon>
          </v-btn>
      <v-card>
        <v-container >
            <v-layout row wrap>
                <v-flex xs-12>
                    <v-card-title class="headline">Edit Car</v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs-12>
                    <v-card-text>
                        <v-text-field v-model = "editedCar.model" v-validate="'required'" prepend-icon="directions_car" name="editedModel" label="Model" type="text"></v-text-field>
                        <v-select prepend-icon="directions_car" :items= "items" v-model = "editedCar.available"  label="Available">
                        </v-select>
                        <v-text-field v-model = "editedCar.registration" v-validate="'required'" prepend-icon="directions_car" name="editedRregistration" label="Registration" type="text"></v-text-field>
                        <v-text-field v-model = "editedCar.year" v-validate="'required|numeric'" prepend-icon="access_time" name="editedYear" label="Year" type="text"></v-text-field>
                        <v-text-field v-model = "editedCar.consuming" v-validate="'required|numeric'" prepend-icon="local_gas_station" name="editedConsuming" label="Consuming" type="text"></v-text-field>
                        <v-text-field v-model = "editedCar.image" v-validate="'required'" prepend-icon="add_photo_alternate" name="editedImageURL" label="Image URL" type="text"></v-text-field>
                        <v-textarea v-model = "editedCar.description"  prepend-icon="description" name="editedDescription" label="Car description"  type="text"></v-textarea>
                    </v-card-text>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs-12>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="deep-orange" flat @click.native="dialog = false">Cancel</v-btn>
                        <v-btn color="deep-orange" flat @click.native="onSave">Save</v-btn>
                     </v-card-actions>
                </v-flex>
            </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { carService } from '../../../services/carService';
export default {
    props: ['car'],
    data () {
        return {
            editedCar: {
                id: this.car.id,
                model: this.car.model,
                registration: this.car.registration,
                year: this.car.year,
                consuming: this.car.consuming,
                image: this.car.image,
                description: this.car.description,
                available: this.car.available
            },

            dialog: false,
            items: ['availabale', 'rented']
        }
    },
    methods: {
        onSave () {
            if (this.editedCar.model.trim() == '' || this.editedCar.registration.trim() == '' 
            || this.editedCar.year === null || this.editedCar.consuming === null
            || this.editedCar.image.trim() == ''|| this.editedCar.description.trim() == '' ) {
                return
            }
            carService.editCar(this.editedCar);
            this.dialog = false;
        },
        cancelFilterModal () {
            this.dialog = false;
        }
    }
}
</script>

