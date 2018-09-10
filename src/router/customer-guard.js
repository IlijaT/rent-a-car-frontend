import store  from '../store'

export default (to, from, next) => {

    if (store.getters.currentUser && store.getters.currentUser[0].role_id === 1) {
        console.log('user je ulogovan')
        console.log(store.getters.currentUser[0])
        next(); 
    } else {
        console.log('user nije customer')
        console.log(store.getters.currentUser)
        next('/login');
    }

}