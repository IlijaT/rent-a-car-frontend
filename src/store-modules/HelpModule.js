const HelpModule = {
    state: {
      loading: false,
      error: null
    },
    mutations: {
      setLoadingFalse: (state) => {
        state.loading = false;
      },
      setLoadingTrue: (state) => {
        state.loading = true;
      },
      setError: (state, payload) => {
        state.error = payload;
      },
      clearError: (state) => {
        state.error = null;
      }
    },
    actions: {
        setLoadingFalse (context) {
          context.commit('setLoadingFalse')
        },
        setLoadingTrue (context) {
          context.commit('setLoadingTrue')
        },
        setError (context, payload) {
          context.commit('setError', payload)
        },
        clearError (context) {
            context.commit('clearError')
        }
       
    },
    getters: {
      error(state){
        return state.error;
      },
      loading(state){
        return state.loading;
      }
       
    }
  };
  
  export default HelpModule;
  