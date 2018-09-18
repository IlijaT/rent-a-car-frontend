<template>
    <v-container>
        <v-layout row v-if="loading">
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
        <v-layout v-if="!loading" class="mt-2" >
            <v-flex xs12 sm10 offset-sm1 >
                <v-text-field 
                    v-model="search"
                    solo
                    label="Search for a car..."
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row v-if="!loading" class="mt-2">
                <v-flex xs12 sm10 offset-sm1>
                    <v-card>
                        <v-container fluid grid-list-sm>
                            <v-layout row wrap>
                                <v-flex v-for="car in filteredCars" :key="car.id" xs4 class="rounded-card elevation-6 mt-1"> 
                                    <v-card-media
                                        class="rounded-image white--text"
                                        height="200px"
                                        :src="'http://localhost:8000/storage/images/' + car.image"
                                        >
                                        <!-- <v-container fill-height fluid>
                                            <v-layout fill-height>
                                            <v-flex xs12 align-end flexbox>
                                                <span class="headline">{{car.available}}</span>
                                            </v-flex>
                                            </v-layout>
                                        </v-container> -->
                                    </v-card-media>
                                    <v-card-title>
                                        <div>
                                            <span class="grey--text">{{car.model}}</span><br>
                                            <span class="grey--text">available: {{car.available == "available" ? "yes": "no"}}</span>
                                        </div>
                                    </v-card-title>
                                    <v-card-actions>
                                            <v-btn dark :to="`/cars/${car.id}`" color="deep-orange darken-2">Details</v-btn>
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

    data() {
        return {
            search: ''
        }
    },
    computed: {
        cars () {
            return this.$store.getters.getCars;
        },
        loading () {
            return this.$store.getters.loading
        },
        filteredCars() {
            return this.cars.filter((car) => {
                return car.model.toLowerCase().match(this.search.toLowerCase())
            })
        }
    }
}
</script>

<style scoped>
.rounded-card{
    border-radius:10px;
}

.rounded-image{
    border-radius:10px 10px 0px 0px;
    margin: 0px;
}

</style>

