const CompanyModule = {
    state: {
      companies: [
        {name: 'Opel Astra (2016)', address: 'Hadzi Ruvimova 33, Novi Sad', phone: '021 22-525', id: '1'}
      ]
    },
    mutations: {
      createCompany(state, payload) {
        state.companies.push(payload);
      }
       
    },
    actions: {
      createCompany(context, payload) {
        context.commit('createCompany', payload);
      }
    },
    getters: {
      getCompanies: state => {
        return state.companies;
      },
      getCcompanyById: (state) => (id) => {
        return state.companies.find(car => car.id === id)
      }

    }
  };
  
  export default CompanyModule;
  