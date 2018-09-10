<template>
    <v-content>
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

        <v-layout row v-if="error">
          <v-flex xs12 sm6 offset-sm3>
            <alert-component @dismissed="onDismissed" :text="error"></alert-component>
          </v-flex>
        </v-layout>

        <v-layout row v-if= "!loading">
          <v-flex xs12 sm6 offset-sm3>
            <v-card class="elevation-12">
              <v-card-text>
                <v-form @submit.prevent = "register" method="POST" >
                  <v-text-field prepend-icon="person" v-model= "user.name"  name="name" label="Name" type="text"></v-text-field>
                  <v-text-field prepend-icon="email" v-model= "user.email" name="email" label="email" type="email"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" v-model= "user.password"  name="password" label="Password" type="password"></v-text-field>
                  <v-text-field 
                  id="passwordConfirm" 
                  prepend-icon="lock" 
                  name="password_confirmation" 
                  label="Confirm password" 
                  type="password"
                  v-model= "user.password_confirmation"
                  
                  >
                  </v-text-field>
                  <v-btn 
                    type="submit" 
                    dark color="grey darken-1"
                    :loading="loading"
                    :disabled="loading"
                    >
                    Register
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import { auth } from '../../services/authService';

  export default {
    data () {
      return {
        user: {
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        },
        passwordConfirm: ''
      }
    },

     methods: {
      register() {
       auth.register(this.user);
      },

      onDismissed() {
        this.$store.dispatch('clearError');
      }
    },
    computed: {
      comparePasswords() {
        return this.user.password !== this.passwordConfirm ? 'Passwords do not match' : '';
      },
      currentUser() {
        return this.$store.getters.currentUser;
      },
      error() {
        return this.$store.getters.error;
      },
      loading() {
        return this.$store.getters.loading;
      }
    },
    watch: {
      currentUser(value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/');
        }
      }
    }

    
  }
</script>

<style scoped>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
