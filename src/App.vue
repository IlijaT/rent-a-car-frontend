<template>
  <v-app>
    <v-navigation-drawer
      v-model="sideNav"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile 
        v-for="item in menuItems" 
        :key="item.title"
         :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isUserauthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log-out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      
    </v-navigation-drawer>
    <v-toolbar  dark color="pink darken-4">
    <v-toolbar-side-icon class="hidden-sm-and-up" @click.native.stop="sideNav = !sideNav"></v-toolbar-side-icon>
    <v-toolbar-title>
     <router-link to="/" tag="span" style="cursor: pointer"> Rent-a-Car </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only">
      <v-btn 
        color="grey lighten-2"
        style="font-family: Arial, Helvetica, sans-serif "
        flat v-for="item in menuItems" 
        :key="item.title"
        roter
        :to="item.link"
        >
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
      </v-btn>
       <v-btn 
        color="grey lighten-2"
        style="font-family: Arial, Helvetica, sans-serif "
        flat
        v-if="isUserauthenticated"
        @click="onLogout"
        >
          <v-icon left>exit_to_app</v-icon>
          Loguot
      </v-btn>
    </v-toolbar-items>
    
   </v-toolbar> 
   <main>
    <router-view></router-view>
   </main>
  </v-app>
</template>


<script>
 
export default {
  name: 'App',
  data() {
    return {
      sideNav: null,
      loggedUser: this.$store.getters.currentUser,
    }
  },
  computed: {
    menuItems () {
       
      let menuItems = [
        {icon: 'directions_car', title: 'Cars', link: '/cars'},
        {icon: 'lock_open', title: 'Login', link: '/login'},
        {icon: 'supervisor_account', title: 'Register', link: '/register'}
      ];

      if (this.isUserauthenticated && this.$store.getters.currentUser[0].role_id !== 1) {
        menuItems = [
        {icon: 'directions_car', title: 'Cars', link: '/cars'},
        {icon: 'home', title: 'Companies', link: '/companies'},
        {icon: 'person', title: 'Profile', link: '/profile'},
        {icon: 'directions_car', title: 'NewCar', link: '/newcar'}
        ]
      };

      if (this.isUserauthenticated && this.$store.getters.currentUser[0].role_id === 1) {
        menuItems = [
        {icon: 'directions_car', title: 'Cars', link: '/cars'},
        {icon: 'home', title: 'Companies', link: '/companies'},
        ]
      };

      return menuItems;
    },

    isUserauthenticated() {
       return this.$store.getters.currentUser !== null && this.$store.getters.currentUser !== undefined;
    }

  },
  methods: {
     onLogout () {
        this.$router.push('/')
        this.$store.dispatch('logout');
     }
  },
};
</script>
