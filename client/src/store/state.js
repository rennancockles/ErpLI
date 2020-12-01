const state = {
  breadcrumbs: [],
  loading: false,

  // AUTH
  isLoggedIn: false,

  // USER
  user: {
    id: null,
    name: 'Rennan',
    lastname: '',
    email: '',
    store: {
      id: null,
      name: '',
      api_key: ''
    }
  }
}

export default state
