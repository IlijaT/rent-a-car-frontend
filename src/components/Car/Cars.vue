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

        <v-layout row v-else>
            <v-flex xs12 sm10 offset-sm1>
                <v-card>
                    <v-container fluid grid-list-sm>
                    <v-layout row wrap>
                        <v-flex v-for="car in cars" :key="car.id" xs4>
                            <v-card-media
                                class="white--text"
                                height="200px"
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
                                    <span class="grey--text">{{car.model}}</span><br>
                                </v-card-title>
                                <v-card-actions>
                                    <div class="text-xs-center"> 
                                        <v-btn dark :to="`/cars/${car.id}`" color="deep-orange darken-2">Details</v-btn>
                                    </div>
                                </v-card-actions>
                        </v-flex>
                    </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    computed: {
       cars: function () {
        return this.$store.getters.getCars;
      },

      loading () {
        return this.$store.getters.loading
      }
    }
}
</script>
