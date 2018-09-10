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

        <v-layout row wrap v-else>
            <v-flex xs12>
                <v-card class="mt-3 elevation-20">
                    <v-card-media
                    class="white--text"
                    height="400px"
                    :src="car.image"
                    >
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                           <span class="headline">{{car.model}}</span>
                        </v-flex>
                        </v-layout>
                    </v-container>
                    </v-card-media>
                    <v-card-title>
                        <div>
                            <span class="grey--text">Model: {{car.model}}</span><br>
                            <span class="grey--text">Year: {{car.year}}</span><br>
                            <span class="grey--text">Available: {{car.available}}</span><br>
                        </div>
                        <template v-if="canUserEdit"> 
                            <v-spacer></v-spacer>
                            <edit-car-dialog :car="car"></edit-car-dialog>
                        </template>
                    </v-card-title>
                    
                    <v-card-actions>
                        <v-btn v-for = "button in buttons"
                        :key="button.title"
                        dark
                        :color="button.color"
                        :to="button.link"
                        >
                        <v-icon left>{{button.icon}}</v-icon>
                        {{button.title}}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { carService } from '../../services/carService';
export default {
    
    computed: {
       car () {
        var id = this.$route.params.id;
        return this.$store.getters.getCarById(id);
      },

      loading () {
        return this.$store.getters.loading
      },

      buttons () {
        let buttonsToDisplay = [
            {icon: 'airline_seat_recline_extra', title: 'Rent', link: '/', color: 'pink lighten-2'}
        ];

        if (this.isUserauthenticated) {
            buttonsToDisplay = [];
            if(this.canUserEdit) {
                buttonsToDisplay = [
                    {icon: 'delete', title: 'Delete', link: '/', color: 'red darken-4'},
                ]
            }
           
        };

        return buttonsToDisplay;
    },

    isUserauthenticated() {
       return this.$store.getters.currentUser !== null && this.$store.getters.currentUser !== undefined;
    },
    canUserEdit() {
        if (!this.isUserauthenticated) {
            return
        }
        return this.$store.getters.currentUser[0].company_id === this.car.company_id
    }
    }
}
</script>

